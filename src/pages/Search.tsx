import React from 'react';
import { useParams } from 'react-router-dom';

import { Feed } from '../components';
import { usePost } from '../context/usePost';

export const Search = () => {
	const { content } = useParams();
	const { Posts } = usePost();

	const filteredPosts = Posts.filter((post) =>
		post.title.toLowerCase().includes(content?.toLowerCase())
	);
	return (
		<div className='flex flex-col gap-2'>
			<h2 className='font-bold'>
				Search: <span className='font-normal'>{content}</span>
			</h2>
			<Feed posts={filteredPosts} />;
		</div>
	);
};
