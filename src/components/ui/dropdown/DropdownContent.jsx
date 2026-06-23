export default function DropdownContent({ children, open, contentRef }) {
  const dropDownClass = `dropdown__content${open ? ' open' : ''}`;

  return (
    <div className={dropDownClass} ref={contentRef} >
      {children}
    </div>
  );
}