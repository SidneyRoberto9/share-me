import { IUserFull } from '../server/IUseAccount';
import { IPostFull } from '../server/IUsePosts';

export type PinComponentProps = {
	post: IPostFull;
	user: IUserFull;
	refresh: () => void;
};

export type PostDetailComponentProps = {
	post: IPostFull;
	user: IUserFull;
	refreshData: () => void;
};
