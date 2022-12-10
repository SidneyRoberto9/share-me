import jwt_decode from 'jwt-decode';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import logoWhite from '../assets/logowhite.png';
import share from '../assets/share.mp4';
import { useAccount } from '../context/useAccount';
import { api } from '../lib/axios';
import { GoogleLoginProps } from '../models/google.model';

export const Login = () => {
	const navigate = useNavigate();
	const { setLoggedUser } = useAccount();

	const handleLogin = async (credential: CredentialResponse) => {
		const decode: GoogleLoginProps = jwt_decode(credential.credential);

		const { data } = await api.post('/auth', {
			name: decode.name,
			email: decode.email,
			image: decode.picture,
		});

		const { email, id, image, name } = data.data;

		setLoggedUser({
			id: id,
			email: email,
			image: image,
			name: name,
			comment: [],
			posts: [],
			save: [],
		});

		window.localStorage.setItem(
			'account',
			JSON.stringify(credential.credential)
		);

		navigate('home');
	};

	return (
		<div className='flex justify-start items-center flex-col h-screen'>
			<div className='relative w-full h-full'>
				<video
					className='w-full h-full object-cover'
					src={share}
					loop
					controls={false}
					muted
					autoPlay
				/>
			</div>

			<div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
				<div className='p-5'>
					<img
						src={logoWhite}
						alt='logoWhite'
						className='w-[130px]'
						width={500}
						height={500}
					/>
				</div>

				<div className='shadow-2xl'>
					<GoogleLogin
						useOneTap={false}
						onSuccess={handleLogin}
						onError={() => {
							console.log('Login Failed');
						}}
					/>
				</div>
			</div>
		</div>
	);
};
