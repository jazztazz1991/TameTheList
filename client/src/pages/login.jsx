import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { useCookies } from 'react-cookie';
import instance from '../hooks/API.js';

export const Login = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [user, setUser] = useState({});
	const [lastLogin, setLastLogin] = useState(null);
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (cookies.user) {
			setUser(cookies.user);
			setLastLogin(cookies.user.lastLoggedIn);
		}
	}, [cookies]);

	const login = async (e) => {
		e.preventDefault();
		try {
			const res = await instance.post('/auth/login', {
				email,
				password,
			});
			if (res.response.status === 500) {
				console.log('Invalid username or password');
				return;
			}

			if (res.data.user.lastLoggedIn < Date.now() - 604800000) {
				console.log('User logged in within the last week');
			}
			console.log(res.data);
			setCookie('user', res.data, { path: '/' });
			navigate('/');
		} catch (error) {
			if (error.response.status === 500) {
				const eMsg = document.querySelector('h2');
				eMsg.textContent = 'Invalid username or password';
				eMsg.style.color = 'red';
				return;
			} else {
				console.error(error);
			}
		}
	};

	return (
		<div className='grid place-items-center h-full'>
			<div className='bg-slate-600 p-5 rounded-lg shadow-lg'>
				<h1 className='text-white text-3xl font-bold text-center'>Login</h1>
				<h2></h2>
				<form className='grid grid-cols-1 gap-4' onSubmit={login}>
					<input
						type='text'
						placeholder='E-Mail'
						className='p-2 rounded-md shadow-md'
						onChange={(event) => setEmail(event.target.value)}
					/>
					<input
						type='password'
						placeholder='Password'
						className='p-2 rounded-md shadow-md'
						onChange={(event) => setPassword(event.target.value)}
					/>
					<button
						type='submit'
						className='bg-blue-light p-2 rounded-md shadow-md'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};
