import React from 'react';
import { useParams } from 'react-router-dom';

import { PostDetail } from '../components';
import { usePost } from '../context/usePost';

export const PostDetailsPage = () => {
	const { id } = useParams();

	const { Posts } = usePost();

	const post = Posts.find((post) => post.id === id);

	return <PostDetail post={post} />;
};
