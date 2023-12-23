import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

interface LoginInput {
  id: string;
  password: string;
}

export const login = async ({ id, password }: LoginInput) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        id,
        pw: password,
      },
      { withCredentials: true }
    );
    console.log(response);
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
    const response = await axios.post(
      `${BASE_URL}/register`,
      {
        id,
        pw: password,
        name,
        nickname,
        birth,
        gender,
      },
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
