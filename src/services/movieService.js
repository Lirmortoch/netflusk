import { error } from '../utils/logger';
import { API_READ_ACCESS_TOKEN } from '../utils/config';

const baseUrl = 'https://api.themoviedb.org/3';

const getNowPlayingMovies = async (page = 1) => {
  try {
    const url = `${baseUrl}/movie/now_playing?language=en-US&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        'content-type': 'application/json',
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.status_message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    return data;
  }
  catch (err) {
    error(`Can't get 'now playing' movies: ${err}`);
    return err;
  }
}
const getPopularMovies = async (page = 1) => {
  try {
    const url = `${baseUrl}/movie/popular?language=en-US&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        'content-type': 'application/json',
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.status_message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    return data;
  }
  catch (err) {
    error(`Can't get popular movies: ${err}`);
    return err;
  }
}
const getTopRatedMovies = async (page = 1) => {
  try {
    const url = `${baseUrl}/movie/top_rated?language=en-US&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        'content-type': 'application/json',
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.status_message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    return data;
  }
  catch (err) {
    error(`Can't get 'top rated' movies: ${err}`);
    return err;
  }
}
const getUpcomingMovies = async (page = 1) => {
  try {
    const url = `${baseUrl}/movie/upcoming?language=en-US&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        'content-type': 'application/json',
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.status_message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    return data;
  }
  catch (err) {
    error(`Can't get upcoming movies: ${err}`);
    return err;
  }
}
const getTrendingMovies = async (time_window = 'day') => {
  try {
    const url = `${baseUrl}/trending/movie/${time_window}?language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        'content-type': 'application/json',
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.status_message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    return data;
  }
  catch (err) {
    error(`Can't get trending movies: ${err}`);
    return err;
  }
}

export {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getTrendingMovies,
}