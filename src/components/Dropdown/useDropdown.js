import { useState, useEffect, useRef } from "react"

import useOnClickOutside from "../../hooks/useOnClickOutside";
import useDetectDevice from "../../hooks/useDetectDevice";

const useDropdown = (dropdownType) => {
  const [show, setShow] = useState(false);
  
  const dropdownRef = useRef(null);
  
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

  return { show, dropdownRef, handleToggleDropDown, dropdownEvents, }
}

export default useDropdown;