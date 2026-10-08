import type { SignatureValues } from '../types';
import { buildDesktopSignature } from './desktop-signature';
import { escapeHtml } from './html-escape';
import { buildFontCssUrl } from './signature-fonts';

export function buildSignatureHtml(values: SignatureValues, logoSrc: string): string {
  return buildDesktopSignature(
    {
      ko: escapeHtml(values.ko),
      en: escapeHtml(values.en),
      position: `${escapeHtml(values.department)} / ${escapeHtml(values.title)}`,
      phoneDisplay: escapeHtml(values.phoneDisplay),
      email: escapeHtml(values.email),
    },
    logoSrc
  );
}

export function buildPreviewDocument(signatureHtml: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${buildFontCssUrl()}"><style>html,body{margin:0;background:#fff;overflow:hidden}body{padding:16px}</style></head><body>${signatureHtml}</body></html>`;
}
