import { useState } from "react";
import { createPortal } from "react-dom";

import useDropdown from './useDropdown';

import DropdownContent from "./DropdownContent";
import DropdownBtn from './DropdownBtn';

export default function Dropdown({ children, dropdownBtn, dropdownType, dropdownStyles = '', dropdownContentStyles = '' }) {
  const { show, dropdownRef, handleToggleDropDown, dropdownEvents, dropdownContentRef, tooClose, dropdownBtnRef, } = useDropdown(dropdownType);

  const additionalClasses = `${tooClose.isTrue ? ' tooClose-' + tooClose.direction : ''}${show ? ' open' : ''}`;

  return (
    <div {...dropdownEvents} className={`${dropdownStyles} ${dropdownContentStyles}${additionalClasses}`} ref={dropdownRef} >
      <DropdownBtn {...dropdownBtn} buttonRef={dropdownBtnRef} ></DropdownBtn>

      <DropdownContent open={show} contentRef={dropdownContentRef} >
        {children}
      </DropdownContent> 
    </div>
  );
}