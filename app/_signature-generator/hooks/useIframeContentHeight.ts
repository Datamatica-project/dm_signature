import { useCallback, useEffect, useRef, useState } from 'react';

export function useIframeContentHeight(initialHeight: number, isVisible: boolean) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(initialHeight);

  const measure = useCallback(() => {
    const body = iframeRef.current?.contentDocument?.body;
    if (!body) return;
    const contentHeight = Math.ceil(body.getBoundingClientRect().height);
    if (contentHeight) setHeight(contentHeight);
  }, []);

  // 숨겨진 iframe은 높이가 0으로 측정되므로 화면에 다시 보일 때 측정한다.
  useEffect(() => {
    if (isVisible) measure();
  }, [isVisible, measure]);

  return { iframeRef, height, handleLoad: measure };
}
