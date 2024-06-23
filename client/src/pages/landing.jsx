import { Home1 } from '../components/home1';
import { Home2 } from '../components/home2';
import { Home3 } from '../components/home3';

import React, { useState, useEffect, useContext } from 'react';
// import { Redirect } from "react-router-dom";
import GithubIcon from 'mdi-react/GithubIcon';
import { AuthContext } from '../components/AuthContext.jsx';
import instance from '../hooks/API';

export const Landing = () => {
	const { state, dispatch } = useContext(AuthContext);
	const [data, setData] = useState({ errorMessage: '', isLoading: false });
	const { client_id, redirect_uri } = state;

	useEffect(() => {
		console.log('Landing page');
		// After requesting Github access, Github redirects back to your app with a code parameter
		const url = window.location.href;
		const hasCode = url.includes('?code=');
		console.log(hasCode);
		// If Github API returns the code parameter
		if (hasCode) {
			const newUrl = url.split('?code=');
			window.history.pushState({}, null, newUrl[0]);
			setData({ ...data, isLoading: true });

			const requestData = {
				code: newUrl[1],
			};

			const proxy_url = state.proxy_url;

			// Use code parameter and other parameters to make POST request to proxy_server
			// fetch(proxy_url, {
			// 	method: 'POST',
			// 	body: JSON.stringify(requestData),
			// })
			// 	.then((response) => response.json())
			// 	.then((data) => {
			// 		console.log(data);
			// 	})
			// 	.catch((error) => {
			// 		setData({
			// 			isLoading: false,
			// 			errorMessage: 'Sorry! Login failed',
			// 		});
			// 	});
			instance
				.post('/authenticate', requestData)
				.then((response) => {
					console.log(response.data);
					const { user } = response.data;
					localStorage.setItem('token', response.data);
					dispatch({
						type: 'LOGIN',
						payload: {
							isLoggedIn: true,
							user: {
								name: user.name,
								email: user.email,
								lastLoggedIn: user.updated_at,
								id: user.id,
							},
						},
					});
				})
				.catch((error) => {
					setData({
						isLoading: false,
						errorMessage: 'Sorry! Login failed',
					});
				});
		}
	}, [state, dispatch, data]);

	return (
		<>
			<Home1 />
			<Home2 />
			<Home3 />
		</>
	);
};
