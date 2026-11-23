import { useState, useRef, useEffect } from "react";

const useSlider = (children) => {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const sliderRef = useRef();

  useEffect(() => {
    const el = sliderRef.current;
    const first = el?.firstElementChild;
    const last = el?.lastElementChild;
    if (!first) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const fullyVisible = e.intersectionRatio >= 0.95;
        if (e.target === first) setAtStart(fullyVisible);
        if (e.target === last) setAtEnd(fullyVisible);
      });
    }, { root: el, threshold: 0.95 });

    io.observe(first);
    if (last !== first) io.observe(last);
    return () => io.disconnect();
  }, [children]); 
  
  const scrollAmount = (sliderRef.current?.clientWidth  * 0.9);
  const scrollOptions = {
    top: 0,
    behavior: 'auto',
  }

  function handleScrollToRight() {
    sliderRef.current?.scrollBy({...scrollOptions, left: scrollAmount});
  }
  function handleScrollToLeft() {
    sliderRef.current?.scrollBy({...scrollOptions, left: -scrollAmount});
  }

  return {
    atStart, 
    atEnd,

    sliderRef,

    handleScrollToRight,
    handleScrollToLeft
  }
}

export default useSlider;