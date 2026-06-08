import { useState } from "react";

import DropdownContent from "./DropdownContent";

export default function Dropdown({children, dropdownContentStyles = '', dropdownStyles = '', dropdownBtn, dropdownType}) {
  const [show, setShow] = useState(false);

  function handleShowDropdown() {
    setShow(true);
  }
  function handleHideDropdown() {
    setShow(false);
  }


  let dropdownEvents, isTouchDevice;
  if (isTouchDevice) {
    dropdownEvents = { 
      onTouchEnd: handleShowDropdown, 
    }
  }
  else if (dropdownType === 'click') {
    dropdownEvents = {
      onClick: handleShowDropdown,
    }
  }
  else if (dropdownType === 'hover') {
    dropdownEvents = { 
      onMouseEnter: handleShowDropdown, 
      onMouseLeave: handleHideDropdown 
    } 
  }

  return (
    <div {...dropdownEvents} className={dropdownStyles} >
      {dropdownBtn}

      { show && ( 
        <DropdownContent styleClass={dropdownContentStyles} open={show} >
          {children}
        </DropdownContent> 
      )}
    </div>
  );
}