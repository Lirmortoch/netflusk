export default function DropdownContent({ children, dropdownContentStyles, open }) {
  const dropDownClass = `${dropdownContentStyles}${open ? ' open' : ''}`;

  return (
    <div className={dropDownClass}>
      {children}
    </div>
  );
}