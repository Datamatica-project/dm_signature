import { describe, expect, it } from 'vitest';
import { calculatePreviewPaneHeight } from './preview-layout';

const BASE = {
  tab: 'desktop' as const,
  desktopContentHeight: 200,
  desktopScale: 0.5,
  mobileContentHeight: 500,
  formHeight: 0,
  headerHeight: 36,
};

describe('calculatePreviewPaneHeight', () => {
  it('데스크탑은 축소된 서명 높이에 테두리와 캡션 높이를 더한다', () => {
    expect(calculatePreviewPaneHeight(BASE)).toBe(100 + 2 + 26);
  });

  it('모바일은 서명 높이에 프레임 여백과 캡션 높이를 더한다', () => {
    expect(calculatePreviewPaneHeight({ ...BASE, tab: 'mobile' })).toBe(500 + 34 + 26);
  });

  it('입력 폼 높이를 넘지 않도록 제한한다', () => {
    expect(calculatePreviewPaneHeight({ ...BASE, tab: 'mobile', formHeight: 400 })).toBe(
      400 - 62 - 36
    );
  });

  it('최소 높이 120px을 보장한다', () => {
    expect(calculatePreviewPaneHeight({ ...BASE, formHeight: 150 })).toBe(120);
  });
});
