import { useState } from 'react';
import { DESKTOP_SIGNATURE_WIDTH } from '../constants';
import { useElementSize } from '../hooks/useElementSize';
import { useIframeContentHeight } from '../hooks/useIframeContentHeight';
import { calculatePreviewPaneHeight } from '../lib/preview-layout';
import { DesktopPreview } from './DesktopPreview';
import { OriginalSizeDialog } from './OriginalSizeDialog';

interface PreviewPanelProps {
  previewDocument: string;
  formHeight: number;
}

const FALLBACK_DESKTOP_BOX_WIDTH = 600;

export function PreviewPanel({ previewDocument, formHeight }: PreviewPanelProps) {
  const [isOriginalOpen, setIsOriginalOpen] = useState(false);
  const desktopFrame = useIframeContentHeight(220);
  const [desktopBoxRef, desktopBox] = useElementSize<HTMLDivElement>();
  const [headerRef, header] = useElementSize<HTMLDivElement>();

  const desktopScale = Math.min(
    1,
    (desktopBox.width || FALLBACK_DESKTOP_BOX_WIDTH) / DESKTOP_SIGNATURE_WIDTH
  );
  const paneHeight = calculatePreviewPaneHeight({
    desktopContentHeight: desktopFrame.height,
    desktopScale,
    formHeight,
    headerHeight: header.height,
  });

  return (
    <section
      aria-labelledby="preview-title"
      className="border-line flex min-h-0 flex-col gap-4 rounded-[10px] border bg-white px-5 pt-5 pb-6 xl:sticky xl:top-6"
      style={{ maxHeight: formHeight || undefined }}
    >
      <div ref={headerRef} className="flex min-h-9 items-center">
        <h2 id="preview-title" className="text-base font-bold">
          미리보기
        </h2>
      </div>
      <div
        className="flex shrink-0 flex-col overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(.2,.7,.2,1)]"
        style={{ height: paneHeight }}
      >
        <DesktopPreview
          previewDocument={previewDocument}
          boxRef={desktopBoxRef}
          iframeRef={desktopFrame.iframeRef}
          contentHeight={desktopFrame.height}
          scale={desktopScale}
          onIframeLoad={desktopFrame.handleLoad}
          onOpenOriginal={() => setIsOriginalOpen(true)}
        />
      </div>
      <OriginalSizeDialog
        open={isOriginalOpen}
        previewDocument={previewDocument}
        contentHeight={desktopFrame.height}
        onClose={() => setIsOriginalOpen(false)}
      />
    </section>
  );
}
