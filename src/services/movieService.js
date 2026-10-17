import { error } from '../utils/logger';
import { API_READ_ACCESS_TOKEN } from '../utils/config';

const baseUrl = 'https://api.themoviedb.org/3';

const getNowPlayingMovies = async (page = 1) => {
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

export {
  getNowPlayingMovies,
}