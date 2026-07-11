import { useState } from "react";
import { createPortal } from "react-dom";

import useDropdown from './useDropdown';

import DropdownContent from "./DropdownContent";
import DropdownBtn from './DropdownBtn';

export default function Dropdown({ children, dropdownBtn, dropdownType, dropdownStyles = '', dropdownContentStyles = '', isSmart = false, smartOptions = {} }) {
  
  const { 
    show, 
    dropdownRef, 
    buttonEvents, 
    wrapperEvents,
    dropdownContentRef, 
    tooClose, 
    dropdownBtnRef, 
    dropdownPosition, 
    mounted,
    visible,
  } = useDropdown(dropdownType, isSmart, smartOptions);

  let additionalClasses = `${tooClose.isTrue ? ' tooClose-' + tooClose.direction : ''}${show ? ' open' : ''}`;

  if (isSmart) {
    additionalClasses = `${tooClose.isTrue ? ' tooClose-' + tooClose.direction : ''}${visible ? ' open' : ''}`;
    
    return (
      <>
        <DropdownBtn {...dropdownBtn} buttonRef={dropdownBtnRef} events={buttonEvents} />

        {mounted && createPortal(
          <div
            {...wrapperEvents}
            className={`${dropdownStyles} ${dropdownContentStyles} ${additionalClasses}`}
            ref={dropdownRef}
            style={{...dropdownPosition}}
          >
            <DropdownContent open={show} contentRef={dropdownContentRef}>
              {children}
            </DropdownContent>
          </div>,
          document.getElementById('smart-dropdown')
        )}
      </>
    )
  }

  return (
    <div {...wrapperEvents} className={`${dropdownStyles} ${dropdownContentStyles}${additionalClasses}`} ref={dropdownRef} >
      <DropdownBtn {...dropdownBtn} buttonRef={dropdownBtnRef} events={buttonEvents} />

      <DropdownContent open={show} contentRef={dropdownContentRef} >
        {children}
      </DropdownContent> 
    </div>
  );
}