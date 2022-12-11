import React from 'react';

import { MasonryLayout } from '.';
import { IPostFull } from '../models/post.model';
import { isEmpty } from '../utils/validate.util';

interface IFeedComponentProps {
	posts: IPostFull[];
}

export const Feed = ({ posts }: IFeedComponentProps) => {
	if (isEmpty(posts)) return <div>loading</div>;

	return <MasonryLayout posts={posts} />;
};
