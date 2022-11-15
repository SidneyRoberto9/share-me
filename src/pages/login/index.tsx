import { GetServerSideProps } from 'next';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

import logo from '../../assets/logowhite.png';
import { DefaultImage } from '../../components';
import { validateLoginAuthentication } from '../../utils/validateAuthentication';

const Login = () => {
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
				<div className='p-5'>
					<DefaultImage
						src={logo}
						classContent='w-[130px]'
						width={96}
						height={96}
					/>
				</div>

				<div className='shadow-2xl'>
					<button
						onClick={() =>
							signIn('google', {
								callbackUrl: '/',
							})
						}
						type='button'
						className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'>
						<FcGoogle className='mr-4' /> Sign in With Google
					</button>
				</div>
			</div>
		</div>
	);
};
export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateLoginAuthentication(context, () => {
		return {
			props: {},
		};
	});
};

export default Login;
