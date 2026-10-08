import { fetchAsDataUrl } from './browser-actions';
import { SIGNATURE_FONT_NAME, SIGNATURE_FONT_WEIGHTS } from './signature-template-parts';

const GOOGLE_FONTS_CSS_URL = 'https://fonts.googleapis.com/css2';

export interface FontFaceSource {
  weight: string;
  url: string;
  unicodeRange?: string;
}

export interface EmbeddedFonts {
  css: string;
  faces: FontFace[];
}

/** `text`를 넘기면 Google Fonts가 해당 글자만 담은 작은 서브셋 폰트를 내려준다. */
export function buildFontCssUrl(text?: string): string {
  const family = `${SIGNATURE_FONT_NAME.replaceAll(' ', '+')}:wght@${SIGNATURE_FONT_WEIGHTS.join(';')}`;
  const textParam = text ? `&text=${encodeURIComponent(text)}` : '';
  return `${GOOGLE_FONTS_CSS_URL}?family=${family}&display=swap${textParam}`;
}

export function parseFontFaceSources(css: string): FontFaceSource[] {
  return Array.from(css.matchAll(/@font-face\s*{([^}]*)}/g)).flatMap(([, body]) => {
    const weight = body.match(/font-weight:\s*(\d+)/)?.[1];
    const url = body.match(/src:\s*url\(([^)]+)\)/)?.[1];
    const unicodeRange = body.match(/unicode-range:\s*([^;]+);/)?.[1].trim();
    return weight && url ? [{ weight, url, unicodeRange }] : [];
  });
}

/**
 * 서명 이미지에 쓸 폰트를 data URL로 내려받는다.
 * SVG 이미지 안에서는 외부 폰트를 불러올 수 없어 @font-face에 직접 포함시켜야 하고,
 * 크기 측정도 같은 폰트로 해야 하므로 문서에 등록할 FontFace도 함께 만든다.
 */
export async function loadEmbeddedFonts(text: string): Promise<EmbeddedFonts> {
  const uniqueCharacters = Array.from(new Set(text.replace(/\s/g, ''))).join('');
  const response = await fetch(buildFontCssUrl(uniqueCharacters));
  if (!response.ok) throw new Error('폰트 정보를 불러오지 못했습니다.');

  // 글자를 지정해 요청하면 굵기마다 같은 가변 폰트 파일을 가리키므로 같은 URL은 한 번만 내려받는다.
  const dataUrlCache = new Map<string, Promise<string>>();
  const fetchOnce = (url: string) => {
    const cached = dataUrlCache.get(url);
    if (cached) return cached;
    const pending = fetchAsDataUrl(url);
    dataUrlCache.set(url, pending);
    return pending;
  };

  const fonts = await Promise.all(
    parseFontFaceSources(await response.text()).map(async ({ weight, url, unicodeRange }) => {
      const dataUrl = await fetchOnce(url);
      const face = new FontFace(SIGNATURE_FONT_NAME, `url(${dataUrl})`, { weight, unicodeRange });
      await face.load();
      const rangeRule = unicodeRange ? `unicode-range: ${unicodeRange};` : '';
      return {
        face,
        css: `@font-face { font-family: '${SIGNATURE_FONT_NAME}'; font-weight: ${weight}; ${rangeRule} src: url(${dataUrl}); }`,
      };
    })
  );

  return { css: fonts.map(({ css }) => css).join('\n'), faces: fonts.map(({ face }) => face) };
}
