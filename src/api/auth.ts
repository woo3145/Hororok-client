import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

interface LoginInput {
  id: string;
  password: string;
}

export const login = async ({ id, password }: LoginInput) => {
  try {
    const response = await axios.post(BASE_URL, { id, pw: password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface RegisterInput {
  id: string;
  password: string;
  name: string;
  nickname: string;
  birth: Date;
  gender: 'M' | 'W';
}

export const register = async ({
  id,
  password,
  name,
  nickname,
  birth,
  gender,
}: RegisterInput) => {
  try {
    const response = await axios.post(BASE_URL, {
      id,
      pw: password,
      name,
      nickname,
      birth,
      gender,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
