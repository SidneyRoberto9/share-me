import { Session, User } from './PrismaTypes';

export interface ILayoutContainerProps {
	session: Session;
	loggedUser: User;
	children: React.ReactNode;
}
