import React, { useState } from 'react';

import { IPostFull } from '../interfaces/posts';
import { IUserFull } from '../interfaces/user';
import { MasonryLayout } from './MasonryLayout';

interface IFeedComponentProps {
	user: IUserFull;
	posts: IPostFull[];
	refresh: () => void;
}

export const Feed = ({ user, posts, refresh }: IFeedComponentProps) => {
	return <MasonryLayout posts={posts} user={user} refresh={refresh} />;
};
