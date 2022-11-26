import { IUserFull } from '../server/IUseAccount';

export type UserProfileComponentProps = {
	user: IUserFull;
	refresh: () => void;
};
