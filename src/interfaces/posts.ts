import { Post, User } from '@prisma/client';

import { IUserFullWithout } from './user';

export type IPostFull = {
	id: string;
	title: string;
	imageUrl: string;
	imageHash: string;
	category: string;
	destination: string;
	createdAt: Date | null;
	authorId: string;
	author: IUserFullWithout;
	comment: ICommentFull[];
	save: ISaveFull[];
};

export type ICommentFull = {
	id: string;
	text: string;
	createdAt: Date;
	authorId: string;
	postId: string;
	author: User;
	post: Post;
};

export type ISaveFull = {
	id: string;
	createdAt: Date;
	postId: string;
	userId: string;
	post: Post;
	user: User;
};
