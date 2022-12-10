import jwt_decode from 'jwt-decode';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

import { api } from '../lib/axios';
import { GoogleLoginProps } from '../models/google.model';
import { IUser } from '../models/user.model';

export interface UserContextData {
	loggedUser: IUser;
	setLoggedUser: (user: IUser) => void;
}

export const UserContext = createContext<UserContextData>(
	{} as UserContextData
);

type UserContextProps = {
	children: ReactNode;
};

export function UserContextProvider({ children }: UserContextProps) {
	const [loggedUser, setLoggedUser] = useState<IUser>(null);

	const loginUser = async (decode: GoogleLoginProps) => {
		const { data } = await api.post('/auth', {
			name: decode.name,
			email: decode.email,
			image: decode.picture,
		});

		const { email, id, image, name, comment, posts, save } = data.data;

		setLoggedUser({
			id: id,
			email: email,
			image: image,
			name: name,
			comment: comment,
			posts: posts,
			save: save,
		});
	};

	useEffect(() => {
		const localStorage = JSON.parse(window.localStorage.getItem('account'));
		if (localStorage) {
			loginUser(jwt_decode(localStorage));
		}
	}, []);

	return (
		<UserContext.Provider value={{ loggedUser, setLoggedUser }}>
			{children}
		</UserContext.Provider>
	);
}

export const useAccount = () => {
	const context = useContext(UserContext);

	return context;
};
