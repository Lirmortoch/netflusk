import { useState, useEffect, useRef, useLayoutEffect } from "react"

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import useDetectDevice from "../../../hooks/useDetectDevice";
import useAnimation from '../../../hooks/useAnimation';

const useDropdown = (dropdownType, isSmart = false, smartOptions) => {
  const [show, setShow] = useState(false);
  const [tooClose, setTooClose] = useState({ isTrue: false, direction: '' });
  const [dropdownPosition, setDropdownPosition] = useState(null);
  
  const { mounted, visible } = useAnimation(show);

  const dropdownRef = useRef(null);
  const dropdownContentRef = useRef(null);
  const dropdownBtnRef = useRef(null);

  useLayoutEffect(() => {
    if (!mounted || !isSmart || !dropdownBtnRef.current) return;

    const btnRect = dropdownBtnRef.current.getBoundingClientRect();

    let left = `${btnRect.left - btnRect.width / 2}px`;

    if (smartOptions.onMiddle && !tooClose.isTrue) {
      left = `${btnRect.left + btnRect.width / 2}px`;
    }
    else if (tooClose.isTrue && tooClose.direction === 'right') {
      left = `${btnRect.left + btnRect.width}px`;
    }

    setDropdownPosition({
      position: 'absolute',
      top: `${btnRect.bottom}px`,
      left,
    });
  }, [mounted]);

  useEffect(() => {
    if (show && dropdownContentRef.current && dropdownBtnRef.current) {
      const rect = dropdownContentRef.current.getBoundingClientRect();
      const btnRect = dropdownBtnRef.current.getBoundingClientRect();
      
      const distanceToRight = window.innerWidth - rect.right;
      const distanceToLeft = window.innerWidth - rect.left;
      const halfDropdownWidth = rect.width / 2;

      if (distanceToRight < 5) {
        setTooClose({direction: 'right', isTrue: true});
      }
      else if (distanceToLeft < 5) {
        setTooClose({direction: 'left', isTrue: true});
      }
      else {
        setTooClose({ isTrue: false, direction: '' });
      }
    }
  }, [show, mounted]);

  useOnClickOutside([dropdownRef, dropdownBtnRef], () => setShow(false), dropdownType !== 'hover' && show);

  const device = useDetectDevice();
  
  const handleToggleDropdown = () => setShow(prevShow => !prevShow);
  const handleOpenDropdown = () => setShow(true);
  const handleCloseDropdown = () => setShow(false);

  let buttonEvents = {}
  let wrapperEvents = {}

  if (device === 'tablet' || device === 'mobile') {
    buttonEvents = { onClick: handleToggleDropdown }
  }
  else if (dropdownType === 'click') {
    buttonEvents = { onClick: handleToggleDropdown }
  }
  else if (dropdownType === 'hover') {
    wrapperEvents = { onMouseEnter: handleOpenDropdown, onMouseLeave: handleCloseDropdown }

    if (isSmart) {
      buttonEvents = { onMouseEnter: handleOpenDropdown, onMouseLeave: handleCloseDropdown }
    }
  }

  return { 
    show, 
    dropdownRef, 
    wrapperEvents, 
    buttonEvents,
    dropdownContentRef, 
    tooClose, 
    dropdownBtnRef, 
    dropdownPosition, 
    mounted,
    visible,
  }
}

export default useDropdown;