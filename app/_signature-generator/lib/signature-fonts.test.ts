import { describe, expect, it } from 'vitest';
import { buildFontCssUrl, parseFontFaceSources } from './signature-fonts';

describe('buildFontCssUrl', () => {
  it('서명에 쓰는 굵기를 모두 요청한다', () => {
    expect(buildFontCssUrl()).toBe(
      'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@350;400;700&display=swap'
    );
  });

  it('글자를 넘기면 서브셋 요청을 위해 인코딩해 붙인다', () => {
    expect(buildFontCssUrl('홍 &')).toContain('&text=%ED%99%8D%20%26');
  });
});

describe('parseFontFaceSources', () => {
  it('@font-face 블록마다 굵기, 폰트 URL, unicode-range를 읽는다', () => {
    const css = `
@font-face {
  font-family: 'Noto Sans KR';
  font-weight: 400;
  src: url(https://fonts.gstatic.com/regular) format('woff2');
  unicode-range: U+ace0, U+d64d;
}
@font-face {
  font-family: 'Noto Sans KR';
  font-weight: 700;
  src: url(https://fonts.gstatic.com/bold) format('woff2');
}`;

    expect(parseFontFaceSources(css)).toEqual([
      { weight: '400', url: 'https://fonts.gstatic.com/regular', unicodeRange: 'U+ace0, U+d64d' },
      { weight: '700', url: 'https://fonts.gstatic.com/bold', unicodeRange: undefined },
    ]);
  });

  it('URL이 없는 블록은 건너뛴다', () => {
    expect(parseFontFaceSources('@font-face { font-weight: 400; }')).toEqual([]);
  });
});
