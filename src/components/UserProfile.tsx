import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';

import { useAccountId } from '../server/useAccount';
import { Loading } from './Loading';

interface IUserProfileComponentProps {
	user: User;
}

const randomImage =
	'https://source.unsplash.com/1600x900/?nature,photography,technology';

const activeBtnStyles =
	'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles =
	'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

export const UserProfile = ({
	user: ActualUser,
}: IUserProfileComponentProps) => {
	const [text, setText] = useState('');
	const [activeBtn, setActiveBtn] = useState('');

	const router = useRouter();
	const { id } = router.query;

	const { user, isLoading } = useAccountId(id[0]);

	useEffect(() => {
		if (text == 'Created') {
		}
		if (text == 'Saved') {
		}
	}, [text, id]);

	if (isLoading) return <Loading />;

	return (
		<div className='relative pb-2 h-full justify-center items-center'>
			<div className='flex flex-col pb-5'>
				<div className='relative flex flex-col mb-7'>
					<div className='flex flex-col justify-center items-center'>
						<img
							src={randomImage}
							alt='banner'
							className='w-full h-370 2xl:h-510 shadow-lg object-cover'
						/>
						<img
							src={user.image}
							className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
							alt='profile'
						/>

						<h1 className='font-bold text-3xl text-center mt-3'>{user.name}</h1>
						<div className='absolute top-0 z-1 right-0 p-2'>
							{ActualUser.id === user.id && (
								<button
									type='button'
									className=' bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
									onClick={() => signOut()}>
									<AiOutlineLogout color='red' fontSize={21} />
								</button>
							)}
						</div>
					</div>
					<div className='text-center mb-7'>
						<button
							type='button'
							onClick={(e) => {
								setText(e.target['textContent']);
								setActiveBtn('created');
							}}
							className={`${
								activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles
							} `}>
							Created
						</button>
						<button
							type='button'
							onClick={(e) => {
								setText(e.target['textContent']);
								setActiveBtn('saved');
							}}
							className={`${
								activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles
							} `}>
							Saved
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
