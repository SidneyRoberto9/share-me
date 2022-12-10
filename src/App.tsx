import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { useAccount } from './context/useAccount';
import { Category, Home, Login, Search } from './pages';
import { isEmpty } from './utils/validate.util';

export default function App() {
	const { loggedUser } = useAccount();

	return (
		<>
			{isEmpty(loggedUser) ? (
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<Navigate to='/login' />} />
				</Routes>
			) : (
				<Layout>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/category/:name' element={<Category />} />
						<Route path='/search/:content' element={<Search />} />
						<Route path='*' element={<Navigate to='/' />} />
					</Routes>
				</Layout>
			)}
		</>
	);
}
