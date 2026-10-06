import type { SignatureValues } from '../types';
import { escapeHtml } from './html-escape';
import { buildAddresses, buildContacts, buildIdentity, buildLogo } from './signature-sections';
import { FONT_FAMILY, type EscapedSignatureFields } from './signature-template-parts';

const SIGNATURE_MAX_WIDTH = 600;

/**
 * 가로형 로고를 맨 위에 두고 그 아래에 정보를 쌓는 한 열 구조라 @media 없이 PC와 모바일에서 같은 순서로 보인다.
 * 주소처럼 긴 줄만 폭이 부족할 때 줄바꿈되어 수신 화면에서도 넘치지 않는다.
 */
export function buildSignatureHtml(values: SignatureValues): string {
  const fields: EscapedSignatureFields = {
    ko: escapeHtml(values.ko),
    en: escapeHtml(values.en),
    position: `${escapeHtml(values.department)} / ${escapeHtml(values.title)}`,
    phoneDisplay: escapeHtml(values.phoneDisplay),
    phoneTel: escapeHtml(values.phoneTel),
    email: escapeHtml(values.email),
  };

  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; max-width: ${SIGNATURE_MAX_WIDTH}px; border-collapse: collapse; font-family: ${FONT_FAMILY}; color: #333333;">
  <tbody>
    <tr>
      <td style="border-left: 6px solid #d94a52; padding: 8px 12px 10px 20px; font-family: ${FONT_FAMILY}; font-size: 13px; line-height: 1.5; color: #333333;">
        ${buildLogo()}
        ${buildIdentity(fields)}
        ${buildContacts(fields)}
        ${buildAddresses()}
      </td>
    </tr>
  </tbody>
</table>
`;
}

// 다우오피스는 서명을 display: table/table-cell 래퍼로 감싸 발송하므로 미리보기도 같은 조건에서 렌더링한다.
const DAOU_SIGNATURE_WRAPPER_START =
  '<div style="display: table;"><div style="display: table-row;"><div style="display: table-cell; vertical-align: top;">';
const DAOU_SIGNATURE_WRAPPER_END = '</div></div></div>';

export function buildPreviewDocument(signatureHtml: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#fff;overflow:hidden}body{padding:16px}</style></head><body>${DAOU_SIGNATURE_WRAPPER_START}${signatureHtml}${DAOU_SIGNATURE_WRAPPER_END}</body></html>`;
}
