import * as React from 'react';
import { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

import { Feed, Spinner } from '../components';
import { useAccount } from '../context/useAccount';
import { IPostFull } from '../models/post.model';
import { IUser } from '../models/user.model';

const randomImage =
	'https://source.unsplash.com/1600x900/?nature,photography,technology';

const activeBtnStyles =
	'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles =
	'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

export const Profile = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { getSaved, getCreated, getUser, loggedUser, signOut } = useAccount();

	const [user, setUser] = useState<IUser>({} as IUser);
	const [posts, setPosts] = useState<IPostFull[]>([]);
	const [text, setText] = useState('');
	const [activeBtn, setActiveBtn] = useState('');

	const handleCreatedPosts = async () => {
		const data = await getCreated(id);
		setPosts(data);
	};

	const handleSignOut = () => {
		signOut();
		navigate('/');
	};

	const handleSavedPosts = async () => {
		const data = await getSaved(id);
		setPosts(data);
	};

	const handleUser = async () => {
		const data = await getUser(id);
		setUser(data);
	};

	useEffect(() => {
		setPosts([]);
		if (text == 'Created') {
			handleCreatedPosts();
		}
		if (text == 'Saved') {
			handleSavedPosts();
		}
	}, [text]);

	useEffect(() => {
		handleUser();
	}, [id]);

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
							alt='user img'
							className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
						/>

						<h1 className='font-bold text-3xl text-center mt-3'>{user.name}</h1>
						<div className='absolute top-0 z-1 right-0 p-2'>
							{loggedUser.id === user.id && (
								<button
									type='button'
									className=' bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
									onClick={handleSignOut}>
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

					{posts.length ? (
						<div className='px-2'>
							<Feed posts={posts} />
						</div>
					) : (
						<div className='flex flex-col justify-center items-center mt-4'>
							<Spinner />
							<span className='font-bold text-xl text-center '>
								No Posts Found! or Loading...
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
