export default function DropdownBtn({ content, classes = '', buttonRef = null }) {
  return (
    <button ref={buttonRef} className={`dropdown__button${classes !== '' ? ' ' + classes : ''}`}>
      {content}
    </button>
  );
}