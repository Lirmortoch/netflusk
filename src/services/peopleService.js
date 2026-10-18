import { error } from '../utils/logger';
import { API_READ_ACCESS_TOKEN } from '../utils/config';

const baseUrl = 'https://api.themoviedb.org/3';

const getPopularPeople = async (page = 1) => {
  try {
    const url = `${baseUrl}/person/popular?language=en-US&page=${page}`;
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
    error(`Can't get popular people: ${err}`);
    return err;
  }
}

export {
  getPopularPeople,
}