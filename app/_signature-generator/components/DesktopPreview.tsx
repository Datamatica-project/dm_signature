import type { RefObject } from 'react';

interface DesktopPreviewProps {
  previewDocument: string;
  boxRef: RefObject<HTMLDivElement | null>;
  iframeRef: RefObject<HTMLIFrameElement | null>;
  contentHeight: number;
  scale: number;
  onIframeLoad: () => void;
  onOpenOriginal: () => void;
}

export function DesktopPreview({
  previewDocument,
  boxRef,
  iframeRef,
  contentHeight,
  scale,
  onIframeLoad,
  onOpenOriginal,
}: DesktopPreviewProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        ref={boxRef}
        className="border-line-dashed relative w-full overflow-hidden rounded-md border border-dashed"
        style={{ height: Math.ceil(contentHeight * scale) }}
      >
        <iframe
          ref={iframeRef}
          title="서명 미리보기"
          srcDoc={previewDocument}
          onLoad={onIframeLoad}
          className="block w-[860px] origin-top-left border-0"
          style={{ height: contentHeight, transform: `scale(${scale})` }}
        />
        <button
          type="button"
          onClick={onOpenOriginal}
          className="group absolute inset-0 flex cursor-zoom-in items-end justify-end bg-transparent hover:bg-[rgba(28,27,26,0.04)] focus-visible:bg-[rgba(28,27,26,0.04)] focus-visible:outline-none"
        >
          <span className="bg-ink m-2 rounded-[5px] px-2.5 py-[5px] text-xs font-semibold text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
            원본 크기로 보기
          </span>
        </button>
      </div>
      <span className="text-subtle text-xs leading-[18px]">
        {scale < 1 ? `${Math.round(scale * 100)}% 축소 표시` : '실제 크기'}
      </span>
    </div>
  );
}
