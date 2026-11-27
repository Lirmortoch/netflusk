import { useFetch } from "../../../hooks/useFetch";
import PageSlider from "./PageSlider";

export default function MediaSlider({ fetchFnc, fncArgs = [], normalizeFnc, sliderClasses = undefined, Card }) {
  const {
    isFetching: isLoading,
    error: blockError,
    fetchedData: blockData,
  } = useFetch(
    null, 
    fetchFnc,
    fncArgs,
  );

  let blockItems = blockData?.results;

  if (isLoading) {
    return ( 
      <div className={`slider horizontal-slider main-page-block__slider page-block__slider loader-slider`}>
        <ul className="slider__wrap"></ul>
      </div>
    );
  }
  if (blockError || !blockItems?.length) {
    return <p>Error</p>;
  }

  return (
    <PageSlider 
      items={blockItems.map(normalizeFnc)} 
      sliderClasses={`horizontal-slider page-block__slider${sliderClasses !== undefined ? ` ${sliderClasses}` : ""}`}
      Card={Card}   
    />
  );
}