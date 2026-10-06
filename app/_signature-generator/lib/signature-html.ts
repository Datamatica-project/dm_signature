import type { SignatureValues } from '../types';
import { buildDesktopSignature } from './desktop-signature';
import { escapeHtml } from './html-escape';
import { buildMobileSignature } from './mobile-signature';
import type { EscapedSignatureFields } from './signature-template-parts';

// 모바일 메일 앱은 media query로 두 서명 중 하나만 보여주고, Outlook은 mso-hide로 모바일 서명을 숨긴다.
const RESPONSIVE_STYLE = `<style type="text/css">
  .dm-signature-mobile { display: none; max-height: 0; overflow: hidden; mso-hide: all; }
  @media only screen and (max-width: 600px) {
    .dm-signature-desktop { display: none !important; max-height: 0 !important; overflow: hidden !important; mso-hide: all !important; }
    .dm-signature-mobile { display: table !important; width: 100% !important; max-width: 360px !important; max-height: none !important; overflow: visible !important; }
    .dm-mobile-email { word-break: break-all !important; }
  }
</style>`;

export function buildSignatureHtml(values: SignatureValues): string {
  const fields: EscapedSignatureFields = {
    ko: escapeHtml(values.ko),
    en: escapeHtml(values.en),
    position: `${escapeHtml(values.department)} / ${escapeHtml(values.title)}`,
    phoneDisplay: escapeHtml(values.phoneDisplay),
    phoneTel: escapeHtml(values.phoneTel),
    email: escapeHtml(values.email),
  };

  return `${RESPONSIVE_STYLE}

${buildDesktopSignature(fields)}

${buildMobileSignature(fields)}`;
}

export function buildPreviewDocument(signatureHtml: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#fff;overflow:hidden}body{padding:16px}</style></head><body>${signatureHtml}</body></html>`;
}
