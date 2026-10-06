// 메일 앱은 본문 중간의 <style>을 무시하는 경우가 많아 서명 HTML은 table 레이아웃과 inline style만으로 작성한다.
export const FONT_FAMILY = 'Arial, &quot;Malgun Gothic&quot;, sans-serif';

export interface EscapedSignatureFields {
  ko: string;
  en: string;
  position: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
}

export function divider(margin: string, color: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; margin: ${margin}; border-collapse: collapse"><tbody><tr><td style="height: 1px; background: ${color}; font-size: 1px; line-height: 1px;">&nbsp;</td></tr></tbody></table>`;
}

/**
 * 각 줄을 inline-block으로 감싸 폭이 충분하면 한 줄로 이어지고,
 * 부족하면 줄 단위로 먼저 줄바꿈되도록 한다.
 */
export function wrapByLine(lines: readonly string[], textStyle: string): string {
  return lines
    .map((line) => `<span style="display: inline-block; ${textStyle}">${line}</span>`)
    .join(' ');
}
