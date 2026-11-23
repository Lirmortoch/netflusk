export default function SliderButton({children, btnClasses = undefined, ...attributes}) {
  return (
    <button type='button' className={`slider__button scroll-btn${btnClasses !== undefined ? ` ${btnClasses}` : ''}`} {...attributes}>
      <div className='scroll-btn__icon'>
        {children}
      </div>
    </button>
  );
}