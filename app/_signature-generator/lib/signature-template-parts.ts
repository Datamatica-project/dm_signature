// 메일 클라이언트가 <style>과 class를 무시하는 경우가 많아 서명 HTML은 table 레이아웃과 inline style로 작성한다.
export const SIGNATURE_FONT_NAME = 'Noto Sans KR';
// 350은 Noto Sans KR의 DemiLight 굵기다.
export const SIGNATURE_FONT_WEIGHTS = [350, 400, 700] as const;
// 메일 수신 환경에 Noto Sans KR이 없으면 웹 폰트를 쓸 수 없어 시스템 폰트로 대체된다.
export const FONT_FAMILY = `&quot;${SIGNATURE_FONT_NAME}&quot;, Arial, &quot;Malgun Gothic&quot;, sans-serif`;

export interface EscapedSignatureFields {
  ko: string;
  en: string;
  position: string;
  phoneDisplay: string;
  email: string;
}

export function divider(margin: string, color: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; margin: ${margin}; border-collapse: collapse"><tbody><tr><td style="height: 1px; background: ${color}; font-size: 1px; line-height: 1px;">&nbsp;</td></tr></tbody></table>`;
}
