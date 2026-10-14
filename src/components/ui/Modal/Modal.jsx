import { createPortal } from "react-dom";
import useModal from "./useModal";

export default function Modal({ open, children, onClose, modalClassName = '' }) {
  const { dialog } = useModal(open);
  const modalClass = modalClassName === '' ? 'modal' : `modal ${modalClassName}`;

  return createPortal(
    <dialog className={modalClass} ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>, 
    document.getElementById('modal')
  );
}