import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

import { INavbarComponentProps } from '../interfaces/components/INavbar';
import { useAccount } from '../server/useUser';
import { Loading } from './Loading';

export const Navbar = ({
	searchTerm,
	setSearchTerm,
}: INavbarComponentProps) => {
	const { data } = useSession();
	const { user, isLoading } = useAccount(data?.user.email);

	if (isLoading) return <Loading />;

	return (
		<div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
			<div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
				<IoMdSearch fontSize={21} className='ml-1' />
				<input
					type='text'
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Search'
					value={searchTerm}
					onFocus={(e) => e.target.select()}
					className='p-2 w-full bg-white outline-none '
				/>
				<IoMdAdd fontSize={21} className='text-gray-400' />
			</div>
			<div className='flex gap-3'>
				<Link href={`/profile/${user.id}`}>
					<Image
						src={user.image}
						alt='user'
						className='w-14 h-12 rounded-lg cursor-pointer'
						width={96}
						height={96}
					/>
				</Link>
			</div>
		</div>
	);
};
