import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useFetch } from '../../hooks/useFetch';

import { getTrendingMovies } from '../../services/movieService';
import { getTrendingShows } from '../../services/showsService';

import { wordToRegularCase } from '../../utils/utils';
import { normalizeMovie, normalizeShow } from '../../utils/normalizeTitleData';

// import Slider from '../../components/ui/Slider/Slider';

function Star({ color = 'currentColor' }) {
  return (
    <>
    <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="100%" height="100%" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
    <path fill={color} d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265
      C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642
      c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854
      c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72
      c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"/>
  </svg>
  </>
  );
}
function Card({ name, date, rating, poster_path }) {
  return (
    <li className='slider__card card card-1'>
      <Link to={``} className='card__link'>
        <div className='card__wrap'>

          <div className="card__title-wrap">
            <div className='card__title card-title'>
              <h4 className='card-title__text'>{name}</h4>
              <div className='card-title__metadata card-metadata'>
                <div className="card-metadata__year">{date}</div>
                <div className="card-metadata__rating metadata-rating">
                  <div className="metadata-rating__star">
                    <Star></Star>
                  </div>
                  <div className="metadata-rating__text">{rating}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className='card__background'>
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
function Slider({ children, classes = null }) {
  return (
    <div className={`slider${classes !== null ? ` ${classes}` : ''}`}>
      <ul className='slider__wrap'>
        { children }
      </ul>
    </div>
  );
}


function HomePageSlider({ items, sliderClasses = null }) {
  return (
    <Slider classes={sliderClasses}>
      {
        items.map(item => (
          <Card key={item.id} {...item} />
        ))
      }
    </Slider>
  );
}
function HomePageBlock({ children, title, name = null, actions = null}) {
  return (
    <section className={`main-page__block main-page-block${name !== null ? ` ${name}` : ''}`}>
      <div className={`main-page-block__header${name ? ` ${name}__header` : '' }`}>
        <h3 className={`main-page-block__title${name ? ` ${name}__title` : '' }`}>
          <span>{title}</span>
        </h3>
        {actions}
      </div>
      {children}
    </section>
  )
}

function MediaSlider({ moviesOrShows, moviesFnc, showsFnc, fncArgs = null, }) {
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

  if (isLoading) return <p>...Loading</p>;
  if (blockError || !blockItems?.length) {
    return <p>Error</p>;
  }

  const normalizeItems = moviesOrShows === 'movies' ? normalizeMovie : normalizeShow;
  return (
    <HomePageSlider 
      items={blockItems.map(normalizeItems)} 
      sliderClasses={'horizontal-slider main-page-block__slider'}   
    />
  );
}

function Trending({ moviesOrShows }) {
  const [trendingTimeWindow, setTrendingTimeWindow] = useState('day');

  function handleSetTrendingWindow(value) {
    setTrendingTimeWindow(value)
  }

  const title = `${trendingTimeWindow === 'day' ? `Today's` : `This Week's`} Trending ${wordToRegularCase(moviesOrShows)}`;
  
  return (
    <HomePageBlock
      title={title}
      name={'trending'}
      actions={(
        <div className='trending-header__switcher trending-switcher'>
          <button className='trending-switcher__button' value={'day'} onClick={(e) => handleSetTrendingWindow(e.target.value)}>Today</button>

          <button className='trending-switcher__button' value={'week'} onClick={(e) => handleSetTrendingWindow(e.target.value)}>This Week</button>
        </div>
      )}
    >
      <MediaSlider
        moviesOrShows={moviesOrShows}
        moviesFnc={getTrendingMovies}
        showsFnc={getTrendingShows}
        fncArgs={[trendingTimeWindow]}
      />
    </HomePageBlock>
  );
}

export default function Home({}) {
  const [moviesOrShows, setMovieOrShows] = useState('movies');

  return (
    <main className='main main-page'>
      <Trending moviesOrShows={moviesOrShows} />
    </main>
  );
}