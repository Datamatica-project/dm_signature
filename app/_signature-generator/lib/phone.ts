import type { FormattedPhone } from '../types';

const KOREAN_MOBILE_PATTERN = /^01[016789]\d{7,8}$/;

export function formatPhone(raw: string): FormattedPhone | null {
  const digits = raw.replace(/\D/g, '').replace(/^82/, '0');
  if (!KOREAN_MOBILE_PATTERN.test(digits)) return null;

  const withoutTrunkPrefix = digits.slice(1);
  const carrier = withoutTrunkPrefix.slice(0, 2);
  const isElevenDigits = digits.length === 11;
  const middle = withoutTrunkPrefix.slice(2, isElevenDigits ? 6 : 5);
  const last = withoutTrunkPrefix.slice(isElevenDigits ? 6 : 5);

  return {
    display: `+82 (0)${carrier}-${middle}-${last}`,
  };
}
