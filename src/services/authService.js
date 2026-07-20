import { error } from '../utils/logger';

const baseUrl = 'https://api.themoviedb.org/3';
const API_READ_ACCESS_TOKEN = process.env.API_READ_ACCESS_TOKEN;

const getGuestSession = async () => {
  try {
    const url = `${baseUrl}/authentication/guest_session/new`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
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
    error(`Can't get guest session: ${err.message}`);
    throw err;
  }
}

// const createReqToken = async () => {
//   try {
//     const url = 'https://api.themoviedb.org/3/authentication/token/new';
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json', 
//         Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
//       },
//     }

//     const response = await fetch(url, options);

//     if (!response.ok) {
//       return thunkAPI.rejectWithValue('Can\'t create request token');
//     }

//     const data = await response.json();

//     return data;
//   }
//   catch (err) {
//     error(`Can't create request token: ${err.message}`);
//     return err;
//   }
// }

export {
  getGuestSession,
  // createReqToken,
}