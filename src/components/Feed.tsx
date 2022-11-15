import React, { useState } from 'react';

import { usePost } from '../server/usePost';
import { MasonryLayout } from './MasonryLayout';
import { Spinner } from './Spinner';

interface IFeedComponentProps {
	categoryName: string;
}

export const Feed = ({ categoryName }: IFeedComponentProps) => {
	const { posts, isLoading, isError } = usePost(categoryName);

	if (isLoading)
		return <Spinner message='We are adding new ideas to your feed!' />;

	return <MasonryLayout pins={posts} />;
};
