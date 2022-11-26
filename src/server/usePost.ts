import axios from 'axios';
import useSWR from 'swr';

import { IPostDto, ISavePostDto, IUsePostReturn } from '../interfaces/server/IUsePosts';
import { api } from './../lib/axios';

const fetcher = (url: string) => axios.get(url);

export const getPosts = (): IUsePostReturn => {
	const { data, error } = useSWR(`/api/post/`, fetcher);

	return {
		posts: data?.data.posts,
		isLoading: !error && !data?.data,
		isError: error,
	};
};

export const deletePostWithId = async (postId: string) => {
	await api.get(`/api/post/delete/${postId}`);

	return;
};

export const uploadPost = async (file: FormData) => {
	const { data } = await api.post(`/api/post/upload`, file);

	return {
		data,
	};
};

export const deleteUploadedPost = async (filename: String) => {
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

export const createPost = async (postDto: IPostDto) => {
	const { data } = await api.post(`/api/post/add`, postDto);

	return {
		data,
	};
};

export const AddCommentInPost = async (
	postId: string,
	comment: string,
	userId: string
) => {
	const { data } = await api.post(`/api/post/comment/${postId}`, {
		comment,
		userId,
	});

	return {
		data,
	};
};

export const savePost = async (dto: ISavePostDto): Promise<any> => {
	const { data } = await api.post(`/api/post/save`, dto);

	return {
		posts: data?.data,
	};
};
