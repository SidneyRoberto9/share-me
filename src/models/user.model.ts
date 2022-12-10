import { IComment, IPost, ISave } from './post.model';

export type IUser = {
	id: string;
	name: string;
	email: string;
	image: string;
	posts: IPost[];
	comment: IComment[];
	save: ISave[];
};

export type IUserFullWithout = {
	id: string;
	name: string;
	email: string;
	emailVerified: Date;
	image: string;
	posts: IUser[];
	comment: IComment[];
	save: ISave[];
};
