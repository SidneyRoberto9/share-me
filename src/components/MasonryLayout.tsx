import React from 'react';
import Masonry from 'react-masonry-css';

import { MasonryLayoutComponentProps } from '../interfaces/components/IMasonryLayout';
import { Post } from './Post';

const breakPointObj = {
	default: 4,
	3000: 6,
	2000: 5,
	1200: 3,
	1000: 2,
	500: 1,
};

export const MasonryLayout = ({
	user,
	posts,
	refresh,
}: MasonryLayoutComponentProps) => {
	return (
		<Masonry className='flex animate-slide-fwd' breakpointCols={breakPointObj}>
			{posts.map((pin) => {
				return <Post post={pin} user={user} refresh={refresh} key={pin.id} />;
			})}
		</Masonry>
	);
};
