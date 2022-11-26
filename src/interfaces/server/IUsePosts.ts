import { Post, User } from '@prisma/client';

import { IUserFullWithout } from './IUseAccount';

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

export type IUsePostReturn = {
	posts: IPostFull[];
	isLoading: boolean;
	isError: boolean;
};

export type IPostDto = {
	title: string;
	destination: string;
	category: string;
	image: string;
	imageName: string;
	email: string;
};

export type ISavePostDto = {
	postId: string;
	userEmail: string;
};
