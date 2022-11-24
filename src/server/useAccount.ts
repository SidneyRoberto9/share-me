import axios from 'axios';
import useSWR from 'swr';

import { IUserFull } from '../interfaces/user';
import { includeForIUserFull } from '../utils/queryPrisma';

const fetcher = (url: string) => axios.get(url);

interface IUseAccountReturn {
	user: IUserFull;
	isLoading: boolean;
	isError: boolean;
}

export const useAccount = (email: any): IUseAccountReturn => {
	const { data, error } = useSWR(`/api/user/${email}`, fetcher);

	return {
		user: data?.data,
		isLoading: !error && !data?.data,
		isError: error,
	};
};

export const useAccountId = (id: any): IUseAccountReturn => {
	const { data, error } = useSWR(`/api/user/id/${id}`, fetcher);

	return {
		user: data?.data,
		isLoading: !error && !data?.data,
		isError: error,
	};
};

export const getFullUserWithEmail = async (email: any) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		},
		include: includeForIUserFull,
	});
};
