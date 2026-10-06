import { CUSTOM_DEPARTMENT } from '../constants';
import type { DepartmentSelection, NormalizedSignatureInput, ValidationErrors } from '../types';

const ENGLISH_NAME_PATTERN = /^[A-Za-z][A-Za-z .'-]*$/;
const EMAIL_ID_PATTERN = /^[A-Za-z0-9._-]+$/;

interface ValidationContext {
  departmentSelection: DepartmentSelection;
  rawPhone: string;
}

export function validateSignatureInput(
  input: NormalizedSignatureInput,
  { departmentSelection, rawPhone }: ValidationContext
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!input.ko) errors.ko = '한글 이름을 입력해 주세요.';

  if (!input.en) errors.en = '영문 이름을 입력해 주세요.';
  else if (!ENGLISH_NAME_PATTERN.test(input.en))
    errors.en = '영문, 공백, 하이픈만 입력할 수 있습니다.';

  if (!input.department)
    errors.department =
      departmentSelection === CUSTOM_DEPARTMENT
        ? '부서명을 입력해 주세요.'
        : '부서를 선택해 주세요.';

  if (!input.title) errors.title = '직급을 입력해 주세요.';

  if (!rawPhone.trim()) errors.phone = '휴대폰 번호를 입력해 주세요.';
  else if (!input.phone) errors.phone = '휴대폰 번호 형식이 올바르지 않습니다. 예) 010-1234-5678';

  if (!input.emailId) errors.email = '이메일 아이디를 입력해 주세요.';
  else if (!EMAIL_ID_PATTERN.test(input.emailId))
    errors.email = '영문, 숫자, 점(.), 하이픈(-), 밑줄(_)만 입력할 수 있습니다.';

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
