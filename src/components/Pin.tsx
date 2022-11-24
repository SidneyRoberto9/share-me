import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';

import { IPostFull } from '../interfaces/posts';
import { IUserFull } from '../interfaces/user';
import { useDeletePost } from '../server/usePost';
import { useSavedPosts } from '../server/useSavedPosts';
import { DefaultImage } from './DefaultImage';

interface IPinComponentProps {
	post: IPostFull;
	user: IUserFull;
	refresh: () => void;
}

export const Pin = ({ post, user, refresh }: IPinComponentProps) => {
	const useSaved = new useSavedPosts();
	const router = useRouter();

	const [alreadySaved, setAlreadySaved] = useState(
		user.save.find((item) => item.postId === post.id) ? true : false
	);
	const [postHovered, setPostHovered] = useState(false);

	const savePost = async () => {
		setAlreadySaved(!alreadySaved);
		if (!alreadySaved) {
			await useSaved.savePost({
				postId: post.id,
				userEmail: user.email,
			});
		} else {
			await useSaved.savePost({
				postId: post.id,
				userEmail: user.email,
			});
		}
		refresh();
	};

	const deletePost = async () => {
		await useDeletePost(post.id);
		refresh();
		window.location.reload();
	};

	return (
		<div className='m-2'>
			<div
				onMouseEnter={() => setPostHovered(true)}
				onMouseLeave={() => setPostHovered(false)}
				onClick={() => router.push(`/pin-detail/${post.id}`)}
				className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'>
				{post.imageUrl && (
					<DefaultImage
						key={post.title}
						src={post.imageUrl}
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
									href={post.imageUrl}
									download={post.title}
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
							{post.destination && (
								<a
									href={post.destination}
									onClick={(e) => {
										e.stopPropagation();
									}}
									target='_blank'
									rel='noreferrer'
									className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'>
									<BsFillArrowUpRightCircleFill />
								</a>
							)}
							{post.authorId === user.id && (
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

			<Link
				href={`/profile/${post.authorId}`}
				className='flex gap-2 mt-2 items-center'>
				<DefaultImage
					src={post.author.image}
					classContent='w-8 h-8 rounded-full object-cover'
					width={96}
					height={96}
				/>

				<p className='font-semibold capitalize'>{post.author.name}</p>
			</Link>
		</div>
	);
};
