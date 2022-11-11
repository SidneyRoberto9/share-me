import { Session, User } from '../others/PrismaTypes';

export interface IHomePageProps {
	sessionActive: Session;
	loggedUser: User;
}
