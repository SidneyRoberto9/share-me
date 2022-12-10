import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { useAccount } from '../context/useAccount';
import { Navbar, Sidebar } from './';
import logo from '/logo.png';

interface ILayoutContainerProps {
	children: ReactNode;
}

export const Layout = ({ children }: ILayoutContainerProps) => {
	const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');
	const { loggedUser } = useAccount();
	const scrollRef = useRef(null);

	useEffect(() => {
		scrollRef.current?.scrollTo(0, 0);
	}, []);

	return (
		<div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
			<div className='hidden md:flex h-screen flex-initial'>
				<Sidebar />
			</div>

			<div className='flex md:hidden flex-row'>
				<div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
					<HiMenu
						fontSize={40}
						className='cursor-pointer'
						onClick={() => setToggleSidebar(true)}
					/>
					<Link to={'/'}>
						<img src={logo} alt='logo' className='w-28' />
						{/* <DefaultImage
							src={logo}
							classContent='w-28'
							width={500}
							height={500}
						/> */}
					</Link>

					{loggedUser && (
						<Link to={`/profile/${loggedUser.id}`}>
							<img
								src={loggedUser.image}
								alt={loggedUser.name}
								className='w-28'
							/>
							{/* <DefaultImage
								src={user.image}
								classContent='w-28'
								width={96}
								height={96}
							/> */}
						</Link>
					)}
				</div>

				{toggleSidebar && (
					<div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
						<div className='absolute w-full flex justify-end items-center p-2'>
							<AiFillCloseCircle
								fontSize={30}
								className='cursor-pointer'
								onClick={() => setToggleSidebar(false)}
							/>
						</div>
						<Sidebar closeToggle={setToggleSidebar} />
					</div>
				)}
			</div>

			<div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
				<div className='px-2 md:px-5'>
					<div className='bg-gray-50'>
						<Navbar search={search} setSearch={setSearch} />
					</div>

					<div className='h-full'>{children}</div>
				</div>
			</div>
		</div>
	);
};
