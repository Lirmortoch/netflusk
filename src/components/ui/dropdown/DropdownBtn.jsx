export default function DropdownBtn({ text, classes = '', buttonRef = null, }) {
  return (
    <button ref={buttonRef} className={`dropdown__button${classes !== '' ? ' ' + classes : ''}`}>
      {text}
    </button> 
  );
}