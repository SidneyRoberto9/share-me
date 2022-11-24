import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';

import { INavbarComponentProps } from '../interfaces/components/INavbar';
import { useAccount } from '../server/useAccount';
import { DefaultImage } from './DefaultImage';
import { Loading } from './Loading';

export const Navbar = ({
	searchTerm,
	setSearchTerm,
}: INavbarComponentProps) => {
	const { data } = useSession();
	const { user, isLoading } = useAccount(data?.user.email);
	const router = useRouter();
	console.log(router.query.text);

	if (isLoading) return <Loading />;

	return (
		<div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
			<div className='flex justify-start items-center w-full px-2 rounded-md bg-transparent border-none outline-none focus-within:shadow-sm'></div>
			<div className='flex gap-3'>
				{user.image && (
					<Link href={`/profile/${user.id}`} className='hidden md:block'>
						<DefaultImage
							src={user.image}
							classContent='w-14 h-12 rounded-lg cursor-pointer'
							width={96}
							height={96}
						/>
					</Link>
				)}

				<Link
					href={`/add`}
					className='bg-black text-white rounded-xl w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
					<IoMdAdd fill='white' />
				</Link>
			</div>
		</div>
	);
};
