import React, { useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Feed, Spinner } from '.';
import { useAccount } from '../context/useAccount';
import { usePost } from '../context/usePost';
import { IPostFull } from '../models/post.model';

interface IPostDetailComponentProps {
	post: IPostFull;
}

export const PostDetail = ({ post }: IPostDetailComponentProps) => {
	const [comment, setComment] = useState<string>('');
	const [addingComment, setAddingComment] = useState(null);
	const { loggedUser, update } = useAccount();
	const { comment: newComment, Posts } = usePost();

	const addComment = async () => {
		if (comment) {
			setAddingComment(true);
			await newComment(comment, post.id, loggedUser.id);
			update();
			setComment('');
			setAddingComment(false);
		}
	};

	return (
		<>
			<div
				className='flex xl-flex-row flex-col m-auto bg-white'
				style={{ maxWidth: '1500px', borderRadius: '32px' }}>
				<div className='flex justify-center items-center md:items-start flex-initial'>
					<img
						src={post.imageUrl}
						alt='img'
						key={post.title}
						className='rounded-t-3xl rounded-b-lg select-none pointer-events-none w-auto mt-2'
					/>
				</div>
				<div className='w-full p-5 flex-1 xl:min-w-620'>
					<div className='flex items-center justify-between'>
						<div className='flex gap-2 items-center'>
							<a
								href={post.imageUrl}
								download={post.title}
								target='_blank'
								onClick={(e) => e.stopPropagation()}
								className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
								<MdDownloadForOffline />
							</a>
						</div>
						<a
							href={post.destination}
							target='_blank'
							rel='noopener noreferrer'>
							{post.destination}
						</a>
					</div>
					<div>
						<h1 className='text-4xl font-bold break-words mt-3'>
							{post.title}
						</h1>
					</div>

					<Link
						to={`/profile/${loggedUser.id}`}
						className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
						<img
							src={loggedUser.image}
							alt='user img'
							className='w-8 h-8 rounded-full object-cover'
						/>

						<p className='font-semibold capitalize'>{loggedUser.name}</p>
					</Link>

					<h2 className='mt-5 text-2xl'>Comments</h2>
					<div className='max-h-370 overflow-y-auto'>
						{post.comment.map((comment, index) => (
							<div
								className='flex gap-2 mt-5 items-center bg-white rounded-lg'
								key={index}>
								<img
									src={comment.author?.image}
									alt='comment user img'
									className='w-10 h-10 rounded-full object-cover cursor-pointer'
								/>

								<div className='flex flex-col'>
									<p className='font-bold capitalize'>{comment.author.name}</p>
									<p className='text-sm'>{comment.text}</p>
								</div>
							</div>
						))}
					</div>

					<div className='flex flex-wrap mt-6 gap-3'>
						<Link to={`/profile/${loggedUser.id}`}>
							<img
								src={loggedUser.image}
								alt='user img'
								className='w-8 h-8 rounded-full object-cover cursor-pointer mt-2'
							/>
						</Link>

						<input
							className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
							type='text'
							placeholder='Add a comment...'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<button
							type='button'
							onClick={addComment}
							className='bg-red-500 text-white outline-none rounded-full px-6 py-2 font-semibold text-base'>
							{addingComment ? 'Posting the comment...' : 'Posted'}
						</button>
					</div>
				</div>
			</div>

			{Posts?.length > 0 ? (
				<>
					<h2 className='text-center font-bold text-2x mt-8 mb-4'>
						More Like this
					</h2>
					<Feed posts={Posts} />
				</>
			) : (
				<Spinner message='Loading more pins' />
			)}
		</>
	);
};
