import { useEffect } from "react";

export default function Loading({ children, callback, cleanupFnc = undefined }) {
  useEffect(() => {
    async function call() {
      await callback();
    }

    call();

    return async () => {
      await cleanupFnc?.();
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
}