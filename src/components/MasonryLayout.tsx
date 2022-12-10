import React from 'react';
import Masonry from 'react-masonry-css';

import { Post } from '.';
import { IPostFull } from '../models/post.model';

const breakPointObj = {
	default: 4,
	3000: 6,
	2000: 5,
	1200: 3,
	1000: 2,
	500: 1,
};

interface MasonryLayoutComponentProps {
	posts: IPostFull[];
}

export const MasonryLayout = ({ posts }: MasonryLayoutComponentProps) => {
	return (
		<Masonry className='flex animate-slide-fwd' breakpointCols={breakPointObj}>
			{posts.map((pin) => {
				return <Post post={pin} key={pin.id} />;
			})}
		</Masonry>
	);
};
