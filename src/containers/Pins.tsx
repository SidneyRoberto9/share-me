import { useState } from 'react';

import { Navbar } from '../components';

const Pins = () => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className='px-2 md:px-5'>
			<div className='bg-gray-50'>
				<Navbar searchTerm={searchTerm} />
			</div>

			<div className='h-full'></div>
		</div>
	);
};

export default Pins;
