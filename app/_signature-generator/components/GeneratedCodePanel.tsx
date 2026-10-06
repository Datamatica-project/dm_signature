import { useEffect, useRef, useState, type RefObject } from 'react';
import { copyText, downloadHtmlFile } from '../lib/browser-actions';
import type { GeneratedSignature } from '../types';

interface GeneratedCodePanelProps {
  panelRef: RefObject<HTMLElement | null>;
  signature: GeneratedSignature;
  isStale: boolean;
  onRegenerate: () => void;
}

const COPIED_FEEDBACK_MS = 2000;

export function GeneratedCodePanel({
  panelRef,
  signature,
  isStale,
  onRegenerate,
}: GeneratedCodePanelProps) {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimerRef.current), []);

  const handleCopy = async () => {
    await copyText(signature.html);
    setIsCopied(true);
    clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setIsCopied(false), COPIED_FEEDBACK_MS);
  };

  return (
    <section
      ref={panelRef}
      aria-labelledby="generated-code-title"
      className="border-line flex scroll-mt-6 flex-col gap-[18px] rounded-[10px] border bg-white p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 id="generated-code-title" className="text-base font-bold">
            생성된 서명 HTML
          </h2>
          <span className="text-muted text-[13px]">{signature.summary}</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => downloadHtmlFile(signature.html, signature.fileName)}
            className="border-line-strong text-ink hover:bg-canvas focus-visible:outline-brand h-10 cursor-pointer rounded-md border bg-white px-4 text-sm font-semibold focus-visible:outline-2"
          >
            .html 다운로드
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-live="polite"
            className="bg-ink focus-visible:outline-brand h-10 min-w-[120px] cursor-pointer rounded-md px-[18px] text-sm font-semibold text-white hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {isCopied ? '복사됨 ✓' : 'HTML 복사'}
          </button>
        </div>
      </div>

      {isStale && (
        <div
          role="status"
          className="bg-brand-soft text-brand-deep flex flex-wrap items-center justify-between gap-2.5 rounded-md px-4 py-3 text-[13px]"
        >
          <span>입력값이 바뀌었습니다. 아래 코드는 이전 내용입니다.</span>
          <button
            type="button"
            onClick={onRegenerate}
            className="border-brand text-brand focus-visible:outline-brand h-8 cursor-pointer rounded-[5px] border bg-white px-3 text-[13px] font-semibold focus-visible:outline-2"
          >
            다시 생성
          </button>
        </div>
      )}

      <textarea
        readOnly
        value={signature.html}
        onFocus={(event) => event.target.select()}
        spellCheck={false}
        aria-label="생성된 서명 HTML 코드"
        className="text-ink-soft bg-surface-code border-line focus:border-brand h-80 w-full resize-y rounded-md border p-4 font-mono text-xs leading-[1.55] outline-none"
      />

      <ol className="text-ink-soft flex list-decimal flex-col gap-1.5 pl-5 text-sm leading-normal">
        <li>
          위 <b>복사</b> 버튼으로 코드를 복사합니다.
        </li>
        <li>
          다우오피스 메일 → 환경설정 → 서명에서 편집 방식을 <b>HTML</b>로 바꿉니다.
        </li>
        <li>기존 내용을 모두 지우고 붙여넣은 뒤 저장합니다.</li>
      </ol>
    </section>
  );
}
