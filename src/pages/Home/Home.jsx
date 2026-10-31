import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getTrendingMovies } from '../../services/movieService';

// import Slider from '../../components/ui/Slider/Slider';

function Slider({ }) {
  return (
    <>
      <></>
    </>
  );
}

function TrendingCard({ }) {
  return (
    <>
      <></>
    </>
  );
}

function Trending({ }) {
  const [trendingTimeWindow, setTrendingTimeWindow] = useState('day');
  

  

  return (
    <>
      <></>
    </>
  );
}

export default function Home({}) {
  const movieLists = useSelector(({ movieLists }) => movieLists);

  const [movieOrTv, setMovieOrTv] = useState('movie');

  return (
    <>
      <h3>Hello, It's main page</h3>
      
    </>
  );
}