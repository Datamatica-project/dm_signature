import { describe, expect, it } from 'vitest';
import { SAMPLE_SIGNATURE } from '../constants';
import { buildSignatureHtml } from './signature-html';

const html = buildSignatureHtml({
  ko: SAMPLE_SIGNATURE.ko,
  en: SAMPLE_SIGNATURE.en,
  department: SAMPLE_SIGNATURE.department,
  title: SAMPLE_SIGNATURE.title,
  phoneDisplay: SAMPLE_SIGNATURE.phoneDisplay,
  phoneTel: SAMPLE_SIGNATURE.phoneTel,
  email: SAMPLE_SIGNATURE.email,
});

describe('buildSignatureHtml', () => {
  it('수신 화면에서 무시될 수 있는 <style>과 class에 의존하지 않는다', () => {
    expect(html).not.toMatch(/<style/i);
    expect(html).not.toMatch(/\sclass=/);
    expect(html).not.toContain('@media');
  });

  it('서명을 하나만 포함하고 숨겨진 영역이 없다', () => {
    expect(html.match(/<img /g)).toHaveLength(1);
    expect(html).not.toMatch(/display:\s*none/);
  });

  it('가로형 로고를 맨 위에 두고 그 아래에 이름을 둔다', () => {
    const logoIndex = html.indexOf('/signature/logo-horizontal.png');
    expect(logoIndex).toBeGreaterThan(-1);
    expect(logoIndex).toBeLessThan(html.indexOf(SAMPLE_SIGNATURE.ko));
    expect(html).not.toMatch(/display: inline-block; width: \d+px; vertical-align: middle;/);
  });

  it('메일 편집기가 임의 크기를 넣지 않도록 모든 span에 font-size를 명시한다', () => {
    const spanStyles = [...html.matchAll(/<span style="([^"]*)"/g)].map(([, style]) => style);
    expect(spanStyles.length).toBeGreaterThan(0);
    spanStyles.forEach((style) => expect(style).toContain('font-size:'));
  });

  it('주소는 줄 단위 inline-block으로 감싸 줄바꿈 금지 없이 표시한다', () => {
    expect(html).toMatch(
      /<span style="display: inline-block;[^"]*">전북특별자치도 전주시 덕진구<\/span> <span style="display: inline-block;[^"]*">반룡로 111, 509호 \(한국전자기술연구원\)<\/span>/
    );
    expect(html).toContain('word-break: keep-all;');
    expect(html).not.toMatch(/white-space: nowrap;[^"]*"><span style="display: inline-block;/);
  });

  it('주소를 회색 밑줄 없는 Google 지도 링크로 감싸 메일 앱의 자동 링크를 막는다', () => {
    expect(html).toContain(
      `<a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent('전북특별자치도 전주시 덕진구 반룡로 111')}"`
    );
    expect(html).toMatch(
      /<a href="https:\/\/www\.google\.com\/maps[^"]*" target="_blank" style="[^"]*color: #777777; text-decoration: none;"><span[^>]*>경기 성남시/
    );
  });
});
