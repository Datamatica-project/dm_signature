import { describe, expect, it } from 'vitest';
import { SAMPLE_SIGNATURE } from '../constants';
import type { NormalizedSignatureInput } from '../types';
import { toSignatureValues } from './signature-input';

const EMPTY_INPUT: NormalizedSignatureInput = {
  ko: '',
  en: '',
  department: '',
  title: '',
  phone: null,
  emailId: '',
};

describe('toSignatureValues', () => {
  it('미리보기용이면 비어 있는 값을 샘플로 채운다', () => {
    expect(toSignatureValues(EMPTY_INPUT, true)).toEqual({
      ko: SAMPLE_SIGNATURE.ko,
      en: SAMPLE_SIGNATURE.en,
      department: SAMPLE_SIGNATURE.department,
      title: SAMPLE_SIGNATURE.title,
      phoneDisplay: SAMPLE_SIGNATURE.phoneDisplay,
      email: SAMPLE_SIGNATURE.email,
    });
  });

  it('입력한 값은 샘플보다 우선한다', () => {
    const values = toSignatureValues(
      {
        ...EMPTY_INPUT,
        ko: '김철수',
        phone: { display: '+82 (0)10-1111-2222' },
        emailId: 'chulsoo',
      },
      true
    );

    expect(values.ko).toBe('김철수');
    expect(values.en).toBe(SAMPLE_SIGNATURE.en);
    expect(values.phoneDisplay).toBe('+82 (0)10-1111-2222');
    expect(values.email).toBe('chulsoo@datamatica.kr');
  });

  it('생성용이면 비어 있는 텍스트 값을 샘플로 채우지 않는다', () => {
    const values = toSignatureValues(EMPTY_INPUT, false);

    expect(values.ko).toBe('');
    expect(values.department).toBe('');
  });
});
