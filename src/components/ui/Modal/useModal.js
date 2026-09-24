import { useRef, useEffect } from "react";

const useModal = (open) => {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
    else {
      dialog.current.close();
    }
  }, [open]);

  return { dialog }
}

export default useModal;