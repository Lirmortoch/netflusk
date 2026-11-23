import { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";

import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from '../../services/movieService';
import { getOnTheAirTodayShows, getPopularShows, getTopRatedShows, getTrendingShows } from '../../services/showsService';

import HomePageBlock from './HomePageBlock';
import MediaSlider from './MediaSlider';

function Trending({ moviesOrShows }) {
  const [trendingTimeWindow, setTrendingTimeWindow] = useState('day');

  function handleSetTrendingWindow(value) {
    setTrendingTimeWindow(value)
  }

  const title = `${trendingTimeWindow === 'day' ? `Today's` : `This Week's`} Trending ${moviesOrShows === 'movies' ? 'Movies' : 'TV Shows'}`;
  
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

function Popular({ moviesOrShows }) {
  return (
    <HomePageBlock
      title={`Popular ${moviesOrShows === 'movies' ? 'Movies' : 'TV Shows'}`}
      name={'popular'}
    >
      <MediaSlider
        moviesOrShows={moviesOrShows}
        moviesFnc={getPopularMovies}
        showsFnc={getPopularShows}
      />
    </HomePageBlock>
  );
}
function NowPlaying({ moviesOrShows }) {
  return (
    <HomePageBlock
      title={moviesOrShows === 'movies' ? 'Now Playing Movies' : 'On The Air TV Shows'}
      name={moviesOrShows === 'movies' ? 'now-playing' : 'on-the-air'}
    >
      <MediaSlider
        moviesOrShows={moviesOrShows}
        moviesFnc={getNowPlayingMovies}
        showsFnc={getOnTheAirTodayShows}
      />
    </HomePageBlock>
  );
}

function UpcomingMovies({}) {
  return (
    <HomePageBlock
      title={'Upcoming Movies'}
      name={'upcoming'}
    >
      <MediaSlider
        moviesOrShows={'movies'}
        moviesFnc={getUpcomingMovies}
      />
    </HomePageBlock>
  );
}

function TopRated({ moviesOrShows }) {
  return (
    <HomePageBlock
      title={`Top Rated ${moviesOrShows === 'movies' ? 'Movies' : 'TV Shows'}`}
      name={'top-rated'}
    >
      <MediaSlider
        moviesOrShows={moviesOrShows}
        moviesFnc={getTopRatedMovies}
        showsFnc={getTopRatedShows}
      />
    </HomePageBlock>
  );
}

export default function Home({}) {
  const [moviesOrShows, setMovieOrShows] = useState('movies');

  return (
    <main className='main main-page'>
      <Trending moviesOrShows={moviesOrShows} />
      <Popular moviesOrShows={moviesOrShows}/>
      <NowPlaying moviesOrShows={moviesOrShows}/>

      {moviesOrShows === 'movies' ? <UpcomingMovies /> : null}

      <TopRated moviesOrShows={moviesOrShows}/>
    </main>
  );
}