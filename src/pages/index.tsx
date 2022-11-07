import { useEffect } from 'react';

import { api } from '../lib/axios';

export default function Home(props: any) {
	console.log(props);
	return (
		<div>
			<h1>hello World</h1>
		</div>
	);
}

export async function getServerSideProps(context: any) {
	const { data } = await api.get('/api/hello');

	return {
		props: {
			...data,
		},
	};
}
