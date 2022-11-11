import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url);

export const useAccount = (email: any) => {
	const { data, error } = useSWR(`/api/user/${email}`, fetcher);

	return {
		user: data?.data,
		isLoading: !error && !data?.data,
		isError: error,
	};
};
