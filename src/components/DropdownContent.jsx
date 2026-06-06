export default function DropdownContent({ children, styleClass, open }) {
  const dropDownClass = `${styleClass} ${open && 'open'}`;

  return (
    <div className={dropDownClass}>
      {children}
    </div>
  );
}