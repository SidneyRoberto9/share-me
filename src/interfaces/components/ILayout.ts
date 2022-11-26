import { IUserFull } from '../server/IUseAccount';

export interface ILayoutContainerProps {
	children: React.ReactNode;
	user: IUserFull;
}
