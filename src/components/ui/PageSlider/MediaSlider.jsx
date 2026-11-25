import { useFetch } from "../../../hooks/useFetch";
import { normalizeMovie, normalizeShow } from "../../../utils/normalizeTitleData";
import PageSlider from "./PageSlider";

export default function MediaSlider({ moviesOrShows, moviesFnc = undefined, showsFnc = undefined, fncArgs = [], }) {
  const {
    isFetching: isLoading,
    error: blockError,
    fetchedData: blockData,
  } = useFetch(
    null, 
    moviesOrShows === 'movies' ? moviesFnc : showsFnc,
    fncArgs,
  );

  let blockItems = blockData?.results;

  if (isLoading) {

    return <p>...Loading</p>;
  }
  if (blockError || !blockItems?.length) {
    return <p>Error</p>;
  }

  const normalizeItems = moviesOrShows === 'movies' ? normalizeMovie : normalizeShow;
  return (
    <PageSlider 
      items={blockItems.map(normalizeItems)} 
      sliderClasses={'horizontal-slider main-page-block__slider page-block__slider'}   
    />
  );
}