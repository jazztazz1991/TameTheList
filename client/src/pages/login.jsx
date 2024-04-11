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
	const [userInfo, setUserInfo] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (cookies.user) {
			setUser(cookies.user);
			setLastLogin(cookies.user.lastLoggedIn);
		}
	}, [cookies]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserInfo({ ...userInfo, [name]: value });
	};

	const login = async (e) => {
		e.preventDefault();
		try {
			const res = await instance.post('/auth/login', {
				userInfo,
			});

			if (res.data.user.lastLoggedIn < Date.now() - 604800000) {
				console.log('User logged in within the last week');
			}
			setCookie('user', res.data, { path: '/', maxAge: 43200 });
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
		<div className='grid place-items-center h-full mt-24'>
			<div className='bg-slate-600 p-5 rounded-lg shadow-lg'>
				<h1 className='text-white text-3xl font-bold text-center pb-5'>
					Login
				</h1>
				<h2></h2>
				<form className='grid grid-cols-1 gap-4' onSubmit={login}>
					<input
						type='text'
						placeholder='E-Mail'
						name='email'
						className='p-2 rounded-md shadow-md'
						onChange={handleChange}
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						className='p-2 rounded-md shadow-md'
						onChange={handleChange}
					/>
					<button
						type='submit'
						className='bg-blue-light p-2 rounded-md shadow-md'
					>
						Login
					</button>
				</form>
				<p className='text-white text-center'>
					Not a user?{' '}
					<Link
						to='/register'
						className='underline text-white hover:text-purple'
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};
