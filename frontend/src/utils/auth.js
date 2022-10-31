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

async function getPublicUserInfo(username) {
  const response = await axios.get(`/api/public/members/${username}`);
  return response.data;
}

/*
* Get the info from the current user
* @deprecated since version 0.1.0
* Please use the UserContext instead
*/
async function getCurrentUserInfo() {
  // eslint-disable-next-line no-console
  console.warn('getCurrentUserInfo is deprecated. Please use the UserContext instead');

  if (!isLoggedIn()) {
    return null;
  }
  const authHeader = getAuthHeader();
  const response = await axios.get('/api/members/me', { headers: authHeader });
  return response.data;
}

function isAdmin(user) {
  return user?.role === 'CHAIR' || user?.role === 'SERVICE';
}

export {
  storeToken,
  getToken,
  removeToken,
  isLoggedIn,
  isAdmin,
  getAuthHeader,
  storeTokenIfGiven,
  getCurrentUserInfo as getUserInfo,
  getPublicUserInfo,
};
