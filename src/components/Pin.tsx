import { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';

import { useAccount } from '../server/useAccount';
import { useDeletePost } from '../server/usePost';
import { useSavedPosts } from '../server/useSavedPosts';
import { DefaultImage } from './DefaultImage';
import { Loading } from './Loading';

interface IPinComponentProps {
	pin: Post;
}

export const Pin = ({ pin }: IPinComponentProps) => {
	const useSaved = new useSavedPosts();
	const router = useRouter();
	const { data } = useSession();

	const [alreadySaved, setAlreadySaved] = useState(null);
	const [postHovered, setPostHovered] = useState(false);

	const userEmail = data?.user?.email;

	const { user, isLoading } = useAccount(userEmail);
	const { value, isLoading: loading } = useSaved.isSavedPost({
		postId: pin.id,
		userEmail: userEmail,
	});

	useEffect(() => {
		setAlreadySaved(value);
		console.log(pin.imageUrl.slice(20).split('.')[0]);
	}, [value]);

	if (loading || isLoading) return <Loading />;

	const savePost = async () => {
		setAlreadySaved(!alreadySaved);
		if (!alreadySaved) {
			await useSaved.savePost({
				postId: pin.id,
				userEmail: userEmail,
			});
		} else {
			await useSaved.savePost({
				postId: pin.id,
				userEmail: userEmail,
			});
		}
	};

	const deletePost = async () => {
		await useDeletePost(pin.id);
		window.location.reload();
	};

	return (
		<div className='m-2'>
			<div
				onMouseEnter={() => setPostHovered(true)}
				onMouseLeave={() => setPostHovered(false)}
				onClick={() => router.push(`/pin-detail/${pin.id}`)}
				className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'>
				{pin.imageUrl && (
					<DefaultImage
						key={pin.title}
						src={pin.imageUrl}
						classContent='rounded-lg w-full select-none pointer-events-none'
						width={250}
						height={250}
					/>
				)}

				{postHovered && (
					<div
						className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
						style={{ height: '100%' }}>
						<div className='flex items-center justify-between'>
							<div className='flex gap-2'>
								<a
									href={pin.imageUrl}
									download={pin.title}
									target='_blank'
									onClick={(e) => e.stopPropagation()}
									className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
									<MdDownloadForOffline />
								</a>
							</div>

							{alreadySaved ? (
								<button
									onClick={(e) => {
										e.stopPropagation();
										savePost();
									}}
									type='button'
									className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
									Saved
								</button>
							) : (
								<button
									onClick={(e) => {
										e.stopPropagation();
										savePost();
									}}
									type='button'
									className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
									Save
								</button>
							)}
						</div>

						<div className='flex justify-between items-center gap-2 w-full'>
							{pin.destination && (
								<a
									href={pin.destination}
									onClick={(e) => {
										e.stopPropagation();
									}}
									target='_blank'
									rel='noreferrer'
									className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md'>
									<BsFillArrowUpRightCircleFill />
									{pin.destination.length > 20
										? pin.destination.slice(8, 20)
										: pin.destination.slice(8)}
								</a>
							)}
							{pin.authorId === user.id && (
								<button
									type='button'
									onClick={(e) => {
										e.stopPropagation();
										deletePost();
									}}
									className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'>
									<AiTwotoneDelete />
								</button>
							)}
						</div>
					</div>
				)}
			</div>
			{user && (
				<Link
					href={`/profile/${user.id}`}
					className='flex gap-2 mt-2 items-center'>
					<DefaultImage
						src={user.image}
						classContent='w-8 h-8 rounded-full object-cover'
						width={96}
						height={96}
					/>

					<p className='font-semibold capitalize'>{user.name}</p>
				</Link>
			)}
		</div>
	);
};
