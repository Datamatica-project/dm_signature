interface PaneHeightInput {
  desktopContentHeight: number;
  desktopScale: number;
  formHeight: number;
  headerHeight: number;
}

const CAPTION_HEIGHT = 26;
const DESKTOP_BOX_BORDER = 2;
// 미리보기 패널의 상하 padding(20 + 24), 테두리(2), 헤더와 본문 사이 gap(16)
const PANEL_VERTICAL_CHROME = 20 + 24 + 2 + 16;
const FALLBACK_HEADER_HEIGHT = 36;
const MIN_PANE_HEIGHT = 120;

/**
 * 미리보기 영역 높이를 계산한다.
 * 패널이 입력 폼보다 길어지지 않도록 폼 높이를 상한으로 사용한다.
 */
export function calculatePreviewPaneHeight({
  desktopContentHeight,
  desktopScale,
  formHeight,
  headerHeight,
}: PaneHeightInput): number {
  const naturalHeight =
    Math.ceil(desktopContentHeight * desktopScale) + DESKTOP_BOX_BORDER + CAPTION_HEIGHT;

  if (!formHeight) return Math.max(MIN_PANE_HEIGHT, naturalHeight);

  const maxHeight = formHeight - PANEL_VERTICAL_CHROME - (headerHeight || FALLBACK_HEADER_HEIGHT);
  return Math.max(MIN_PANE_HEIGHT, Math.min(naturalHeight, maxHeight));
}
