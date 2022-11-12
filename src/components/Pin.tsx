import { Post } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';

interface IPinComponentProps {
	pin: Post;
}

export const Pin = ({ pin }: IPinComponentProps) => {
	const [postHovered, setPostHovered] = useState(false);
	const [savingPost, setavingPost] = useState(false);
	const router = useRouter();

	return (
		<div
			onMouseEnter={() => setPostHovered(true)}
			onMouseLeave={() => setPostHovered(false)}
			onClick={() => router.push(`/pin-detail/${pin.id}`)}
			className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'>
			{postHovered && (
				<div
					className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
					style={{ height: '100%' }}>
					<div className='flex items-center justify-between'>
						<div className='flex gap-2'>
							<a
								href={pin.image}
								download={pin.title}
								target='_blank'
								onClick={(e) => e.stopPropagation()}
								className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
								<MdDownloadForOffline />
							</a>
						</div>
					</div>
				</div>
			)}

			<Image
				key={pin.title}
				className='rounded-lg w-full select-none pointer-events-none'
				alt='user-post'
				src={pin.image}
				width={250}
				height={250}
				draggable={false}
			/>
		</div>
	);
};
