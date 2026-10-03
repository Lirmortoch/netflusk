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
  } = useDropdown(dropdownType, isSmart, smartOptions, dropdownContentStyles.includes('dropdown-styles-arrow'));

  let additionalClasses = `${tooClose.isTrue ? 'tooClose-' + tooClose.direction + ' ' : ''}${show ? ' open' : ''}`;

  if (isSmart) {
    let smartOptionsClass = '';
    const smartOptionsArray = Object.entries(smartOptions);

    smartOptionsArray.forEach((item, idx) => {
      if (item) {
        const temp = item[0].slice(2).toLowerCase();
        smartOptionsClass += temp === 'middle' ? `drop-on-${temp}` : `drop-${temp}`;
      }
      if (smartOptionsArray.length > 1 && idx !== smartOptionsArray.length - 1) smartOptionsClass += ' ';
    });

    additionalClasses = `${tooClose.isTrue ? 'tooClose-' + tooClose.direction + ' ' : ''}${visible ? 'open' : ''} smart${smartOptionsClass === '' ? '' : ` ${smartOptionsClass}`}`;
    
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