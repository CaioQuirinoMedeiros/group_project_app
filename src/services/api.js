/* eslint-disable import/no-cycle */
import axios from 'axios';

import store from '../store';

const api = axios.create({
  baseURL: 'http://a5b07bef.ngrok.io',
});

api.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  const { active: team } = store.getState().teams;

  const headers = { ...config.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (team) {
    headers.TEAM = team.slug;
  }

  return { ...config, headers };
});

export default api;
