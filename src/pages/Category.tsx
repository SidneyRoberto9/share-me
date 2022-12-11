import React from 'react';
import { useParams } from 'react-router-dom';

import { Feed } from '../components';
import { usePost } from '../context/usePost';

export const Category = () => {
	const { name } = useParams();

	const { Posts } = usePost();

	const filteredPosts = Posts.filter((post) => post.category === name);

	return <Feed posts={filteredPosts} />;
};
