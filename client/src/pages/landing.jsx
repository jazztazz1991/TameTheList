export const Landing = () => {
	return (
		<>
			<div className='grid grid-cols-2 w-4/5 mx-auto'>
				<div className='my-5 text-center text-cyan-200 my-auto'>
					<h1 className='text-xl font-bold w-4/5 mx-auto'>
						Tame The List - Your personal assistant to organizing life
					</h1>
					<h2 className='text-lg font-semibold'>
						One list, endless views. Conquer your day!
					</h2>
					<div className='grid grid-cols-3 mx-auto w-fit'>
						<input
							type='email'
							placeholder='E-Mail'
							className='p-2 rounded-md shadow-md m-2 col-span-2'
						/>
						<button
							type='submit'
							className='bg-blue-light p-2 rounded-md shadow-md text-slate-800 m-2 w-fit mx-auto'
						>
							Register Now
						</button>
					</div>
				</div>
				<img src='adhdlist.jpg' className='mx-auto my-5' />
			</div>
			<div className='grid grid-cols-2 mx-auto w-4/5'>
				<img src='kanbanHome.jpg' className='mx-auto my-5' />
				<div className='my-5'>
					<h1 className='text-lg font-semibold text-purple-300'>Features</h1>
					<ul>
						<li>Simple, easy to use interface</li>
						<li>Customizable boards</li>
						<li>Shareable lists</li>
						<li>Task reminders</li>
						<li>Task prioritization</li>
						<li>Task categorization</li>
					</ul>
				</div>
			</div>
		</>
	);
};
