import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import instance from '../hooks/API.js';
import logo from '/logo.jpg';
import { googleLogout } from '@react-oauth/google';
export const Header = () => {
	const [cookies, setCookie, removeCookie] = useCookies([
		'jwt',
		'access_token',
	]);
	const [user, setUser] = useState({});
	const [lastLogin, setLastLogin] = useState(null);
	const navigate = useNavigate();
	const [token, setAccess_token] = useState({});
	useEffect(() => {
		if (cookies.user) {
			setUser(cookies.user);
			setLastLogin(cookies.user.lastLoggedIn);
			setAccess_token(cookies.access_token);
			navigate('/boards');
		}
	}, [cookies]);

	const logout = () => {
		console.log('logout ran');
		removeCookie('user');
		removeCookie('access_token');
		googleLogout();

		navigate('/login');
	};

	return (
		<div className='grid grid-cols-2 bg-slate-600 p-3'>
			<div className='text-white grid grid-flow-col auto-cols-max'>
				<Link to='/' className='text-xl font-bold pr-2'>
					<img src={logo} className='' alt='logo' />
				</Link>
				<h3 className='text-lg font-semibold  w-fit'>Organize your life</h3>
			</div>
			<nav className='justify-end col-end-4 w-fit'>
				{!cookies.jwt.token && !cookies.accessToken ? (
					<Link
						to='/login'
						className='bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50'
					>
						Login
					</Link>
				) : (
					<ul className='grid grid-cols-4 text-slate-800 font-medium'>
						<Link
							to='/'
							className='bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50'
						>
							Home
						</Link>
						<Link
							to='/boards'
							className='bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50'
						>
							Boards
						</Link>
						<Link
							to='/'
							className='bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50'
						>
							Profile
						</Link>
						<button
							className='bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50'
							onClick={logout}
						>
							Logout
						</button>
					</ul>
				)}
			</nav>
		</div>
	);
};
