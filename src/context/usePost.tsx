import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { api } from '../lib/axios';
import { IPostFull } from '../models/post.model';

export interface PostContextData {
	Posts: IPostFull[];
	save: (postId: string, userId: string) => Promise<void>;
	postDelete: (postId: string) => Promise<void>;
}

export const PostContext = createContext<PostContextData>(
	{} as PostContextData
);

type PostContextProps = {
	children: ReactNode;
};

export function PostContextProvider({ children }: PostContextProps) {
	const [Posts, setPosts] = useState<IPostFull[]>([]);

	const getPosts = async () => {
		const { data } = await api.get('/post');
		setPosts(data.data);
	};

	const save = async (postId: string, userId: string) => {
		const body = {
			postId,
			userId,
		};
		await api.post(`/posts/save`, body);
		getPosts();
	};

	const postDelete = async (postId: string) => {
		await api.delete(`/posts/${postId}`);
		getPosts();
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<PostContext.Provider value={{ Posts, save, postDelete }}>
			<>{children}</>
		</PostContext.Provider>
	);
}

export const usePost = () => {
	const context = useContext(PostContext);

	return context;
};
