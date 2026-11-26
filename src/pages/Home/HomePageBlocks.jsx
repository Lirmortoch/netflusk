import { useState } from 'react';

import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from '../../services/movieService';
import { getOnTheAirTodayShows, getPopularShows, getTopRatedShows, getTrendingShows } from '../../services/showsService';

import SliderPageBlock from '../../components/ui/PageBlock/SliderPageBlock';

export function Trending({ moviesOrShows }) {
  const [trendingTimeWindow, setTrendingTimeWindow] = useState('day');

  function handleSetTrendingWindow(value) {
    setTrendingTimeWindow(value)
  }

  const title = (
    <div className='trending-header__switcher trending-switcher'>
      <button className={`trending-switcher__button${trendingTimeWindow === 'day' ? ' selected' : ''}`} value={'day'} onClick={(e) => handleSetTrendingWindow(e.target.value)}>Today's</button>

      <span className='trending-switcher__text or-text'>or</span>

      <button className={`trending-switcher__button${trendingTimeWindow === 'week' ? ' selected' : ''}`} value={'week'} onClick={(e) => handleSetTrendingWindow(e.target.value)}>This Week's</button>

      <span className='trending-switcher__text'>{`Trending ${moviesOrShows === 'movies' ? 'Movies' : 'TV Shows'}`}</span>
    </div>
  );
  
  return (
    <SliderPageBlock 
      title={title}
      name={'trending'}
      moviesOrShows={moviesOrShows}
      moviesFnc={getTrendingMovies}
      showsFnc={getTrendingShows}
      fncArgs={[trendingTimeWindow]}
    />
  );
}

export function Popular({ moviesOrShows }) {
  return (
    <SliderPageBlock
      title={`Popular ${moviesOrShows === 'movies' ? 'Movies' : 'TV Shows'}`}
      name={'popular'}
      moviesOrShows={moviesOrShows}
      moviesFnc={getPopularMovies}
      showsFnc={getPopularShows}
    />

  );
}
export function NowPlaying({ moviesOrShows }) {
  return (
    <SliderPageBlock
      title={moviesOrShows === 'movies' ? 'Now Playing Movies' : 'On The Air TV Shows'}
      name={moviesOrShows === 'movies' ? 'now-playing main-page__block' : 'on-the-air main-page__block'}
      moviesOrShows={moviesOrShows}
      moviesFnc={getNowPlayingMovies}
      showsFnc={getOnTheAirTodayShows}
    />
  );
}

export function UpcomingMovies({}) {
  return (
    <SliderPageBlock
      title={'Upcoming Movies'}
      name={'upcoming main-page__block'}
      moviesOrShows={'movies'}
      moviesFnc={getUpcomingMovies}
    />
  );
}

export function TopRated({ moviesOrShows }) {
  return (
    <SliderPageBlock
      title={`Top Rated ${moviesOrShows === 'movies' ? 'Movies' : 'TV Shows'}`}
      name={'top-rated main-page__block'}
      moviesOrShows={moviesOrShows}
      moviesFnc={getTopRatedMovies}
      showsFnc={getTopRatedShows}
      />
  );
}