import axios from 'axios';

/* eslint-disable no-unused-vars */
function storeToken(token) {
  localStorage.setItem('token', token);
}

function getToken() {
  return localStorage.getItem('token');
}

function removeToken() {
  localStorage.removeItem('token');
}

function isLoggedIn() {
  return !!getToken();
}

function getAuthHeader() {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
}

function storeTokenIfGiven() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    storeToken(token);
    return true;
  }
  return false;
}

async function getUserInfo() {
  if (!isLoggedIn()) {
    return null;
  }
  const authHeader = getAuthHeader();
  const response = await axios.get('/api/members/me', { headers: authHeader });
  return response.data;
}

export {
  storeToken,
  getToken,
  removeToken,
  isLoggedIn,
  getAuthHeader,
  storeTokenIfGiven,
  getUserInfo,
};
