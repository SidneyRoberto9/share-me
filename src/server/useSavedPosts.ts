import { Post } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';

import { api } from '../lib/axios';

const fetcherGet = (url: string) => axios.get(url);
const fetcherPost = (url: string, obj: object) => axios.post(url, obj);

interface IUsePostReturn {
	posts: Post[];
	isLoading: boolean;
	isError: boolean;
}
interface ISavedPostReturn {
	value: boolean;
	isLoading: boolean;
	isError: boolean;
}

interface ISavePostDto {
	postId: string;
	userEmail: string;
}

export class useSavedPosts {
	getSavedPostsByEmail = (email: string): IUsePostReturn => {
		const { data, error } = useSWR(`/api/post/saved/${email}`, fetcherGet);

		return {
			posts: data?.data.savedPosts,
			isLoading: !error && !data?.data,
			isError: error,
		};
	};

	savePost = async (dto: ISavePostDto): Promise<any> => {
		const { data } = await api.post(`/api/post/save`, dto);

		return {
			posts: data?.data,
		};
	};

	isSavedPost = (dto: ISavePostDto): ISavedPostReturn => {
		const { data, error } = useSWR(
			`/api/post/isSaved/${dto.postId}/${dto.userEmail}`,
			fetcherGet
		);

		return {
			value: data?.data.data,
			isLoading: !error && !data?.data,
			isError: error,
		};
	};
}
