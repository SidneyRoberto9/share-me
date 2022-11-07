import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { api } from '../lib/axios';

export default function Home(props: any) {
	useEffect(() => {
		console.log(props);
	}, []);

	return (
		<div>
			<h1>hello World</h1>
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
