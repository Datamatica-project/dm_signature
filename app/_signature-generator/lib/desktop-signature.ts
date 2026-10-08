import { COMPANY } from '../constants';
import { divider, FONT_FAMILY, type EscapedSignatureFields } from './signature-template-parts';

const LABEL_STYLE =
  'width: 42px; padding: 1px 0; font-size: 13px; line-height: 1.4; font-weight: 700; color: #b61717;';
const ADDRESS_LABEL_STYLE =
  'width: 70px; padding: 1px 10px 1px 0; font-size: 13px; line-height: 1.45; font-weight: 700; color: #b61717; vertical-align: top; white-space: nowrap;';
const ADDRESS_VALUE_STYLE =
  'padding: 1px 0; font-size: 13px; line-height: 1.45; font-weight: 400; color: #777777; white-space: nowrap;';

export function buildDesktopSignature(
  { ko, en, position, phoneDisplay, email }: EscapedSignatureFields,
  logoSrc: string
): string {
  const { headOffice, jeonbukOffice } = COMPANY;

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${FONT_FAMILY}; color: #333333; border-collapse: collapse;">
  <tbody>
    <tr>
      <td width="170" valign="middle" style="width: 170px; padding: 8px; vertical-align: middle; text-align: center; border-left: 7px solid #d94a52; border-right: 1px solid #b61717;">
        <img src="${logoSrc}" width="120" height="144" alt="DataMatica" style="display: block; width: 120px; height: 144px; margin: 0 auto; padding: 0; border: 0;" />
      </td>
      <td valign="middle" style="padding: 8px 10px 8px 24px; vertical-align: middle">
        <div style="margin: 0; padding: 0; font-family: ${FONT_FAMILY}; font-size: 20px; line-height: 1.25; font-weight: 700; letter-spacing: -0.2px; color: #171717; white-space: nowrap;">
          ${ko}<span style="display: inline-block; margin: 0 6px; color: #aaaaaa; font-weight: 400; font-family: ${FONT_FAMILY}; font-size: 14pt;">|</span><span style="font-weight: 350; color: #737373;">${en}</span>
        </div>
        <div style="margin: 8px 0 10px 0; padding: 0; font-family: ${FONT_FAMILY}; font-size: 14px; line-height: 1.4; font-weight: 400; color: #777777; white-space: nowrap;">${position}</div>
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; font-family: ${FONT_FAMILY};">
          <tbody>
            <tr><td width="42" style="${LABEL_STYLE}">M.</td><td style="padding: 1px 0; font-size: 13px; line-height: 1.4; font-weight: 400; color: #2d2d2d; white-space: nowrap;">${phoneDisplay}</td></tr>
            <tr><td width="42" style="${LABEL_STYLE}">E.</td><td style="padding: 1px 0; font-size: 13px; line-height: 1.4; white-space: nowrap;"><a href="mailto:${email}" style="color: #2d2d2d; text-decoration: none">${email}</a></td></tr>
            <tr><td width="42" style="${LABEL_STYLE}">W.</td><td style="padding: 1px 0; font-size: 13px; line-height: 1.4; white-space: nowrap;"><a href="${COMPANY.website}" style="color: #2d2d2d; text-decoration: none">${COMPANY.websiteLabel}</a></td></tr>
          </tbody>
        </table>
        ${divider('10px 0 8px 0', '#e9e9e9')}
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; font-family: ${FONT_FAMILY};">
          <tbody>
            <tr><td width="70" valign="top" style="${ADDRESS_LABEL_STYLE}">${headOffice.label}</td><td style="${ADDRESS_VALUE_STYLE}">${headOffice.lines.join(' ')}</td></tr>
            <tr><td width="70" valign="top" style="${ADDRESS_LABEL_STYLE}">${jeonbukOffice.label}</td><td style="${ADDRESS_VALUE_STYLE}">${jeonbukOffice.lines.join(' ')}</td></tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
}
