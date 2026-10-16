import { error } from '../utils/logger';
import { API_READ_ACCESS_TOKEN } from '../utils/config';

const baseUrl = 'https://api.themoviedb.org/3';

const getUserData = async (account_id) => {
  try {
    const url = `${baseUrl}/account/${account_id}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    }

    const response = await fetch(url, options);
    return response;
  }
  catch (err) {
    error(err);
    return err;
  }
}

export {
  getUserData,
}