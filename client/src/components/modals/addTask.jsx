import {
	Button,
	Checkbox,
	Label,
	Modal,
	TextInput,
	Datepicker,
} from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import instance from '../../hooks/API.js';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddTask = () => {
	const [openModal, setOpenModal] = useState(false);
	const [task, setTask] = useState({
		name: '',
		description: '',
		priority: 'low',
		boardId: '',
		dueDate: '',
		repeated: false,
		repeatedTime: 'daily',
	});
	const [board, setBoard] = useState('Board');
	const [cookies] = useCookies(['user']);
	const [user, setUser] = useState({});
	const [boardMembers, setBoardMembers] = useState([]);
	const params = useParams();

	useEffect(() => {
		const getBoard = async () => {
			const response = await instance.get(`/board/${params.id}`, {
				headers: { authorizations: cookies.user.token },
			});
			console.log(response.data);
			setBoard(response.data);
		};
		getBoard();
	}, []);

	const createTask = async () => {
		try {
			console.log('Creating Task');
			console.log(task);
			task.boardId = params.id;
			await instance.post('/task/create', task, {
				headers: { authorizations: cookies.user.token },
			});
			setOpenModal(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (e) => {
		console.log(e.name, e.value);
		setTask({ ...task, [e.name]: e.value });
	};

	return (
		<>
			<Button
				className='bg-blue-light rounded-full px-2 mx-2 w-fit shadow-md shadow-cyan-500/50 text-'
				onClick={() => setOpenModal(true)}
			>
				Add Task
			</Button>
			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header className='text-blue-light'>Add Task</Modal.Header>
				<Modal.Body className='text-purple-c'>
					<div className='space-y-6'>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='name' value='Task Name' />
							</div>
							<TextInput
								id='name'
								placeholder='Task Name'
								value={task.name}
								name='name'
								onChange={(e) => handleChange(e.target)}
								required
								className='text-purple-c'
							/>
						</div>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='description' value='Description' />
							</div>
							<TextInput
								id='description'
								placeholder='Task Description'
								value={task.description}
								name='description'
								onChange={(e) => handleChange(e.target)}
								required
								className='text-purple-c'
							/>
						</div>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='dueDate' value='Due Date' />
							</div>
							<Datepicker
								id='dueDate'
								value={task.dueDate}
								weekStart={0}
								title='Due Date'
								name='dueDate'
								onChange={(e) => handleChange(e.target)}
								required
								className='text-purple-c'
							/>
						</div>
						<div className='text-purple-c'>
							<div className='mb-2 block'>
								<Label htmlFor='priority' value='Priority' />
							</div>
							<select
								id='priority'
								value={task.priority}
								name='priority'
								onChange={(e) => handleChange(e.target)}
								required
							>
								<option value=''>Select Priority</option>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</select>
						</div>
						<div className='text-purple-c'>
							<div className='mb-2 block'>
								<Label htmlFor='repeated' value='Repeated' />
							</div>
							<Checkbox
								id='repeated'
								value={task.repeated}
								name='repeated'
								onChange={(e) => handleChange(e.target)}
								required
							></Checkbox>
						</div>
						{!task.repeated ? null : (
							<div className='text-purple-c'>
								<div className='mb-2 block'>
									<Label htmlFor='repeatedInterval' value='Repeated Interval' />
								</div>
								<select
									id='repeatedInterval'
									value={task.repeatedTime}
									name='repeatedTime'
									onChange={(e) => handleChange(e.target)}
									required
								>
									<option value=''>Repeated Interval</option>
									<option value='daily'>Daily</option>
									<option value='weekly'>Weekly</option>
									<option value='monthly'>Monthly</option>
									<option value='yearly'>Yearly</option>
								</select>
							</div>
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className='text-blue-light' onClick={() => createTask()}>
						Add Task
					</Button>
					<Button className='text-purple-c' onClick={() => setOpenModal(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddTask;
