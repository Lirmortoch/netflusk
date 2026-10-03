import { useState, useRef, useLayoutEffect } from "react"

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import useDetectDevice from "../../../hooks/useDetectDevice";
import useAnimation from '../../../hooks/useAnimation';

const useDropdown = (dropdownType, isSmart = false, smartOptions = {}, hasArrow = false) => {
  const [show, setShow] = useState(false);
  const [tooClose, setTooClose] = useState({ isTrue: false, direction: '' });
  const [dropdownPosition, setDropdownPosition] = useState(null);

  const { mounted, visible } = useAnimation(show);

  const dropdownRef = useRef(null);
  const dropdownContentRef = useRef(null);
  const dropdownBtnRef = useRef(null);

  useLayoutEffect(() => {
    if (!mounted || !isSmart || !dropdownBtnRef.current || !dropdownContentRef.current) return;

    const btnRect = dropdownBtnRef.current.getBoundingClientRect();
    const contentWidth = dropdownContentRef.current.offsetWidth;

    let idealLeft = smartOptions.onMiddle
      ? btnRect.left + btnRect.width / 2 - contentWidth / 2
      : btnRect.left;

    const distanceToRight = window.innerWidth - (idealLeft + contentWidth);
    const distanceToLeft = idealLeft;

    let direction = '';
    let isTrue = false;

    if (distanceToRight < 5) {
      direction = 'right';
      isTrue = true;
    } else if (distanceToLeft < 5) {
      direction = 'left';
      isTrue = true;
    }
    
    let left = idealLeft;
    if (isTrue && direction === 'right') {
      // need to add button's padding
      const correctArrow = Math.ceil(contentWidth / 10) - 5;
      left = btnRect.right - contentWidth + (hasArrow && correctArrow + (correctArrow/10));
    } else if (isTrue && direction === 'left') {
      // need to add button's padding
      const correctArrow = Math.ceil(contentWidth / 10) - 5;
      left = btnRect.left + (hasArrow && correctArrow + (correctArrow/10));
    }

    setTooClose({ isTrue, direction });
    setDropdownPosition({
      position: 'absolute',
      top: `${btnRect.bottom}px`,
      left: `${left}px`,
    });

  }, [mounted]);

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