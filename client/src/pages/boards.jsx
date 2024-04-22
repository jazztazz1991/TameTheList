import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { useCookies } from 'react-cookie';
import instance from '../hooks/API.js';

export const Boards = () => {
	const [boards, setBoards] = useState({});
	const navigate = useNavigate();
	const [cookies, setCookies] = useCookies(['user']);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await instance.get('/board/allByUser', { cookies });
				setBoards(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const renderBoards = () => {
		return boards.map((board) => {
			<div key={board._id} className='bg-slate-600 p-5 rounded-lg shadow-lg'>
				<h3>{board.title}</h3>
				<p>{board.description}</p>
				<button onClick={() => navigate(`/board/${board._id}`)}>
					View Board
				</button>
			</div>;
		});
	};
	return (
		<div className='w-fit mx-auto'>
			<h1 className='text-xl font-bold text-blue-light'>Boards</h1>
			<div className='grid gap-4'>
				{boards.length > 0 ? renderBoards() : <p>No boards found</p>}
			</div>
		</div>
	);
};
