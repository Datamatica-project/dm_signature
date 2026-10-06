import clsx from 'clsx';
import type { RefObject } from 'react';

interface MobilePreviewProps {
  previewDocument: string;
  iframeRef: RefObject<HTMLIFrameElement | null>;
  contentHeight: number;
  hidden: boolean;
  onIframeLoad: () => void;
}

export function MobilePreview({
  previewDocument,
  iframeRef,
  contentHeight,
  hidden,
  onIframeLoad,
}: MobilePreviewProps) {
  return (
    <div className={clsx('h-full min-h-0 flex-col gap-2', hidden ? 'hidden' : 'flex')}>
      <div className="bg-canvas flex min-h-0 flex-1 items-start justify-center overflow-y-auto rounded-md py-4">
        <div className="border-line-dashed w-[375px] max-w-full overflow-hidden rounded-[18px] border bg-white">
          <iframe
            ref={iframeRef}
            title="모바일 서명 미리보기"
            srcDoc={previewDocument}
            onLoad={onIframeLoad}
            className="block w-[375px] max-w-full border-0"
            style={{ height: contentHeight }}
          />
        </div>
      </div>
      <span className="text-subtle shrink-0 text-xs leading-[18px]">375px 화면 기준</span>
    </div>
  );
}
