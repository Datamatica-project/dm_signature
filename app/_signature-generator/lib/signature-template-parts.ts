// 메일 클라이언트가 <style>과 class를 무시하는 경우가 많아 서명 HTML은 table 레이아웃과 inline style로 작성한다.
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
