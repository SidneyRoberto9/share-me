import React from 'react';

import { Feed } from '../components';
import { usePost } from '../context/usePost';

export const Home = () => {
	const { Posts } = usePost();

	return <Feed posts={Posts} />;
};
