import { error } from '../utils/logger';
import { API_READ_ACCESS_TOKEN } from '../utils/config';

const baseUrl = 'https://api.themoviedb.org/3';

const getAiringTodayShows = async (page = 1) => {
  try {
    const url = `${baseUrl}/tv/airing_today?language=en-US&page=${page}`;
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
    error(`Can't get 'airing today' shows: ${err}`);
    return err;
  }
}
const getOnTheAirTodayShows = async (page = 1) => {
  try {
    const url = `${baseUrl}/tv/on_the_air?language=en-US&page=${page}`;
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
    error(`Can't get 'on the air' shows: ${err}`);
    return err;
  }
}
const getPopularShows = async (page = 1) => {
  try {
    const url = `${baseUrl}/tv/popular?language=en-US&page=${page}`;
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
    error(`Can't get popular shows: ${err}`);
    return err;
  }
}
const getTopRatedShows = async (page = 1) => {
  try {
    const url = `${baseUrl}/tv/top_rated?language=en-US&page=${page}`;
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
    error(`Can't get top rated shows: ${err}`);
    return err;
  }
}


const getTrendingShows = async (time_window = 'day') => {
  try {
    const url = `${baseUrl}/trending/tv/${time_window}?language=en-US`;
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
    error(`Can't get trending shows: ${err}`);
    return err;
  }
}

export {
  getAiringTodayShows,
  getOnTheAirTodayShows,
  getPopularShows,
  getTopRatedShows,

  getTrendingShows,
}