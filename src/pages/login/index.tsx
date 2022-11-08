import React from 'react';

export default function Home() {
	return (
		<div className='flex justify-start items-center flex-col h-screen'>
			<div className='relative w-full h-full'>
				<video
					className='w-full h-full object-cover'
					src={'/share.mp4'}
					loop
					controls={false}
					muted
					autoPlay
				/>
			</div>

			<div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
				<div className='p-5'></div>
			</div>
		</div>
	);
}
