import { useState } from "react";
import { createPortal } from "react-dom";

import useDropdown from './useDropdown';

import DropdownContent from "./DropdownContent";

export default function Dropdown({ children, isSmart = false, dropdownBtn, dropdownType, dropdownStyles = '', dropdownContentStyles = '' }) {
  const { show, dropdownRef, handleToggleDropDown, dropdownEvents, dropdownContentRef, tooClose, dropdownBtnRef, } = useDropdown(dropdownType);

  const additionalClasses = `${tooClose.isTrue ? ' tooClose-' + tooClose.direction : ''}${show ? ' open' : ''}`;

  if (isSmart) {
    return createPortal(
      <div></div>,
      document.getElementById('smart-dropdown')
    );
  }

  return (
    <div {...dropdownEvents} className={`${dropdownStyles} ${dropdownContentStyles}${additionalClasses}`} ref={dropdownRef} >
      {dropdownBtn}

      <DropdownContent open={show} contentRef={dropdownContentRef} >
        {children}
      </DropdownContent> 
    </div>
  );
}