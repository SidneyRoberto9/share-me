import jwtDecode from 'jwt-decode';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { api } from '../lib/axios';
import { GoogleLoginProps } from '../models/google.model';
import { IPostFull } from '../models/post.model';
import { IUser } from '../models/user.model';

export interface UserContextData {
	loggedUser: IUser;
	loading: boolean;
	update: () => void;
	setLoggedUser: (user: IUser) => void;
	getSaved: (id: string) => Promise<IPostFull[]>;
	getCreated: (id: string) => Promise<IPostFull[]>;
	getUser: (id: string) => Promise<IUser>;
	signIn: (decode: GoogleLoginProps) => void;
	signOut: () => void;
}

export const UserContext = createContext<UserContextData>(
	{} as UserContextData
);

type UserContextProps = {
	children: ReactNode;
};

export function UserContextProvider({ children }: UserContextProps) {
	const [loggedUser, setLoggedUser] = useState<IUser>({} as IUser);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const account = localStorage.getItem('account');

		if (account) {
			const decode = JSON.parse(account);
			signIn(jwtDecode(decode));
		} else {
			setLoading(false);
		}
	}, []);

	const signIn = async (decode: GoogleLoginProps) => {
		const { data } = await api.post('/auth', {
			name: decode.name,
			email: decode.email,
			image: decode.picture,
		});

		setLoggedUser({ ...data.data });
		setLoading(false);
	};

	const signOut = () => {
		localStorage.removeItem('account');
		setLoggedUser({} as IUser);
	};

	const update = async () => {
		const { data } = await api.get('/user/id/' + loggedUser.id);

		setLoggedUser({ ...data.data });
	};

	const getSaved = async (id: string) => {
		const { data } = await api.get(`/user/saved/${id}`);

		return data.data;
	};

	const getCreated = async (id: string) => {
		const { data } = await api.get(`/user/created/${id}`);

		return data.data;
	};

	const getUser = async (id: string) => {
		const { data } = await api.get(`/user/id/${id}`);

		return data.data;
	};

	return (
		<UserContext.Provider
			value={{
				loggedUser,
				loading,
				setLoggedUser,
				getSaved,
				getCreated,
				getUser,
				signIn,
				signOut,
				update,
			}}>
			{children}
		</UserContext.Provider>
	);
}

export const useAccount = () => {
	const context = useContext(UserContext);

	return context;
};
