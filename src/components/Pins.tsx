import { useState } from 'react';

import { Navbar } from '.';
import { IPinsComponentProps } from '../interfaces/components/iPins';

export const Pins = ({ children }: IPinsComponentProps) => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className='px-2 md:px-5'>
			<div className='bg-gray-50'>
				<Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			</div>

			<div className='h-full'>{children}</div>
		</div>
	);
};
