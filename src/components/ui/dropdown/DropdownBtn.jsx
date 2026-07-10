export default function DropdownBtn({ text, classes = '', buttonRef = null, events = null }) {
  return (
    <button ref={buttonRef} className={`dropdown__button${classes !== '' ? ' ' + classes : ''}`} {...events}>
      {text}
    </button> 
  );
}