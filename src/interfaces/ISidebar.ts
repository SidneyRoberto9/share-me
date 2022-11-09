import { Dispatch, SetStateAction } from 'react';

import { User } from './PrismaTypes';

export interface ISidebarComponentProps {
	user: User;
	closeToggle?: Dispatch<SetStateAction<boolean>>;
}
