export const Home2 = () => {
	return (
		<div className='grid grid-cols-2 mx-auto w-4/5'>
			<img src='kanbanHome.jpg' className='mx-auto my-5' />
			<div className='my-5 text-center text-cyan-200 my-auto'>
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
	);
};
