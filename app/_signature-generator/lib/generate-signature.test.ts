import { describe, expect, it } from 'vitest';
import type { SignatureFormState } from '../types';
import { generateSignature } from './generate-signature';

const VALID_FORM: SignatureFormState = {
  ko: '홍길동',
  en: 'Gildong Hong',
  departmentSelection: '솔루션개발본부',
  customDepartment: '',
  title: '연구원',
  phone: '010-1234-5678',
  emailId: 'gildong',
};

describe('generateSignature', () => {
  it('입력이 유효하면 서명 HTML과 요약 정보를 만든다', () => {
    const result = generateSignature(VALID_FORM);
    if (result.status !== 'success') throw new Error('유효한 입력이 거부되었습니다.');

    const { html, summary, fileName } = result.signature;
    expect(summary).toBe('홍길동 · 솔루션개발본부 / 연구원');
    expect(fileName).toBe('메일서명_홍길동.html');
    expect(html).toContain('<!-- DESKTOP SIGNATURE -->');
    expect(html).toContain('<!-- MOBILE SIGNATURE -->');
    expect(html).toContain('href="tel:+821012345678"');
    expect(html).toContain('href="mailto:gildong@datamatica.kr"');
    expect(html).toContain('+82 (0)10-1234-5678');
  });

  it('입력값의 HTML 특수문자를 이스케이프한다', () => {
    const result = generateSignature({
      ...VALID_FORM,
      departmentSelection: 'custom',
      customDepartment: '<R&D> "팀"',
    });
    if (result.status !== 'success') throw new Error('유효한 입력이 거부되었습니다.');

    expect(result.signature.html).toContain('&lt;R&amp;D&gt; &quot;팀&quot; / 연구원');
    expect(result.signature.html).not.toContain('<R&D>');
  });

  it('입력이 유효하지 않으면 에러를 반환한다', () => {
    const result = generateSignature({ ...VALID_FORM, ko: '' });

    expect(result).toEqual({
      status: 'invalid',
      errors: { ko: '한글 이름을 입력해 주세요.' },
    });
  });

  it('같은 입력이면 같은 inputKey를 만든다', () => {
    const first = generateSignature(VALID_FORM);
    const second = generateSignature({ ...VALID_FORM, ko: ' 홍길동 ' });
    if (first.status !== 'success' || second.status !== 'success')
      throw new Error('유효한 입력이 거부되었습니다.');

    expect(first.signature.inputKey).toBe(second.signature.inputKey);
  });
});
