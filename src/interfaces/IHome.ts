import { Session, User } from './PrismaTypes';

export interface IHomePageProps {
	sessionActive: Session;
	loggedUser: User;
}
