import { jwtDecode } from "jwt-decode";

const getToken = () => {
  // Retrieves the user token from localStorage
  return localStorage.getItem("id_token");
};

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
};

// Check if user's logged in
const loggedIn = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken();
  return !!token && !isTokenExpired(token); // handwaiving here
};

const login = (idToken) => {
  // Saves user token to localStorage
  localStorage.setItem("id_token", idToken);

  window.location.assign("/");
};

// Get user data
const getProfile = () => {
  return jwtDecode(getToken());
};

const logout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem("id_token");
  // This will reload the page and reset the state of the application
  window.location.assign("/");
};

export { getToken, isTokenExpired, loggedIn, login, getProfile, logout };
