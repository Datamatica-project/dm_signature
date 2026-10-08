import { useState } from 'react';
import { downloadBlob } from '../lib/browser-actions';
import { renderSignatureImage } from '../lib/signature-image';

interface ImageDownloadButtonProps {
  signatureHtml: string;
  fileName: string;
}

type DownloadStatus = 'idle' | 'rendering' | 'failed';

const STATUS_LABEL: Record<DownloadStatus, string> = {
  idle: '이미지 다운로드',
  rendering: '이미지 생성 중…',
  failed: '실패 · 다시 시도',
};

export function ImageDownloadButton({ signatureHtml, fileName }: ImageDownloadButtonProps) {
  const [status, setStatus] = useState<DownloadStatus>('idle');

  const handleDownload = async () => {
    setStatus('rendering');
    try {
      downloadBlob(await renderSignatureImage(signatureHtml), fileName);
      setStatus('idle');
    } catch (error: unknown) {
      console.error(error);
      setStatus('failed');
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={status === 'rendering'}
      aria-live="polite"
      className="bg-ink focus-visible:outline-brand h-10 min-w-[120px] cursor-pointer rounded-md px-[18px] text-sm font-semibold text-white hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-wait disabled:opacity-60"
    >
      {STATUS_LABEL[status]}
    </button>
  );
}
