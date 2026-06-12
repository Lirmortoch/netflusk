import { useState, useRef } from "react";

import useDropdown from './useDropdown';

import DropdownContent from "./DropdownContent";

export default function Dropdown({children, dropdownContentStyles = '', dropdownStyles = '', dropdownBtn, dropdownType}) {
  const { show, dropdownRef, handleToggleDropDown, dropdownEvents, } = useDropdown(dropdownType);

  return (
    <div {...dropdownEvents} className={dropdownStyles} ref={dropdownRef} >
      {dropdownBtn}

      <DropdownContent dropdownContentStyles={dropdownContentStyles} open={show} >
        {children}
      </DropdownContent> 
    </div>
  );
}