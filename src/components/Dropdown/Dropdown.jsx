import { useState } from "react";

import DropdownContent from "./DropdownContent";

export default function Dropdown({children, dropdownContentStyles = '', dropdownStyles = '', dropdownBtn, dropdownType}) {
  const [show, setShow] = useState(false);

  function handleToggleDropDown() {
    setShow(prevShow => !prevShow);
  }

  let dropdownEvents, isTouchDevice;
  if (isTouchDevice) {
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
    <div {...dropdownEvents} className={dropdownStyles} >
      {dropdownBtn}

      { show && ( 
        <DropdownContent dropdownContentStyles={dropdownContentStyles} open={show} >
          {children}
        </DropdownContent> 
      )}
    </div>
  );
}