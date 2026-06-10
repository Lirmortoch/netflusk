import { useState, useRef } from "react";

import useOnClickOutside from '../../hooks/useOnClickOutside';
import useDetectDevice from '../../hooks/useDetectDevice';

import DropdownContent from "./DropdownContent";

export default function Dropdown({children, dropdownContentStyles = '', dropdownStyles = '', dropdownBtn, dropdownType}) {
  const [show, setShow] = useState(false);

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setShow(false));
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

  return (
    <div {...dropdownEvents} className={dropdownStyles} ref={dropdownRef} >
      {dropdownBtn}

      { show && ( 
        <DropdownContent dropdownContentStyles={dropdownContentStyles} open={show} >
          {children}
        </DropdownContent> 
      )}
    </div>
  );
}