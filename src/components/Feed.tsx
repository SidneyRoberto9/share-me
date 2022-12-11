import React from 'react';

import { MasonryLayout, Spinner } from '.';
import { IPostFull } from '../models/post.model';
import { isEmpty } from '../utils/validate.util';

interface IFeedComponentProps {
	posts: IPostFull[];
}

export const Feed = ({ posts }: IFeedComponentProps) => {
	if (isEmpty(posts)) return <Spinner message='Loading Data...' />;

	return <MasonryLayout posts={posts} />;
};
