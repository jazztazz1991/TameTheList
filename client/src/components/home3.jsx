export const Home3 = () => {
	return (
		<div className='grid grid-cols-2 w-4/5 mx-auto'>
			<div className='my-5 text-center text-cyan-200 my-auto'>
				<h1 className='text-lg font-semibold text-purple-300'>Features</h1>
				<ul>
					<li>Race against yourself</li>
					<li>Who is the fastest in the family?</li>
					<li>Automatically track repeated jobs</li>
					<li>Personal and Family stats</li>
				</ul>
			</div>
			<img src='raceagainsttime.jpg' className='mx-auto my-5' />
		</div>
	);
};
