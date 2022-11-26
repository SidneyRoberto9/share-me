import { Comment, Post, Save, User } from '@prisma/client';

import { IPostFull } from './IUsePosts';

export type IUserFull = {
	id: string;
	name: string;
	email: string;
	emailVerified: Date;
	image: string;
	posts: IPostFull[];
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

export type IUserFullWithout = {
	id: string;
	name: string;
	email: string;
	emailVerified: Date;
	image: string;
	posts: Post[];
	comment: Comment[];
	save: Save[];
};

export type IUseAccountReturn = {
	user: IUserFull;
	isLoading: boolean;
	isError: boolean;
};
