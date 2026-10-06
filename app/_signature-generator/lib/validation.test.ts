import { describe, expect, it } from 'vitest';
import type { SignatureFormState } from '../types';
import { normalizeSignatureInput } from './signature-input';
import { validateSignatureInput } from './validation';

const VALID_FORM: SignatureFormState = {
  ko: '홍길동',
  en: 'Gildong Hong',
  departmentSelection: '솔루션개발본부',
  customDepartment: '',
  title: '연구원',
  phone: '010-1234-5678',
  emailId: 'gildong',
};

function validate(overrides: Partial<SignatureFormState>) {
  const form = { ...VALID_FORM, ...overrides };
  return validateSignatureInput(normalizeSignatureInput(form), {
    departmentSelection: form.departmentSelection,
    rawPhone: form.phone,
  });
}

describe('validateSignatureInput', () => {
  it('모든 값이 올바르면 에러가 없다', () => {
    expect(validate({})).toEqual({});
  });

  it('필수값이 비어 있으면 필드별 에러를 반환한다', () => {
    expect(
      validate({ ko: ' ', en: '', departmentSelection: '', title: '', phone: '', emailId: '' })
    ).toEqual({
      ko: '한글 이름을 입력해 주세요.',
      en: '영문 이름을 입력해 주세요.',
      department: '부서를 선택해 주세요.',
      title: '직급을 입력해 주세요.',
      phone: '휴대폰 번호를 입력해 주세요.',
      email: '이메일 아이디를 입력해 주세요.',
    });
  });

  it('직접 입력 부서가 비어 있으면 부서명 입력을 안내한다', () => {
    expect(validate({ departmentSelection: 'custom', customDepartment: '  ' }).department).toBe(
      '부서명을 입력해 주세요.'
    );
  });

  it('직접 입력한 부서명을 사용한다', () => {
    expect(validate({ departmentSelection: 'custom', customDepartment: '디자인팀' })).toEqual({});
  });

  it('영문 이름에 허용되지 않는 문자가 있으면 에러를 반환한다', () => {
    expect(validate({ en: '홍 Gildong' }).en).toBe('영문, 공백, 하이픈만 입력할 수 있습니다.');
  });

  it('휴대폰 번호 형식이 잘못되면 예시와 함께 안내한다', () => {
    expect(validate({ phone: '02-123-4567' }).phone).toBe(
      '휴대폰 번호 형식이 올바르지 않습니다. 예) 010-1234-5678'
    );
  });

  it('이메일 아이디에 허용되지 않는 문자가 있으면 에러를 반환한다', () => {
    expect(validate({ emailId: 'gil dong' }).email).toBe(
      '영문, 숫자, 점(.), 하이픈(-), 밑줄(_)만 입력할 수 있습니다.'
    );
  });

  it('이메일 전체 주소를 입력해도 아이디만 검사한다', () => {
    expect(validate({ emailId: 'gildong@datamatica.kr' })).toEqual({});
  });
});
