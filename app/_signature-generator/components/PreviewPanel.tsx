import { useState } from 'react';
import { DESKTOP_SIGNATURE_WIDTH } from '../constants';
import { useElementSize } from '../hooks/useElementSize';
import { useIframeContentHeight } from '../hooks/useIframeContentHeight';
import { calculatePreviewPaneHeight } from '../lib/preview-layout';
import type { PreviewTab } from '../types';
import { DesktopPreview } from './DesktopPreview';
import { MobilePreview } from './MobilePreview';
import { OriginalSizeDialog } from './OriginalSizeDialog';
import { PreviewTabs } from './PreviewTabs';

interface PreviewPanelProps {
  previewDocument: string;
  formHeight: number;
}

const FALLBACK_DESKTOP_BOX_WIDTH = 600;

export function PreviewPanel({ previewDocument, formHeight }: PreviewPanelProps) {
  const [tab, setTab] = useState<PreviewTab>('desktop');
  const [isOriginalOpen, setIsOriginalOpen] = useState(false);
  const desktopFrame = useIframeContentHeight(220, tab === 'desktop');
  const mobileFrame = useIframeContentHeight(560, tab === 'mobile');
  const [desktopBoxRef, desktopBox] = useElementSize<HTMLDivElement>();
  const [headerRef, header] = useElementSize<HTMLDivElement>();

  const desktopScale = Math.min(
    1,
    (desktopBox.width || FALLBACK_DESKTOP_BOX_WIDTH) / DESKTOP_SIGNATURE_WIDTH
  );
  const paneHeight = calculatePreviewPaneHeight({
    tab,
    desktopContentHeight: desktopFrame.height,
    desktopScale,
    mobileContentHeight: mobileFrame.height,
    formHeight,
    headerHeight: header.height,
  });

  return (
    <section
      aria-labelledby="preview-title"
      className="border-line flex min-h-0 flex-col gap-4 rounded-[10px] border bg-white px-5 pt-5 pb-6 xl:sticky xl:top-6"
      style={{ maxHeight: formHeight || undefined }}
    >
      <div ref={headerRef} className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="preview-title" className="text-base font-bold">
          미리보기
        </h2>
        <PreviewTabs activeTab={tab} onTabChange={setTab} />
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
          hidden={tab !== 'desktop'}
          onIframeLoad={desktopFrame.handleLoad}
          onOpenOriginal={() => setIsOriginalOpen(true)}
        />
        <MobilePreview
          previewDocument={previewDocument}
          iframeRef={mobileFrame.iframeRef}
          contentHeight={mobileFrame.height}
          hidden={tab !== 'mobile'}
          onIframeLoad={mobileFrame.handleLoad}
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
