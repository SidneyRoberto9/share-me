import ClipLoader from 'react-spinners/ClipLoader';

export const Loading = () => {
	return (
		<div className='flex justify-center items-center h-screen'>
			<ClipLoader
				color='rgb(17 24 39 / var(--tw-border-opacity)'
				size={150}
				loading={true}
				speedMultiplier={1.5}
			/>
		</div>
	);
};
