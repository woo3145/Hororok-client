import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/feeds`;

export const getComments = async (feedId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${feedId}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postComment = async (feedId: number, contents: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${feedId}/comments`,
      { contents },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editComment = async (
  feedId: number,
  commentId: number,
  contents: string
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${feedId}/comments/${commentId}`,
      { contents }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (feedId: number, commentId: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${feedId}/comments/${commentId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
