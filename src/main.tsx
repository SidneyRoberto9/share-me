import './styles/global.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserContextProvider } from './context/useAccount';
import { PostContextProvider } from './context/usePost';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
		<UserContextProvider>
			<PostContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PostContextProvider>
		</UserContextProvider>
	</GoogleOAuthProvider>
);
