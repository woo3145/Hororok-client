import axios from 'axios';

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});
