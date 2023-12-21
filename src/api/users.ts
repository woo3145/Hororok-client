import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

export const getUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface EditUserInput {
  password?: string;
  name?: string;
  nickname?: string;
  birth?: Date;
  gender?: 'M' | 'W';
}

export const editUser = async (userId: number, data: EditUserInput) => {
  try {
    const response = await axios.post(`${BASE_URL}/${userId}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFollowers = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/followers`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFollowing = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/following`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const followUser = async (fromUserId: number, toUserId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${fromUserId}/follows/${toUserId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unfollowUser = async (fromUserId: number, toUserId: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${fromUserId}/follows/${toUserId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
