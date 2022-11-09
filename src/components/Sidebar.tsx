import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { RiHomeFill } from 'react-icons/ri';

import logo from '../assets/logo.png';
import { ISidebarComponentProps } from '../interfaces/ISidebar';

const categories = [
	{ name: 'Animals' },
	{ name: 'Wallpapers' },
	{ name: 'Photography' },
	{ name: 'Gaming' },
	{ name: 'Coding' },
	{ name: 'Other' },
];

const isActiveStyle =
	'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';

const isNotActiveStyle =
	'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

export const Sidebar = ({ user, closeToggle }: ISidebarComponentProps) => {
	const router = useRouter();
	const handleCloseSidebar = () => {
		if (closeToggle) {
			closeToggle(false);
		}
	};

	return (
		<div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
			<div className='flex flex-col'>
				<Link
					href={'/'}
					className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
					onClick={handleCloseSidebar}>
					<Image src={logo} alt='logo' className='w-full' />
				</Link>

				<div className='flex flex-col gap-5'>
					<Link
						href={'/'}
						className={router.asPath == '/' ? isNotActiveStyle : isActiveStyle}
						onClick={handleCloseSidebar}>
						<RiHomeFill />
						Home
					</Link>
					<h3 className='mt-2 px-5 text-base 2xl:text-xl'>
						Discover Categories
					</h3>
					{categories.slice(0, categories.length - 1).map((category) => (
						<Link
							href={`/category/${category.name}`}
							className={
								router.asPath == `/category/${category.name}`
									? isNotActiveStyle
									: isActiveStyle
							}
							key={category.name}
							onClick={handleCloseSidebar}>
							{category.name}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
