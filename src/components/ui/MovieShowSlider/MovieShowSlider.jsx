import { normalizeMovie, normalizeShow } from "../../../utils/normalizeData";

import MediaSlider from "../MediaSlider/MediaSlider";
import MovieShowCard from "../MovieShowCard/MovieShowCard";

export default function MovieShowSlider({ moviesOrShows, moviesFnc = undefined, showsFnc = undefined, fncArgs = [], sliderClasses = undefined }) {
  const fetchFnc = moviesOrShows === 'movies' ? moviesFnc : showsFnc
  const normalizeFnc = moviesOrShows === 'movies' ? normalizeMovie : normalizeShow;

  return (
    <MediaSlider 
      fetchFnc={fetchFnc}   
      fncArgs={fncArgs}
      normalizeFnc={normalizeFnc}
      sliderClasses={sliderClasses}
      Card={MovieShowCard}
    />
  );
}