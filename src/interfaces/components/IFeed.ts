import { IUserFull } from '../server/IUseAccount';
import { IPostFull } from '../server/IUsePosts';

export type FeedComponentProps = {
	user: IUserFull;
	posts: IPostFull[];
	refresh: () => void;
};
