import React from 'react';
import { Circles } from 'react-loader-spinner';

interface ISpinnerComponentProps {
	message?: string;
}

export const Spinner = ({ message }: ISpinnerComponentProps) => {
	return (
		<div className='flex flex-col justify-center items-center w-full h-full'>
			<Circles wrapperClass='m-5' color='#00BFFF' height={50} width={200} />

			<p className='text-lg text-center px-2'>{message}</p>
		</div>
	);
};
