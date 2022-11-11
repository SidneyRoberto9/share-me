import { Dispatch, SetStateAction } from 'react';

export interface ISidebarComponentProps {
	closeToggle?: Dispatch<SetStateAction<boolean>>;
}
