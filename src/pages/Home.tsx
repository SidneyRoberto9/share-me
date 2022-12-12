import React from 'react';
import { Navigate } from 'react-router-dom';

import { Feed } from '../components';
import { useAccount } from '../context/useAccount';
import { usePost } from '../context/usePost';
import { isEmpty } from '../utils/validate.util';

export const Home = () => {
	const { Posts } = usePost();
	const { loggedUser } = useAccount();

	if (isEmpty(loggedUser)) return <Navigate to='/login' />;

	return <Feed posts={Posts} />;
};
