export default function DropdownContent({ children, open }) {
  const dropDownClass = `dropdown__content${open ? ' open' : ''}`;

  return (
    <div className={dropDownClass}>
      {children}
    </div>
  );
}