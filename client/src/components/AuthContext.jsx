// src/AuthContext.jsx
import { createContext, useReducer } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const initialState = {
  user: null,
  isLoggedIn: false,
  client_id: "Iv23ctWulHjOcFJ3WdDZ",
  redirect_uri: "http://localhost:5173/",
  proxy_url: "http://localhost:5173/authenticate",
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: action.payload.isLoggedIn,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop as required
};
