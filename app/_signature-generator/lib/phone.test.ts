import { describe, expect, it } from 'vitest';
import { formatPhone } from './phone';

describe('formatPhone', () => {
  it('11자리 휴대폰 번호를 국제 표기로 변환한다', () => {
    expect(formatPhone('010-1234-5678')).toEqual({
      display: '+82 (0)10-1234-5678',
      tel: '+821012345678',
    });
  });

  it('10자리 휴대폰 번호는 가운데 자리를 3자리로 나눈다', () => {
    expect(formatPhone('0111234567')).toEqual({
      display: '+82 (0)11-123-4567',
      tel: '+82111234567',
    });
  });

  it('+82로 시작하는 번호도 같은 결과를 낸다', () => {
    expect(formatPhone('+82 10 1234 5678')).toEqual(formatPhone('01012345678'));
  });

  it.each(['', '02-123-4567', '010-123', '012-1234-5678', '010-1234-56789'])(
    '휴대폰 번호 형식이 아니면 null을 반환한다: %s',
    (raw) => {
      expect(formatPhone(raw)).toBeNull();
    }
  );
});
