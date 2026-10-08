import { fetchAsDataUrl } from './browser-actions';
import { loadEmbeddedFonts, type EmbeddedFonts } from './signature-fonts';
import { calculateSignatureImageSize, type ImageSize } from './signature-image-size';

/**
 * 서명 HTML을 PNG로 렌더링한다.
 * 서명 HTML을 SVG foreignObject에 담아 canvas에 그리므로 외부 이미지와 폰트는 data URL로 바꿔 포함시킨다.
 */
export async function renderSignatureImage(signatureHtml: string): Promise<Blob> {
  const host = document.createElement('div');
  // 페이지 전역 CSS(Tailwind preflight)가 서명 레이아웃에 영향을 주지 않도록 shadow root에서 측정한다.
  host.style.cssText = 'all: initial; position: fixed; top: 0; left: -10000px;';
  const shadowRoot = host.attachShadow({ mode: 'open' });
  shadowRoot.innerHTML = signatureHtml;
  document.body.appendChild(host);
  let fonts: EmbeddedFonts = { css: '', faces: [] };

  try {
    const signature = shadowRoot.querySelector('table');
    if (!signature) throw new Error('서명 table을 찾을 수 없습니다.');

    await inlineImages(signature);
    fonts = await loadFontsOrFallback(signature.textContent ?? '');
    fonts.faces.forEach((face) => document.fonts.add(face));

    const rect = signature.getBoundingClientRect();
    const contentSize = { width: Math.ceil(rect.width), height: Math.ceil(rect.height) };
    const markup = new XMLSerializer().serializeToString(signature);

    return await rasterize(
      markup,
      fonts.css,
      contentSize,
      calculateSignatureImageSize(contentSize)
    );
  } finally {
    fonts.faces.forEach((face) => document.fonts.delete(face));
    host.remove();
  }
}

// 폰트 서버에 접속할 수 없어도 이미지는 만들 수 있도록 설치된 폰트나 대체 폰트로 그린다.
async function loadFontsOrFallback(text: string): Promise<EmbeddedFonts> {
  try {
    return await loadEmbeddedFonts(text);
  } catch (error: unknown) {
    console.warn('서명 폰트를 포함하지 못해 설치된 폰트로 그립니다.', error);
    return { css: '', faces: [] };
  }
}

async function inlineImages(root: Element): Promise<void> {
  const images = Array.from(root.querySelectorAll('img'));
  await Promise.all(
    images.map(async (image) => {
      image.src = await fetchAsDataUrl(image.src);
      await image.decode();
    })
  );
}

async function rasterize(
  markup: string,
  fontCss: string,
  content: ImageSize,
  output: ImageSize
): Promise<Blob> {
  // viewBox로 SVG 자체를 출력 해상도에 맞추면 비트맵 확대 없이 벡터 상태에서 선명하게 그려진다.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${output.width}" height="${output.height}" viewBox="0 0 ${content.width} ${content.height}"><style>${fontCss}</style><foreignObject width="${content.width}" height="${content.height}">${markup}</foreignObject></svg>`;
  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await image.decode();

  const canvas = document.createElement('canvas');
  canvas.width = output.width;
  canvas.height = output.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('canvas를 사용할 수 없습니다.');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, output.width, output.height);
  context.drawImage(image, 0, 0, output.width, output.height);

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('PNG를 만들지 못했습니다.'))),
      'image/png'
    )
  );
}
