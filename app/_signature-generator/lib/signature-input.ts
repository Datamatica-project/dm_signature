import { CUSTOM_DEPARTMENT, EMAIL_DOMAIN, SAMPLE_SIGNATURE } from '../constants';
import type { NormalizedSignatureInput, SignatureFormState, SignatureValues } from '../types';
import { formatPhone } from './phone';

export function normalizeSignatureInput(form: SignatureFormState): NormalizedSignatureInput {
  const department =
    form.departmentSelection === CUSTOM_DEPARTMENT
      ? form.customDepartment.trim()
      : form.departmentSelection;

  return {
    ko: form.ko.trim(),
    en: form.en.trim(),
    department,
    title: form.title.trim(),
    phone: formatPhone(form.phone),
    // 사용자가 전체 주소를 붙여넣어도 아이디만 사용한다.
    emailId: form.emailId.trim().replace(/@.*$/, ''),
  };
}

export function toSignatureValues(
  input: NormalizedSignatureInput,
  fillWithSample: boolean
): SignatureValues {
  const orSample = (value: string, sample: string) => value || (fillWithSample ? sample : '');

  return {
    ko: orSample(input.ko, SAMPLE_SIGNATURE.ko),
    en: orSample(input.en, SAMPLE_SIGNATURE.en),
    department: orSample(input.department, SAMPLE_SIGNATURE.department),
    title: orSample(input.title, SAMPLE_SIGNATURE.title),
    phoneDisplay: input.phone?.display ?? SAMPLE_SIGNATURE.phoneDisplay,
    phoneTel: input.phone?.tel ?? SAMPLE_SIGNATURE.phoneTel,
    email: input.emailId ? `${input.emailId}@${EMAIL_DOMAIN}` : SAMPLE_SIGNATURE.email,
  };
}
