import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { useEffect } from 'react';

import { api } from '../lib/axios';

export default function Home(
	props: InferGetStaticPropsType<typeof getServerSideProps>
) {
	useEffect(() => {
		console.log(props);
	}, []);

	return (
		<div className='text-3xl font-bold underline'>
			<h1>hello World.</h1>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data } = await api.get('/api/hello');

	return {
		props: {
			data: data,
		},
	};
};
