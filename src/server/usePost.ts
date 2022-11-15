import { Post } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url);

interface IUsePostReturn {
	posts: Post[];
	isLoading: boolean;
	isError: boolean;
}

export const usePost = (categoryName: string): IUsePostReturn => {
	const { data, error } = useSWR(`/api/post/${categoryName}`, fetcher);

	return {
		posts: data?.data.posts,
		isLoading: !error && !data?.data,
		isError: error,
	};
};
