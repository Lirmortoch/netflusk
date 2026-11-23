import { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";

import { getTrendingMovies } from '../../services/movieService';
import { getTrendingShows } from '../../services/showsService';

import { wordToRegularCase } from '../../utils/utils';

import HomePageBlock from './HomePageBlock';
import MediaSlider from './MediaSlider';

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