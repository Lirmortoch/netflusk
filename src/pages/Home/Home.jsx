import { Trending, Popular, NowPlaying, UpcomingMovies, TopRated } from './HomePageBlocks';
import { useSelector } from 'react-redux';


export default function Home({}) {
  const moviesOrShows = useSelector(({ appSettings }) => appSettings.moviesOrShows);

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