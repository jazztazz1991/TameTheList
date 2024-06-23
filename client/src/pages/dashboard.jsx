import React, { useState, useEffect, useContext } from 'react';
// import { Redirect } from "react-router-dom";
import GithubIcon from 'mdi-react/GithubIcon';
import { AuthContext } from '../components/AuthContext.jsx';
import instance from '../hooks/API';
import axios from 'axios';

export const Dashboard = () => {
	//javascript
	const { state, dispatch } = useContext(AuthContext);
	const [data, setData] = useState({ errorMessage: '', isLoading: false });
	const { client_id, redirect_uri, client_secret } = state;

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
			// const code = newUrl[1];
			// window.alert(JSON.stringify(requestData));
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
					localStorage.setItem('token', JSON.stringify(response.data));
				})
				.catch((error) => {
					console.log(error);
					setData({
						isLoading: false,
						errorMessage: 'Sorry! Login failed',
					});
				});
			// const dataTemp = {
			// 	client_id: client_id,
			// 	client_secret: client_secret,
			// 	code: code,
			// 	redirect_uri: redirect_uri,
			// };
			// axios
			// 	.post('https://github.com/login/oauth/access_token', dataTemp, {
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		}
			// 	})
			// 	.then((response) => {
			// 		window.alert(response);
			// 	})
			// 	.catch((error) => {
			// 		window.alert(error);
			// 	});
		}
	}, [state, dispatch, data]);
	return (
		<div className='w-fit mx-auto'>
			<h1 className='text-xl font-bold text-blue-light'>Dashboard</h1>
		</div>
	);
};
