import useSlider from "./useSlider";

import SliderButton from "./SliderButton";
import { PrevIcon, NextIcon } from "./Icons";

export default function Slider({ children, classes = undefined }) {
  const { atStart, atEnd, sliderRef, handleScrollToRight, handleScrollToLeft } =
    useSlider(children);

  return (
    <div className={`slider${classes !== undefined ? ` ${classes}` : ""}`}>
      <SliderButton
        btnClasses={`left-btn${atStart ? " hidden" : ""}`}
        onClick={handleScrollToLeft}
      >
        <PrevIcon />
      </SliderButton>

      <ul className="slider__wrap" ref={sliderRef}>
        {children}
      </ul>

      <SliderButton
        btnClasses={`right-btn${atEnd ? " hidden" : ""}`}
        onClick={handleScrollToRight}
      >
        <NextIcon />
      </SliderButton>
    </div>
  );
}
