import { createPortal } from "react-dom";
import useModal from "./useModal";

export default function Modal({ open, children, onClose }) {
  const { dialog } = useModal(open);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>, 
    document.getElementById('modal')
  );
}