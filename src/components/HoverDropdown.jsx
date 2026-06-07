import { useState } from "react";

import DropdownContent from "./DropdownContent";

export default function HoverDropdown({children, dropdownContentStyles, componentStyles, dropdownBtn}) {
  const [show, setShow] = useState(false);

  function handleShowDropdown() {
    setShow(true);
  }
  function handleHideDropdown() {
    setShow(false);
  }

  return (
    <div onMouseEnter={handleShowDropdown} onMouseLeave={handleHideDropdown} className={componentStyles} >
      {dropdownBtn}

      { show && ( 
        <DropdownContent styleClass={dropdownContentStyles} open={show} >
          {children}
        </DropdownContent> 
      )}
    </div>
  );
}