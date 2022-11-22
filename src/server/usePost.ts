import { Post } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';

import { api } from './../lib/axios';

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

export const useDeletePost = async (postId: string) => {
	await api.get(`/api/post/delete/${postId}`);

	return;
};

export const useUploadPost = async (file: FormData) => {
	const { data } = await api.post(`/api/post/upload`, file);

	return {
		data,
	};
};

export const useDeleteUploadPost = async (filename: String) => {
	const { data } = await api.post(
		`/api/post/delete-upload`,
		{
			fileName: filename,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	return {
		data,
	};
};
interface IPostDto {
	title: string;
	destination: string;
	category: string;
	image: string;
	imageName: string;
	email: string;
}

export const useCreatePost = async (postDto: IPostDto) => {
	const { data } = await api.post(`/api/post/add`, postDto);

	return {
		data,
	};
};
