export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // 사내망 http 접속처럼 Clipboard API를 쓸 수 없는 환경을 위한 대체 경로
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export async function fetchAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`파일을 불러오지 못했습니다: ${url}`);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      typeof reader.result === 'string'
        ? resolve(reader.result)
        : reject(new Error('파일을 data URL로 변환하지 못했습니다.'));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export function downloadHtmlFile(html: string, fileName: string): void {
  downloadBlob(new Blob([html], { type: 'text/html;charset=utf-8' }), fileName);
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  // 즉시 해제하면 일부 브라우저에서 다운로드가 시작되기 전에 URL이 무효화된다.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
