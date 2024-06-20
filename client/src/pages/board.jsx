import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../index.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import instance from '../hooks/API.js';
import { AddTask } from '../components/modals/addTask.jsx';

export const Board = () => {
	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState({
		name: '',
		description: '',
		priority: 'low',
		boardId: '',
		dueDate: '',
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
			let newTasks = [];
			response.data.forEach((taskData) => {
				if (taskData.completed === false) {
					newTasks.push(taskData);
				}
			});
			console.log(newTasks);
			setTasks(newTasks);
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

	const refreshTasks = async () => {
		const response = await instance.get(`/task/allByBoard/${params.id}`, {
			headers: { authorizations: cookies.user.token },
		});
		console.log(response.data);
		let newTasks = [];
		response.data.forEach((taskData) => {
			if (taskData.completed === false) {
				newTasks.push(taskData);
			}
		});
		setTasks(newTasks);
	};

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
		refreshTasks();
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setTask({ ...task, [name]: value });
	};

	const completeTask = async (currentTask) => {
		console.log(currentTask);
		const response = await instance.post(
			'/task/complete',
			{ taskId: currentTask._id },
			{ headers: { authorizations: cookies.user.token } }
		);
		console.log(response.data);
		refreshTasks();
	};

	return (
		<div className='w-fit mx-auto'>
			<div className='flex flex-row justify-end'>
				<h1 className='text-xl font-bold text-blue-light text-center my-5 grow justify-self-center'>
					{board.name}
				</h1>
				<AddTask />
			</div>
			<div className='grid grid-cols-7 gap-2 md:grid-cols-4 sm:grid-cols-1'>
				{tasks.map((task) => (
					<div
						key={task._id}
						className='bg-slate-600 p-5 rounded-lg shadow-lg text-center w-72'
					>
						<p className='text-purple-300 bg-yellow-800 rounded-full w-fit px-3 mx-auto'>
							{task.priority}
						</p>
						<h3 className='text-lg font-semibold text-purple-300'>
							{task.name}
						</h3>
						<p className='text-purple-300'>{task.description}</p>
						<p className='text-purple-300 mt-5'>{task.dueDate}</p>
						<button
							className='bg-blue-light rounded-full px-2 mx-2 w-fit shadow-md shadow-cyan-500/50 text-'
							onClick={() => navigate(`/tasks/${task._id}`)}
						>
							View Task
						</button>
						<button
							className='bg-blue-light rounded-full px-2 mx-2 w-fit shadow-md shadow-cyan-500/50 text-'
							onClick={() => completeTask(task)}
						>
							Complete Task
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
