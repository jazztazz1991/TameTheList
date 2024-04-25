import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../index.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import instance from '../hooks/API.js';

export const Board = () => {
	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState({
		name: '',
		description: '',
		priority: 'low',
		boardId: '',
	});
	const [board, setBoard] = useState('Board');
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [user, setUser] = useState({});
	const [lastLogin, setLastLogin] = useState(null);
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		const getTasks = async () => {
			const response = await instance.get(`/task/allByBoard/${params.id}`, {
				headers: { authorizations: cookies.user.token },
			});
			console.log(response.data);
			setTasks(response.data);
		};
		const getBoard = async () => {
			const response = await instance.get(`/board/${params.id}`, {
				headers: { authorizations: cookies.user.token },
			});
			console.log(response.data);
			setBoard(response.data);
		};
		getBoard();
		getTasks();
	}, []);

	function toggleModal() {
		document.getElementById('modal').classList.toggle('hidden');
	}
	const addTask = async () => {
		task.boardId = params.id;
		const response = await instance.post(
			'/task/create',
			{ task },
			{ headers: { authorizations: cookies.user.token } }
		);
		console.log(response.data);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setTask({ ...task, [name]: value });
	};

	return (
		<div className='w-fit mx-auto'>
			<div className='flex flex-row justify-end'>
				<h1 className='text-xl font-bold text-blue-light text-center my-5 grow justify-self-center'>
					{board.name}
				</h1>
				<button
					className='bg-blue-light rounded-full px-2 mx-5 w-fit shadow-md shadow-cyan-500/50 text-center h-fit self-center'
					onClick={toggleModal}
				>
					Add Task
				</button>
			</div>
			<div
				className='fixed z-10 overflow-y-auto top-0 w-full left-0 hidden'
				id='modal'
			>
				<div className='flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center  sm:block sm:p-0'>
					<div className='fixed inset-0 transition-opacity'>
						<div className='absolute inset-0 bg-gray-900 opacity-75' />
					</div>
					<span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
						&#8203;
					</span>
					<div
						className='inline-block align-center bg-slate-600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
						role='dialog'
						aria-modal='true'
						aria-labelledby='modal-headline'
					>
						<div className='bg-slate-600 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
							<h3 className='text-xl font-bold text-blue-light text-center my-5 grow justify-self-center'>
								Add Task
							</h3>
							<label className='font-medium text-blue-light'>Title</label>
							<input
								type='text'
								className='w-full outline-none rounded bg-slate-300 p-2 mt-2 mb-3'
								name='name'
								onChange={handleChange}
							/>
							<label className='font-medium text-blue-light'>Description</label>
							<textarea
								type='text'
								className='w-full outline-none rounded bg-slate-300 p-2 mt-2 mb-3'
								name='description'
								onChange={handleChange}
							/>
							<label className='font-medium text-blue-light'>Priority</label>
							<select
								className='w-full outline-none rounded bg-slate-300 p-2 mt-2 mb-3'
								name='priority'
								onChange={handleChange}
							>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</select>
						</div>
						<div className='bg-slate-600 px-4 py-3 text-right border-t-4 border-purple-c '>
							<button
								type='button'
								className='py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2'
								onClick={toggleModal}
							>
								<i className='fas fa-times'></i> Cancel
							</button>
							<button
								type='button'
								className='py-2 px-4 bg-purple-c text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500'
								onClick={addTask}
							>
								<i className='fas fa-plus'></i> Create
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-7 gap-2'>
				{tasks.map((task) => (
					<div
						key={task._id}
						className='bg-slate-600 p-5 rounded-lg shadow-lg text-center'
					>
						<p className='text-purple-300 bg-yellow-800 rounded-full w-fit px-3 mx-auto'>
							{task.priority}
						</p>
						<h3 className='text-lg font-semibold text-purple-300'>
							{task.name}
						</h3>
						<p className='text-purple-300'>{task.description}</p>
						<button
							className='bg-blue-light rounded-full px-2 mx-2 w-fit shadow-md shadow-cyan-500/50 text-'
							onClick={() => navigate(`/tasks/${task._id}`)}
						>
							View Task
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
