import { useCallback, useRef, useState } from 'react';

export function useIframeContentHeight(initialHeight: number) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(initialHeight);

  const measure = useCallback(() => {
    const body = iframeRef.current?.contentDocument?.body;
    if (!body) return;
    const contentHeight = Math.ceil(body.getBoundingClientRect().height);
    if (contentHeight) setHeight(contentHeight);
  }, []);

  const handleLoad = useCallback(() => {
    measure();
    // 웹 폰트는 iframe load 이후에 적용될 수 있어 폰트 로딩이 끝나면 높이를 다시 잰다.
    void iframeRef.current?.contentDocument?.fonts.ready.then(measure);
  }, [measure]);

  return { iframeRef, height, handleLoad };
}
