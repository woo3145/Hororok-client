import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/feeds`;

export const getFeeds = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFeed = async (feedId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${feedId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postFeed = async (contents: string) => {
  try {
    const response = await axios.post(
      BASE_URL,
      { contents },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editFeed = async (feedId: number, contents: string) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${feedId}`,
      { contents },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFeed = async (feedId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${feedId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeFeed = async (feedId: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/${feedId}/likes`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unlikeFeed = async (feedId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${feedId}/likes`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
