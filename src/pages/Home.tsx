import React from 'react';

import { Feed } from '../components';
import { usePost } from '../context/usePost';

export const Home = () => {
	const { Posts } = usePost();
	console.log(Posts);

	return <Feed posts={Posts} />;
};
