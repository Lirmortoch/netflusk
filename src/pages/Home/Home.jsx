import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useFetch } from '../../hooks/useFetch';

import { getTrendingMovies } from '../../services/movieService';
import { getTrendingShows } from '../../services/showsService';

// import Slider from '../../components/ui/Slider/Slider';

function Slider({ children, classes = null }) {
  return (
    <ul className={`slider horizontal-slider${classes !== null ? ` ${classes}` : ''}`}>
      { children }
    </ul>
  );
}

function TrendingMovieSlider({ movies, sliderClasses = null }) {
  return (
    <Slider>
      {
        movies.map(movie => {
          return (
            <li key={movie.id} className='slider__card slider-card'>
              <Link to={``}>
                <div>
                  
                </div>
              </Link>
            </li>
          )
        })
      }
    </Slider>
  )
}
function TrendingShowsSlider({ shows, sliderClasses = null }) {
  return (
    <Slider classes={sliderClasses}>
      {
        shows.map(show => {
          return (
            <li key={show.id} className='slider__card slider-card'>
              <Link to={``}>
                <div>
                  
                </div>
              </Link>
            </li>
          )
        })
      }
    </Slider>
  )
}

function Trending({ movieOrShows }) {
  const [trendingTimeWindow, setTrendingTimeWindow] = useState('day');
  const {
    isFetching: isLoading,
    error: trendingError,
    fetchedData: trendingData,
  } = useFetch(null, movieOrShows === 'movie' ? getTrendingMovies : getTrendingShows, [ trendingTimeWindow, ]);

  let trendingItem;
  let trending = trendingData?.results;

  console.log(trending)

  if (isLoading) trendingItem = <p>...Loading</p>;
  if (!isLoading && trending?.length > 0 && !trendingError) {
    trendingItem = movieOrShows === 'movie' 
      ? <TrendingMovieSlider movies={trending} />
      : <TrendingShowsSlider shows={trending} />
  }
  if (trendingError) {
    trendingItem = <p>Error</p>;
  }
  
  return (
    <section className='main__trending home-page-block trending'>
      <div class="trending__header trending-header">
        <h4 className='trending-header__text'>Trending {movieOrShows}</h4>
        <div className='trending-header__switcher'></div>
      </div>
      { trendingItem }
    </section>
  );
}

export default function Home({}) {
  const [movieOrShows, setMovieOrShows] = useState('movie');

  return (
    <main className='main'>
      <h3>Hello, It's main page</h3>
     
      <Trending movieOrShows={movieOrShows} />
    </main>
  );
}