import { COMPANY } from '../constants';
import {
  divider,
  FONT_FAMILY,
  wrapByLine,
  type EscapedSignatureFields,
} from './signature-template-parts';

const TEXT_BASE = `margin: 0; padding: 0; font-family: ${FONT_FAMILY};`;
const CONTACT_LABEL_STYLE =
  'width: 38px; padding: 1px 0; font-size: 13px; line-height: 1.5; font-weight: 700; color: #b61717; vertical-align: top;';
const CONTACT_VALUE_STYLE =
  'padding: 1px 0; font-size: 13px; line-height: 1.5; font-weight: 400; color: #2d2d2d;';
const LINK_STYLE = 'color: #2d2d2d; text-decoration: none';
// 다우오피스 편집기는 font-size가 없는 span에 임의의 pt 크기를 넣으므로 span마다 크기를 명시한다.
const NAME_TEXT = `font-family: ${FONT_FAMILY}; font-size: 19px;`;
const ADDRESS_TEXT = `font-family: ${FONT_FAMILY}; font-size: 13px;`;
const ADDRESS_LINK_STYLE = `${ADDRESS_TEXT} color: #777777; text-decoration: none;`;
const ADDRESS_LABEL_STYLE = `display: inline-block; width: 76px; vertical-align: top; font-family: ${FONT_FAMILY}; font-size: 13px; line-height: 1.5; font-weight: 700; color: #b61717; white-space: nowrap;`;
// 한글은 글자 단위로 줄바꿈되므로 keep-all로 단어 중간이 끊기지 않게 한다.
const ADDRESS_VALUE_STYLE = `display: inline-block; vertical-align: top; font-family: ${FONT_FAMILY}; font-size: 13px; line-height: 1.5; font-weight: 400; color: #777777; word-break: keep-all;`;

export function buildLogo(): string {
  return `<img src="${COMPANY.logoUrl}" width="180" height="42" alt="DataMatica" style="display: block; width: 180px; height: 42px; margin: 0 0 16px 0; padding: 0; border: 0;" />`;
}

export function buildIdentity({ ko, en, position }: EscapedSignatureFields): string {
  return `<div style="${TEXT_BASE} font-size: 19px; line-height: 1.3; font-weight: 700; letter-spacing: -0.2px; color: #171717;">
          <span style="${NAME_TEXT} white-space: nowrap;">${ko}</span><span style="${NAME_TEXT} margin: 0 6px; color: #aaaaaa; font-weight: 400;">|</span><span style="${NAME_TEXT} display: inline-block;">${en}</span>
        </div>
        <div style="${TEXT_BASE} margin-top: 3px; margin-bottom: 12px; font-size: 15px; line-height: 1.45; font-weight: 400; color: #777777;">${position}</div>`;
}

export function buildContacts({ phoneDisplay, phoneTel, email }: EscapedSignatureFields): string {
  return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; font-family: ${FONT_FAMILY};">
          <tbody>
            <tr><td width="38" valign="top" style="${CONTACT_LABEL_STYLE}">M.</td><td style="${CONTACT_VALUE_STYLE}"><a href="tel:${phoneTel}" style="${LINK_STYLE}">${phoneDisplay}</a></td></tr>
            <tr><td width="38" valign="top" style="${CONTACT_LABEL_STYLE}">E.</td><td style="${CONTACT_VALUE_STYLE} word-break: break-all;"><a href="mailto:${email}" style="${LINK_STYLE}">${email}</a></td></tr>
            <tr><td width="38" valign="top" style="${CONTACT_LABEL_STYLE}">W.</td><td style="${CONTACT_VALUE_STYLE}"><a href="${COMPANY.website}" style="${LINK_STYLE}">${COMPANY.websiteLabel}</a></td></tr>
          </tbody>
        </table>`;
}

interface Office {
  label: string;
  lines: readonly string[];
  mapQuery: string;
}

export function toGoogleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(query)}`;
}

// 라벨과 주소를 inline-block으로 두어 폭이 부족하면 주소가 라벨 아래로 내려가 전체 폭을 쓰게 한다.
// 주소를 직접 링크로 감싸야 Gmail 등이 주소를 감지해 파란 밑줄 링크로 바꾸지 않는다.
function buildAddressRow({ label, lines, mapQuery }: Office, marginTop: number): string {
  return `<div style="margin: ${marginTop}px 0 0 0; padding: 0; font-size: 0; line-height: 0;"><div style="${ADDRESS_LABEL_STYLE}">${label}</div><div style="${ADDRESS_VALUE_STYLE}"><a href="${toGoogleMapsUrl(mapQuery)}" target="_blank" style="${ADDRESS_LINK_STYLE}">${wrapByLine(lines, ADDRESS_TEXT)}</a></div></div>`;
}

export function buildAddresses(): string {
  return `${divider('10px 0 8px 0', '#e9e9e9')}
        ${buildAddressRow(COMPANY.headOffice, 0)}
        ${buildAddressRow(COMPANY.jeonbukOffice, 4)}`;
}
