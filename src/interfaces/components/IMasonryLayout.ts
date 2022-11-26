import { IUserFull } from '../server/IUseAccount';
import { IPostFull } from '../server/IUsePosts';

export type MasonryLayoutComponentProps = {
	user: IUserFull;
	posts: IPostFull[];
	refresh: () => void;
};
