import { Post, User } from '@prisma/client';

export type IUserFull = {
	id: string;
	name: string | null;
	email: string | null;
	emailVerified: Date | null;
	image: string | null;
	posts: Post[] | null;
	comment: ICommentFull[] | null;
	save: ISaveFull[] | null;
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
