import { useEffect } from "react";

export default function useOnClickOutside(ref, handler, attached = true) {
  useEffect(() => {
    if (!attached) return;

    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) return;

      handler(event);
    }

    document.addEventListener('click', listener);
    document.addEventListener('touchend', listener);

    return () => {
      document.removeEventListener('click', listener);
      document.removeEventListener('touchend', listener);
    }
  }, [ref, handler]);
}