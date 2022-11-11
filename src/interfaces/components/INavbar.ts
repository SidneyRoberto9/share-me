import { Dispatch, SetStateAction } from 'react';

export interface INavbarComponentProps {
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<String>>;
}
