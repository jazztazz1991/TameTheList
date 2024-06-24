import React, { useEffect, useState } from 'react';
import axios from 'axios';
import instance from '../../hooks/API.js';
import { json } from 'react-router-dom';

const GoogleAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {}, []);

	const handleLogin = async () => {
		window.location.href = 'http://localhost:3001/auth/google/callback';
		// const response = await instance.get('/auth/google/callback');
		// localStorage.setItem('testingshit', JSON.stringify(response));
	};

	const handleLogout = () => {
		axios
			.get('http://localhost:3001/logout', { withCredentials: true })
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
