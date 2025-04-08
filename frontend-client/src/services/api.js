// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5005/api',
});

export const registerUser = (data) => API.post('/register', data);
export const loginUser = (data) => API.post('/login', data);
export const createProposal = (data, token) =>
  API.post('/proposals', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getProposals = (token) =>
  API.get('/proposals', {
    headers: { Authorization: `Bearer ${token}` },
  });

export default API;
