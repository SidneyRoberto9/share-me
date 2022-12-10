import React, { Dispatch, SetStateAction } from 'react';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

import { useAccount } from '../context/useAccount';

export interface INavbarComponentProps {
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
}

export const Navbar = ({ search, setSearch }: INavbarComponentProps) => {
	const navigate = useNavigate();
	const { loggedUser } = useAccount();

	const handleSearchTerm = () => {
		navigate(`/search/${search}`);
		setSearch('');
	};

	return (
		<div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
			<div className='flex justify-start items-center w-full px-2 rounded-md bg-transparent border-none outline-none focus-within:shadow-sm'>
				<IoMdSearch
					fontSize={21}
					className='ml-1 cursor-pointer'
					onClick={handleSearchTerm}
				/>
				<input
					type='text'
					value={search}
					className='p-2 w-full bg-white outline-none'
					placeholder='Search'
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={(event) => event.key === 'Enter' && handleSearchTerm()}
				/>
			</div>
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
