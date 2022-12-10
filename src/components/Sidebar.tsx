import React, { Dispatch, SetStateAction } from 'react';
import { RiHomeFill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

import { useAccount } from '../context/useAccount';
import { categories } from '../utils/category.data';
import logo from '/logo.png';

export interface ISidebarComponentProps {
	closeToggle?: Dispatch<SetStateAction<boolean>>;
}

const isActiveStyle =
	'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize cursor-pointer';

const isNotActiveStyle =
	'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize cursor-pointer';

export const Sidebar = ({ closeToggle }: ISidebarComponentProps) => {
	const { pathname } = useLocation();
	const { loggedUser } = useAccount();

	const handleCloseSidebar = () => {
		if (closeToggle) {
			closeToggle(false);
		}
	};

	return (
		<div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
			<div className='flex flex-col'>
				<Link
					to={'/'}
					className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
					onClick={handleCloseSidebar}>
					<img src={logo} alt='logo image' className='w-full' />
					{/* <DefaultImage
						src={logo}
						classContent='w-full'
						width={500}
						height={500}
					/> */}
				</Link>

				<div className='flex flex-col gap-5'>
					<Link
						to={'/'}
						className={pathname == '/' ? isNotActiveStyle : isActiveStyle}
						onClick={handleCloseSidebar}>
						<RiHomeFill />
						Home
					</Link>
					<h3 className='mt-2 px-5 text-base 2xl:text-xl'>
						Discover Categories
					</h3>
					{categories.slice(0, categories.length - 1).map((category) => (
						<Link
							to={`/category/${category.name}`}
							key={category.name}
							onClick={handleCloseSidebar}
							className={
								pathname == `/category/${category.name}`
									? isNotActiveStyle
									: isActiveStyle
							}>
							<img
								src={category.image}
								alt={category.name}
								className='w-8 h-8 rounded-full shadow-sm'
							/>
							{/* <DefaultImage
								src={category.image}
								classContent='w-8 h-8 rounded-full shadow-sm'
								width={500}
								height={500}
							/> */}
							{category.name}
						</Link>
					))}
				</div>
			</div>
			{loggedUser && (
				<Link
					to={`/profile/${loggedUser.id}`}
					className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
					onClick={handleCloseSidebar}>
					<img
						src={loggedUser.image}
						alt={loggedUser.name}
						className='w-10 h-10 rounded-full'
					/>
					{/* <DefaultImage
						src={loggedUser.image}
						classContent='w-10 h-10 rounded-full'
						width={96}
						height={96}
					/> */}

					<p>{loggedUser.name}</p>
				</Link>
			)}
		</div>
	);
};
