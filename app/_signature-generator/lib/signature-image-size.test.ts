import { describe, expect, it } from 'vitest';
import { calculateSignatureImageSize } from './signature-image-size';

describe('calculateSignatureImageSize', () => {
  it('서명보다 넓은 이미지는 비율을 유지하며 610px 폭으로 늘린다', () => {
    expect(calculateSignatureImageSize({ width: 305, height: 100 })).toEqual({
      width: 610,
      height: 200,
    });
  });

  it('서명보다 좁은 이미지는 비율을 유지하며 610px 폭으로 줄인다', () => {
    expect(calculateSignatureImageSize({ width: 1220, height: 361 })).toEqual({
      width: 610,
      height: 181,
    });
  });
});
