import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout, Loading } from './components';
import { useAccount } from './context/useAccount';
import { Add, Category, Home, Login, PostDetailsPage, Profile, Search } from './pages';

export default function App() {
	const { loading } = useAccount();

	if (loading) {
		return (
			<Routes>
				<Route path='*' element={<Loading />} />
			</Routes>
		);
	}

	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/add' element={<Add />} />
				<Route path='/profile/:id' element={<Profile />} />
				<Route path='/search/:content' element={<Search />} />
				<Route path='/category/:name' element={<Category />} />
				<Route path='/details/:id' element={<PostDetailsPage />} />
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Layout>
	);
}
