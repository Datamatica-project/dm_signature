import { COMPANY } from '../constants';
import { divider, FONT_FAMILY, type EscapedSignatureFields } from './signature-template-parts';

const LABEL_STYLE =
  'width: 38px; padding: 2px 0; font-size: 13px; line-height: 1.5; font-weight: 700; color: #b61717; vertical-align: top;';
const VALUE_STYLE =
  'padding: 2px 0; font-size: 13px; line-height: 1.5; font-weight: 400; color: #2d2d2d;';
const ADDRESS_LABEL_STYLE = `padding: 0; font-family: ${FONT_FAMILY}; font-size: 13px; line-height: 1.45; font-weight: 700; color: #b61717;`;
const ADDRESS_VALUE_STYLE = `margin: 0; padding: 0; font-family: ${FONT_FAMILY}; font-size: 13px; line-height: 1.5; font-weight: 400; color: #777777;`;

export function buildMobileSignature({
  ko,
  en,
  position,
  phoneDisplay,
  phoneTel,
  email,
}: EscapedSignatureFields): string {
  const { headOffice, jeonbukOffice } = COMPANY;

  return `<!-- MOBILE SIGNATURE -->
<table class="dm-signature-mobile" cellpadding="0" cellspacing="0" border="0" width="100%" style="display: none; width: 100%; max-width: 360px; max-height: 0; overflow: hidden; mso-hide: all; border-collapse: collapse; font-family: ${FONT_FAMILY};">
  <tbody>
    <tr>
      <td style="border-left: 6px solid #d94a52; padding: 8px 8px 10px 20px; font-family: ${FONT_FAMILY};">
        <img src="${COMPANY.mobileLogoUrl}" width="180" alt="DataMatica" style="display: block; width: 180px; max-width: 100%; height: auto; margin: 0 0 20px 0; padding: 0; border: 0;" />
        <div style="margin: 0; padding: 0; font-family: ${FONT_FAMILY}; font-size: 19px; line-height: 1.3; font-weight: 700; color: #171717;">${ko}</div>
        <div style="margin: 2px 0 0 0; padding: 0; font-family: ${FONT_FAMILY}; font-size: 18px; line-height: 1.3; font-weight: 700; color: #171717;">${en}</div>
        <div style="margin: 6px 0 16px 0; padding: 0; font-family: ${FONT_FAMILY}; font-size: 14px; line-height: 1.45; font-weight: 400; color: #777777;">${position}</div>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse; font-family: ${FONT_FAMILY};">
          <tbody>
            <tr><td width="38" valign="top" style="${LABEL_STYLE}">M.</td><td style="${VALUE_STYLE}"><a href="tel:${phoneTel}" style="color: #2d2d2d; text-decoration: none">${phoneDisplay}</a></td></tr>
            <tr><td width="38" valign="top" style="${LABEL_STYLE}">E.</td><td class="dm-mobile-email" style="${VALUE_STYLE} word-break: break-all;"><a href="mailto:${email}" style="color: #2d2d2d; text-decoration: none">${email}</a></td></tr>
            <tr><td width="38" valign="top" style="${LABEL_STYLE}">W.</td><td style="${VALUE_STYLE}"><a href="${COMPANY.website}" style="color: #2d2d2d; text-decoration: none">${COMPANY.websiteLabel}</a></td></tr>
          </tbody>
        </table>
        ${divider('14px 0 12px 0', '#e4e4e4')}
        <div style="margin: 0 0 3px 0; ${ADDRESS_LABEL_STYLE}">${headOffice.label}</div>
        <div style="${ADDRESS_VALUE_STYLE}">${headOffice.lines.join('<br />')}</div>
        <div style="margin: 14px 0 3px 0; ${ADDRESS_LABEL_STYLE}">${jeonbukOffice.label}</div>
        <div style="${ADDRESS_VALUE_STYLE}">${jeonbukOffice.lines.join('<br />')}</div>
      </td>
    </tr>
  </tbody>
</table>
`;
}
