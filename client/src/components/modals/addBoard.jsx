import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import instance from '../../hooks/API.js';

export function AddBoard() {
	const [openModal, setOpenModal] = useState(false);
	const [name, setName] = useState('');
	const [household, setHousehold] = useState('');
	const [households, setHouseholds] = useState([]);
	const [cookies] = useCookies(['jwt']);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await instance.get('/household/all', {
					headers: { authorizations: cookies.jwt.token },
				});
				setHouseholds(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const createBoard = async () => {
		try {
			console.log('Creating Board');
			console.log(name);
			console.log(household);
			await instance.post(
				'/board/create',
				{ name: name, householdId: household },
				{
					headers: { authorizations: cookies.user.token },
				}
			);
			setOpenModal(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Button
				className='bg-blue-light rounded-full px-2 mx-2 w-fit shadow-md shadow-cyan-500/50 text-'
				onClick={() => setOpenModal(true)}
			>
				Add Board
			</Button>
			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header className='text-blue-light'>Add Board</Modal.Header>
				<Modal.Body className='text-purple-c'>
					<div className='space-y-6'>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='name' value='Board Name' />
							</div>
							<TextInput
								id='name'
								placeholder='Board Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className='text-purple-c'
							/>
						</div>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='household' value='Household' />
							</div>
							<select
								id='household'
								value={household}
								onChange={(e) => setHousehold(e.target.value)}
								required
							>
								<option value=''>Select Household</option>
								{households.map((household) => (
									<option key={household._id} value={household._id}>
										{household.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className='text-blue-light' onClick={() => createBoard()}>
						Add Board
					</Button>
					<Button className='text-purple-c' onClick={() => setOpenModal(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default AddBoard;
