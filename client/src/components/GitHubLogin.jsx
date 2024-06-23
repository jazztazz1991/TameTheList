import React, { useState, useEffect, useContext } from 'react';
// import { Redirect } from "react-router-dom";
import GithubIcon from 'mdi-react/GithubIcon';
import { AuthContext } from './AuthContext';
import instance from '../hooks/API';

export default function GithubLogin() {
	const { state, dispatch } = useContext(AuthContext);
	const [data, setData] = useState({ errorMessage: '', isLoading: false });

	const { client_id, redirect_uri } = state;

	useEffect(() => {
		// After requesting Github access, Github redirects back to your app with a code parameter
		const url = window.location.href;
		const hasCode = url.includes('?code=');

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

	const gitLogin = async () => {
		const url = window.location.href;
		const hasCode = url.includes('?code=');

		window.alert('gitLogin');
		window.alert(url);
		window.alert(hasCode);
		window.alert(data);

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
	};
	if (state.isLoggedIn) {
		return <Redirect to='/' />;
	}

	return (
		<section className='container'>
			<div>
				<h1>Welcome</h1>
				<span>Super amazing app</span>
				<span>{data.errorMessage}</span>
				<div className='login-container'>
					{data.isLoading ? (
						<div className='loader-container'>
							<div className='loader'></div>
						</div>
					) : (
						<>
							{
								// Link to request GitHub access
							}
							<a
								className='login-link'
								href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=http://localhost:5173/dashboard`}
								onClick={() => {
									setData({ ...data, errorMessage: '' });
								}}
							>
								<GithubIcon />
								<span>Login with GitHub</span>
							</a>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
