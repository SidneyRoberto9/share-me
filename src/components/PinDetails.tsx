import { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';

import { useAccount } from '../server/useAccount';
import { useGetCommentsByPost } from '../server/usePost';
import { DefaultImage } from './DefaultImage';
import { Loading } from './Loading';
import { MasonryLayout } from './MasonryLayout';
import { Spinner } from './Spinner';

interface IPinDatailsComponent {
	pin: Post;
}

export const PinDetails = ({ pin }: IPinDatailsComponent) => {
	const [comment, setComment] = useState<string>('');
	const [addingComment, setAddingComment] = useState(null);
	const [pins, setPins] = useState<Post[]>([]);

	const { data } = useSession();
	const userEmail = data?.user?.email;

	const { user, isLoading } = useAccount(userEmail);
	const { comments, isLoading: loading } = useGetCommentsByPost(pin.id);

	if (isLoading || loading) return <Loading />;

	const addComment = () => {
		if (comment) {
		}
	};

	return (
		<>
			<div
				className='flex xl-flex-row flex-col m-auto bg-white'
				style={{ maxWidth: '1500px', borderRadius: '32px' }}>
				<div className='flex justify-center items-center md:items-start flex-initial'>
					{pin.imageUrl && (
						<DefaultImage
							key={pin.title}
							src={pin.imageUrl}
							classContent='rounded-t-3xl rounded-b-lg select-none pointer-events-none w-auto'
							width={350}
							height={250}
						/>
					)}
				</div>
				<div className='w-full p-5 flex-1 xl:min-w-620'>
					<div className='flex items-center justify-between'>
						<div className='flex gap-2 items-center'>
							<a
								href={pin.imageUrl}
								download={pin.title}
								target='_blank'
								onClick={(e) => e.stopPropagation()}
								className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
								<MdDownloadForOffline />
							</a>
						</div>
						<a href={pin.destination} target='_blank' rel='noopener noreferrer'>
							{pin.destination}
						</a>
					</div>
					<div>
						<h1 className='text-4xl font-bold break-words mt-3'>{pin.title}</h1>
					</div>
					{user && (
						<Link
							href={`/profile/${user.id}`}
							className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
							<DefaultImage
								src={user.image}
								classContent='w-8 h-8 rounded-full object-cover'
								width={96}
								height={96}
							/>

							<p className='font-semibold capitalize'>{user.name}</p>
						</Link>
					)}
					<h2 className='mt-5 text-2xl'>Comments</h2>
					<div className='max-h-370 overflow-y-auto'>
						{comments.map((comment, index) => (
							<div
								className='flex gap-2 mt-5 items-center bg-white rounded-lg'
								key={index}>
								<DefaultImage
									src={user.image}
									classContent='w-10 h-10 rounded-full object-cover cursor-pointer'
									width={96}
									height={96}
								/>
								<div className='flex flex-col'>
									<p className='font-bold capitalize'>{user.name}</p>
									<p className='text-sm'>{comment.content}</p>
								</div>
							</div>
						))}
					</div>

					<div className='flex flex-wrap mt-6 gap-3'>
						{user && (
							<Link href={`/profile/${user.id}`}>
								<DefaultImage
									src={user.image}
									classContent='w-8 h-8 rounded-full object-cover cursor-pointer mt-2'
									width={96}
									height={96}
								/>
							</Link>
						)}
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

			{pins?.length > 0 ? (
				<>
					<h2 className='text-center font-bold text-2x mt-8 mb-4'>
						More Like this
					</h2>
					<MasonryLayout pins={pins} />
				</>
			) : (
				<Spinner message='Loading more pins' />
			)}
		</>
	);
};
