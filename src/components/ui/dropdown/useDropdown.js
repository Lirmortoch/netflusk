import { useState, useEffect, useRef } from "react"

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import useDetectDevice from "../../../hooks/useDetectDevice";

const useDropdown = (dropdownType) => {
  const [show, setShow] = useState(false);
  const [tooClose, setTooClose] = useState(false);
  
  const dropdownRef = useRef(null);
  const dropdownContentRef = useRef(null);
  const dropdownBtnRef = useRef(null);

  useEffect(() => {
    if (show) {
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
        return;
      }
    }
  }, [show]);

  useOnClickOutside(dropdownRef, () => setShow(false), dropdownType !== 'hover');
  const device = useDetectDevice();
  
  function handleToggleDropDown() {
    setShow(prevShow => !prevShow);
  }

  let dropdownEvents;
  if (device === 'tablet' || device === 'mobile') {
    dropdownEvents = { 
      onTouchEnd: handleToggleDropDown, 
    }
  }
  else if (dropdownType === 'click') {
    dropdownEvents = {
      onClick: handleToggleDropDown,
    }
  }
  else if (dropdownType === 'hover') {
    dropdownEvents = { 
      onMouseEnter: handleToggleDropDown, 
      onMouseLeave: handleToggleDropDown 
    } 
  }

  return { show, dropdownRef, handleToggleDropDown, dropdownEvents, dropdownContentRef, tooClose, dropdownBtnRef, }
}

export default useDropdown;