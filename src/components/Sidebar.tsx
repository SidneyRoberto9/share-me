import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { RiHomeFill } from 'react-icons/ri';

import logo from '../assets/logo.png';
import { ISidebarComponentProps } from '../interfaces/components/ISidebar';
import { useAccount } from '../server/useAccount';
import { DefaultImage } from './DefaultImage';
import { Loading } from './Loading';

const categories = [
	{ name: 'Animals' },
	{ name: 'Wallpapers' },
	{ name: 'Photography' },
	{ name: 'Gaming' },
	{ name: 'Coding' },
	{ name: 'Other' },
];

const isActiveStyle =
	'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize cursor-pointer';

const isNotActiveStyle =
	'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize cursor-pointer';

export const Sidebar = ({ closeToggle }: ISidebarComponentProps) => {
	const router = useRouter();

	const { data } = useSession();
	const { user, isLoading } = useAccount(data?.user.email);

	if (isLoading) return <Loading />;

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
					<DefaultImage
						src={logo}
						classContent='w-full'
						width={96}
						height={96}
					/>
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
							key={category.name}
							onClick={handleCloseSidebar}
							className={
								router.asPath == `/pin/${category.name}`
									? isNotActiveStyle
									: isActiveStyle
							}>
							{category.name}
						</Link>
					))}
				</div>
			</div>
			{user && (
				<Link
					href={`/profile/${user.id}`}
					className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
					onClick={handleCloseSidebar}>
					{user.image && (
						<DefaultImage
							src={user.image}
							classContent='w-10 h-10 rounded-full'
							width={96}
							height={96}
						/>
					)}

					<p>{user.name}</p>
				</Link>
			)}
		</div>
	);
};
