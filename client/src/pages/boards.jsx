import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { useCookies } from 'react-cookie';
import instance from '../hooks/API.js';

import AddBoard from '../components/modals/addBoard.jsx';

export const Boards = () => {
	const [boards, setBoards] = useState([]);
	const navigate = useNavigate();
	const [cookies, setCookies] = useCookies(['jwt']);

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log(cookies.jwt);
				const response = await instance.get('/board/allByUser', {
					headers: { authorizations: cookies.jwt.token },
				});
				setBoards(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='w-fit mx-auto'>
			<h1 className='text-xl font-bold text-blue-light text-center my-5'>
				Boards
			</h1>
			<AddBoard />
			<div className='grid grid-cols-4 gap-4'>
				{boards.map((board) => (
					<div
						key={board._id}
						className='bg-slate-600 p-5 rounded-lg shadow-lg text-center'
					>
						<h3 className='text-lg font-semibold text-purple-300'>
							{board.name}
						</h3>
						<p className='text-purple-300'>{board.household}</p>
						<button
							className='bg-blue-light rounded-full px-2 mx-2 w-fit shadow-md shadow-cyan-500/50 text-'
							onClick={() => navigate(`/boards/${board._id}`)}
						>
							View Board
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
