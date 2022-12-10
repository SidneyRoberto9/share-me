import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { useAccount } from '../context/useAccount';

export const Navbar = () => {
	const { loggedUser } = useAccount();

	return (
		<div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
			<div className='flex justify-start items-center w-full px-2 rounded-md bg-transparent border-none outline-none focus-within:shadow-sm'></div>
			<div className='flex gap-3'>
				{loggedUser && (
					<Link to={`/profile/${loggedUser.id}`} className='hidden md:block'>
						<img
							src={loggedUser.image}
							alt={loggedUser.name}
							className='w-14 h-12 rounded-lg cursor-pointer'
						/>
						{/* <DefaultImage
							src={user.image}
							classContent='w-14 h-12 rounded-lg cursor-pointer'
							width={96}
							height={96}
						/> */}
					</Link>
				)}

				<Link
					to={`/add`}
					className='bg-black text-white rounded-xl w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
					<IoMdAdd fill='white' />
				</Link>
			</div>
		</div>
	);
};
