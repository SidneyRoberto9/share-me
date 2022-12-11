import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { api } from '../lib/axios';
import { IPostDto, IPostFull } from '../models/post.model';
import { useAccount } from './useAccount';

export interface PostContextData {
	Posts: IPostFull[];
	save: (postId: string, userId: string) => Promise<void>;
	postDelete: (postId: string) => Promise<void>;
	addPost: (post: IPostDto) => Promise<void>;
	uploadImage: (formData: FormData) => Promise<any>;
	uploadImageDelete: (filename: string) => Promise<void>;
	comment: (text: string, postId: string, userId: string) => Promise<void>;
}

export const PostContext = createContext<PostContextData>(
	{} as PostContextData
);

type PostContextProps = {
	children: ReactNode;
};

export function PostContextProvider({ children }: PostContextProps) {
	const [Posts, setPosts] = useState<IPostFull[]>([]);

	const { update } = useAccount();

	const getPosts = async () => {
		const { data } = await api.get('/post');
		setPosts(data.data);
	};

	const save = async (postId: string, userId: string) => {
		const body = {
			postId,
			userId,
		};
		await api.post(`/post/save`, body);
		getPosts();
		update();
	};

	const postDelete = async (postId: string) => {
		await api.get(`/post/delete/${postId}`);
		getPosts();
	};

	const uploadImage = async (formData: FormData) => {
		const { data } = await api.post('/post/upload', formData);
		return data.data;
	};

	const uploadImageDelete = async (fileName: string) => {
		await api.post(`/post/delete`, {
			fileName: fileName,
		});
		getPosts();
	};

	const addPost = async (postDto: IPostDto) => {
		await api.post(`/post/add`, postDto);
		getPosts();
	};

	const comment = async (text: string, postId: string, userId: string) => {
		const body = {
			text,
			postId,
			userId,
		};
		await api.post(`/post/comment/add`, body);
		getPosts();
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<PostContext.Provider
			value={{
				Posts,
				save,
				postDelete,
				uploadImage,
				uploadImageDelete,
				addPost,
				comment,
			}}>
			<>{children}</>
		</PostContext.Provider>
	);
}

export const usePost = () => {
	const context = useContext(PostContext);

	return context;
};
