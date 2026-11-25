import { useState } from 'react';

import { Trending, Popular, NowPlaying, UpcomingMovies, TopRated } from './HomePageBlocks';


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