export type IUser = {
	id: string;
	name: string;
	email: string;
	image: string;
	posts: any[];
	comment: IComment[];
	save: ISave[];
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
