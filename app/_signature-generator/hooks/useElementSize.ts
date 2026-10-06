import { useEffect, useRef, useState, type RefObject } from 'react';

interface ElementSize {
  width: number;
  height: number;
}

export function useElementSize<T extends HTMLElement>(): [RefObject<T | null>, ElementSize] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // display: none으로 숨겨진 동안의 0 크기는 무시해 마지막으로 보이던 크기를 유지한다.
    const observer = new ResizeObserver(() => {
      if (!element.clientWidth) return;
      setSize({ width: element.clientWidth, height: element.offsetHeight });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}
