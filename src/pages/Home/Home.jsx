import { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";

import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from '../../services/movieService';
import { getOnTheAirTodayShows, getPopularShows, getTopRatedShows, getTrendingShows } from '../../services/showsService';

import PageBlock from '../../components/ui/PageBlock/PageBlock';
import MediaSlider from '../../components/ui/PageSlider/MediaSlider';

function SliderPageBlock({ title, name, actions = null, moviesOrShows, moviesFnc = undefined, showsFnc = undefined, fncArgs = []}) {
  return (
    <PageBlock
      title={title}
      name={`${name} main-page__block`}
      actions={actions}
    >
      <MediaSlider
        moviesOrShows={moviesOrShows}
        moviesFnc={moviesFnc}
        showsFnc={showsFnc}
        fncArgs={fncArgs}
      />
    </PageBlock>
  );
}

function Trending({ moviesOrShows }) {
  const [trendingTimeWindow, setTrendingTimeWindow] = useState('day');

  function handleSetTrendingWindow(value) {
    setTrendingTimeWindow(value)
  }

  const title = `${trendingTimeWindow === 'day' ? `Today's` : `This Week's`} Trending ${moviesOrShows === 'movies' ? 'Movies' : 'TV Shows'}`;
  
  return (
    <SliderPageBlock 
      title={title}
      name={'trending'}
      actions={(
        <div className='trending-header__switcher trending-switcher'>
          <button className='trending-switcher__button' value={'day'} onClick={(e) => handleSetTrendingWindow(e.target.value)}>Today</button>

          <button className='trending-switcher__button' value={'week'} onClick={(e) => handleSetTrendingWindow(e.target.value)}>This Week</button>
        </div>
      )}
      moviesOrShows={moviesOrShows}
      moviesFnc={getTrendingMovies}
      showsFnc={getTrendingShows}
      fncArgs={[trendingTimeWindow]}
    />
  );
}

function Popular({ moviesOrShows }) {
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
function NowPlaying({ moviesOrShows }) {
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

function UpcomingMovies({}) {
  return (
    <SliderPageBlock
      title={'Upcoming Movies'}
      name={'upcoming main-page__block'}
      moviesOrShows={'movies'}
      moviesFnc={getUpcomingMovies}
    />
  );
}

function TopRated({ moviesOrShows }) {
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