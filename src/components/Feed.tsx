import React from 'react';

import { MasonryLayout } from '.';
import { usePost } from '../context/usePost';
import { isEmpty } from '../utils/validate.util';

export const Feed = () => {
	const { Posts } = usePost();

	if (isEmpty(Posts)) return <div>loading</div>;

	return <MasonryLayout posts={Posts} />;
};
