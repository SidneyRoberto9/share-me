import React, { useState } from 'react';

import { FeedComponentProps } from '../interfaces/components/IFeed';
import { MasonryLayout } from './MasonryLayout';

export const Feed = ({ user, posts, refresh }: FeedComponentProps) => {
	if (!posts.length) return <h2>No Posts Available!</h2>;

	return <MasonryLayout posts={posts} user={user} refresh={refresh} />;
};
