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

export {
  storeToken,
  getToken,
  removeToken,
  isLoggedIn,
  getAuthHeader,
  storeTokenIfGiven,
};
