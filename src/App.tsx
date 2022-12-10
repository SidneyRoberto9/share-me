import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { useAccount } from './context/useAccount';
import { Category, Home, Login, Search } from './pages';

export default function App() {
	const { loggedUser } = useAccount();

	return (
		<>
			{Object.entries(loggedUser).length > 0 ? (
				<Layout>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/category/:name' element={<Category />} />
						<Route path='/search/:content' element={<Search />} />
						<Route path='*' element={<Navigate to='/' />} />
					</Routes>
				</Layout>
			) : (
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<Navigate to='/login' />} />
				</Routes>
			)}
		</>
	);
}
