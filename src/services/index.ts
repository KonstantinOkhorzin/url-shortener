import axios from 'axios';

const apiUrl = 'https://cleanuri-proxy-server.onrender.com/api';

export const getShortenedURL = async (url: string) => {
  try {
    return (await axios.post(apiUrl, { url })).data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.message);
    } else {
      return Promise.reject('Failed to fetch data! Try again!');
    }
  }
};
