import { useEffect, useRef } from "react";

export default function useOnClickOutside(refs, handler, attached = true) {
  const handlerRef = useRef(handler);
  const refsRef = useRef(refs);

  useEffect(() => {
    handlerRef.current = handler;
    refsRef.current = refs;
  }, [handler, refs]);

  useEffect(() => {
    if (!attached) return;

    const listener = event => {
      const refsArray = Array.isArray(refs) ? refs : [refs];

      const isInside = refsArray.some(
        (ref) => ref.current && ref.current.contains(event.target)
      );

      if (!isInside) handlerRef.current(event);
    }

    document.addEventListener('click', listener);
    document.addEventListener('touchend', listener);

    return () => {
      document.removeEventListener('click', listener);
      document.removeEventListener('touchend', listener);
    }
  }, [attached]);
}