import axios from 'axios';

interface SuccessResponse {
  result_url: string;
}

const apiUrl = 'https://cleanuri-proxy-server.onrender.com/api';

export const getShortenedURL = async (url: string) => {
  try {
    return (await axios.post<SuccessResponse>(apiUrl, { url })).data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.message);
    } else {
      return Promise.reject('Failed to fetch data! Try again!');
    }
  }
};
