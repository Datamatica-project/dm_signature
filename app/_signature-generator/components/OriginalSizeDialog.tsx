import { useEffect, useRef, type MouseEvent } from 'react';

interface OriginalSizeDialogProps {
  open: boolean;
  previewDocument: string;
  contentHeight: number;
  onClose: () => void;
}

export function OriginalSizeDialog({
  open,
  previewDocument,
  contentHeight,
  onClose,
}: OriginalSizeDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // showModal()로 연 dialog는 backdrop 클릭도 dialog 자신을 target으로 전달한다.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="original-size-title"
      className="m-auto max-h-[calc(100%-48px)] max-w-[calc(100%-48px)] overflow-hidden rounded-[10px] bg-white p-0 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop:bg-[rgba(20,19,18,0.55)] open:flex open:flex-col"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[#eeebe7] py-3.5 pr-4 pl-5">
        <h2 id="original-size-title" className="text-[15px] font-bold">
          서명 · 원본 크기
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="text-muted hover:bg-track focus-visible:outline-brand h-8 w-8 cursor-pointer rounded-md text-xl leading-none focus-visible:outline-2"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="overflow-auto">
        {open && (
          <iframe
            title="서명 원본 크기"
            srcDoc={previewDocument}
            className="block w-[860px] border-0"
            style={{ height: contentHeight }}
          />
        )}
      </div>
    </dialog>
  );
}
