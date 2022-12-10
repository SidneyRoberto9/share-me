import './styles/global.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserContextProvider } from './context/useAccount';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
		<UserContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserContextProvider>
	</GoogleOAuthProvider>
);
