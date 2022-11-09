import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';

import logo from '../assets/logo.png';
import { Sidebar } from '../components';
import { ILayoutContainerProps } from '../interfaces/ILayout';

const Layout = ({ session, loggedUser, children }: ILayoutContainerProps) => {
	if (loggedUser == null) {
		return <>{children}</>;
	}

	const [toggleSidebar, setToggleSidebar] = useState(false);
	const scrollRef = useRef(null);

	useEffect(() => {
		scrollRef.current.scrollTo(0, 0);
	}, []);

	if (session)
		return (
			<div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
				<div className='hidden md:flex h-screen flex-initial'>
					<Sidebar user={loggedUser} />
				</div>

				<div className='flex md:hidden flex-row'>
					<div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
						<HiMenu
							fontSize={40}
							className='cursor-pointer'
							onClick={() => setToggleSidebar(true)}
						/>
						<Link href={'/'}>
							<Image src={logo} alt='logo' className='w-28' />
						</Link>

						<Link href={`/profile/${loggedUser.id}`}>
							<Image
								src={loggedUser.image}
								alt='logo'
								className='w-28'
								quality={100}
								width={96}
								height={96}
							/>
						</Link>
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
							<Sidebar user={loggedUser} closeToggle={setToggleSidebar} />
						</div>
					)}
				</div>

				<div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
					{children}
				</div>
			</div>
		);
};

export default Layout;
