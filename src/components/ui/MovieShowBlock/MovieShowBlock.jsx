import { useFetch } from "../../../hooks/useFetch";
import { normalizeMovie, normalizeShow } from "../../../utils/normalizeData";
import PageSlider from "../MediaSlider/PageSlider";
import MovieShowCard from "../MovieShowCard/MovieShowCard";
import MovieShowTemplate from "./MovieShowTemplate";

export default function MovieShowBlock({ moviesOrShows, moviesFnc = undefined, showsFnc = undefined, fncArgs = [], sliderClasses = undefined }) {
  const fetchFnc = moviesOrShows === 'movies' ? moviesFnc : showsFnc
  const normalizeFnc = moviesOrShows === 'movies' ? normalizeMovie : normalizeShow;

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
    return <MovieShowTemplate name={'loader-slider'} />;
  }
  if (blockError || !blockItems?.length) {
    return <p>Error</p>;
  }

  return (
    <PageBlock
      title={title}
      name={`${name}`}
      actions={actions}
    >
      <PageSlider 
        items={blockItems.map(normalizeFnc)} 
        sliderClasses={`horizontal-slider page-block__slider${sliderClasses !== undefined ? ` ${sliderClasses}` : ""}`}
        Card={MovieShowCard}   
      />
    </PageBlock>
);
}