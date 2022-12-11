import { IUser, IUserFullWithout } from './user.model';

export type IPostFull = {
	id: string;
	title: string;
	imageUrl: string;
	imageHash: string;
	category: string;
	destination: string;
	createdAt: Date;
	authorId: string;
	author: IUserFullWithout;
	comment: ICommentFull[];
	save: ISaveFull[];
};

export type IComment = {
	id: string;
	text: string;
	createdAt: Date;
	authorId: string;
	postId: string;
	author: any;
	post: any;
};

export type ISave = {
	id: string;
	createdAt: Date;
	postId: string;
	userId: string;
	post: any;
	user: any;
};

export type ICommentFull = {
	id: string;
	text: string;
	createdAt: Date;
	authorId: string;
	postId: string;
	author: IUser;
	post: IPost;
};

export type IPost = {
	id: string;
	title: string;
	imageUrl: string;
	imageHash: string;
	category: string;
	destination: string;
	createdAt: Date | null;
	authorId: string;
	author: any;
	comment: any[];
	save: any[];
};

export type IPostSimple = {
	id: string;
	title: string;
	imageUrl: string;
	imageHash: string;
	category: string;
	destination: string;
	createdAt: Date;
	authorId: string;
};

export type ISaveFull = {
	id: string;
	createdAt: Date;
	postId: string;
	userId: string;
	post: IPost;
	user: IUser;
};
export type ISaveSimple = {
	id: string;
	createdAt: Date;
	postId: string;
	userId: string;
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
