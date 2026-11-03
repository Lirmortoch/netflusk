import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useFetch } from '../../hooks/useFetch';

import { getTrendingMovies } from '../../services/movieService';
import { getTrendingShows } from '../../services/showsService';

import { wordToRegularCase } from '../../utils/utils';
import { normalizeMovie, normalizeShow } from '../../utils/normalizeTitleData';

// import Slider from '../../components/ui/Slider/Slider';

function Slider({ children, classes = null }) {
  return (
    <ul className={`slider${classes !== null ? ` ${classes}` : ''}`}>
      { children }
    </ul>
  );
}
function SliderCard({ name, date, rating, poster_path }) {
  return (
    <li className='slider__card slider-card'>
      <Link to={``} className='slider-card__link'>
        <div className='slider-card__wrap'>
          <div className='slider-card__title slider-card-title'>
            <h4 className='slider-card-title__text'>{name}</h4>
            <div className='slider-card-title__metadata slider-card-metadata'>
              <div className="slider-card-metadata__year">{date}</div>
              <div className="slider-card-metadata__rating">{rating}</div>
            </div>
          </div>
          
          <div className='slider-card__background'>
            <img 
              src={`http://image.tmdb.org/t/p/w500/${poster_path}`} 
              loading='lazy'
              decoding='async'
              fetchPriority='low'
              alt={name}
              />
          </div>
        </div>
      </Link>
    </li>
  );
}


function HomePageSlider({ items, sliderClasses = null }) {
  return (
    <Slider classes={sliderClasses}>
      {
        items.map(item => (
          <SliderCard key={item.id} {...item} />
        ))
      }
    </Slider>
  );
}

function HomePageBlock({ moviesOrShows, title, moviesFnc, showsFnc, classes = null }) {
  const {
    isFetching: isLoading,
    error: blockError,
    fetchedData: blockData,
  } = useFetch(
    null, 
    moviesOrShows === 'movies' ? moviesFnc : showsFnc
  );

  let blockItem;
  let blockItems = blockData?.results;

  if (isLoading) blockItem = <p>...Loading</p>;
  if (!isLoading && blockItems?.length > 0 && !blockError) {
    blockItem = <HomePageSlider items={moviesOrShows === 'movies' ? blockItems.map(normalizeMovie) : blockItems.map(normalizeShow)} sliderClasses={'horizontal-slider main-page-block__slider'} />;
  }
  if (blockError) {
    blockItem = <p>Error</p>;
  }

  return (
    <section className={`main-page__block main-page-block${classes !== null ? ` ${classes}` : ''}`}>
      <div className="main-page-block__header">
        <h3 className='main-page-block__title'>
          {title}
        </h3>
      </div>
      { blockItem }
    </section>
  );
}

function Trending({ moviesOrShows }) {
  const [trendingTimeWindow, setTrendingTimeWindow] = useState('day');
  const {
    isFetching: isLoading,
    error: trendingError,
    fetchedData: trendingData,
  } = useFetch(
    null, 
    moviesOrShows === 'movies' ? getTrendingMovies : getTrendingShows, 
    [ trendingTimeWindow, ]
  );

  function handleSetTrendingWindow(value) {
    setTrendingTimeWindow(value)
  }

  let trendingItem;
  let trending = trendingData?.results;

  if (isLoading) trendingItem = <p>...Loading</p>;
  if (!isLoading && trending?.length > 0 && !trendingError) {
    trendingItem = <HomePageSlider items={moviesOrShows === 'movies' ? trending.map(normalizeMovie) : trending.map(normalizeShow)} sliderClasses={'horizontal-slider main-page-block__slider'} />;
  }
  if (trendingError) {
    trendingItem = <p>Error</p>;
  }
  
  return (
    <section className='main__trending trending main-page__block main-page-block'>
      <div className="trending__header main-page-block__header">
        <h3 className='trending-header__text main-page-block__title'>
          {trendingTimeWindow === 'day' ? `Today's` : `This Week's`} Trending {wordToRegularCase(moviesOrShows)}
        </h3>
        <div className='trending-header__switcher trending-switcher'>
          <button className='trending-switcher__button' value={'day'} onClick={(e) => handleSetTrendingWindow(e.target.value)}>Today</button>

          <button className='trending-switcher__button' value={'week'} onClick={(e) => handleSetTrendingWindow(e.target.value)}>This Week</button>
        </div>
      </div>
      { trendingItem }
    </section>
  );
}

export default function Home({}) {
  const [moviesOrShows, setMovieOrShows] = useState('movies');

  return (
    <main className='main main-page'>
      <h3>Hello, It's main page</h3>
     
      <Trending moviesOrShows={moviesOrShows} />
    </main>
  );
}