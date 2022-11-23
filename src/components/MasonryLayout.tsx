import React from 'react';
import Masonry from 'react-masonry-css';

import { IPostFull } from '../interfaces/posts';
import { IUserFull } from '../interfaces/user';
import { Pin } from './Pin';

interface IMasonryLayoutComponentProps {
	user: IUserFull;
	posts: IPostFull[];
	refresh: () => void;
}

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
}: IMasonryLayoutComponentProps) => {
	return (
		<Masonry className='flex animate-slide-fwd' breakpointCols={breakPointObj}>
			{posts.map((pin) => {
				return <Pin post={pin} user={user} refresh={refresh} key={pin.id} />;
			})}
		</Masonry>
	);
};
