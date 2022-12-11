import { IComment, ISave } from './post.model';

export type IUser = {
	id: string;
	name: string;
	email: string;
	image: string;
	posts: any[];
	comment: any[];
	save: any[];
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
