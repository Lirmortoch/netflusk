import { useState, useRef } from "react";

import useDropdown from './useDropdown';

import DropdownContent from "./DropdownContent";

export default function Dropdown({children, dropdownStyles = '', dropdownBtn, dropdownType, dropdownContentStyles = ''}) {
  const { show, dropdownRef, handleToggleDropDown, dropdownEvents, } = useDropdown(dropdownType);

  return (
    <div {...dropdownEvents} className={`${dropdownStyles} ${dropdownContentStyles}${show ? ' open' : ''}`} ref={dropdownRef} >
      {dropdownBtn}

      <DropdownContent open={show} >
        {children}
      </DropdownContent> 
    </div>
  );
}