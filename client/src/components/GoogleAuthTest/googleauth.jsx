
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleAuth = () => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:5000/api/user', { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  const handleLogout = () => {
    axios.get('http://localhost:3001/logout', { withCredentials: true })
      .then(() => {
        setUser(null);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default GoogleAuth;