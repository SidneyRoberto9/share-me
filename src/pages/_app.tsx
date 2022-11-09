import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';

import Layout from '../containers/Layout';

import type { AppProps } from 'next/app';
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	const layoutProps = {
		session: pageProps.sessionActive,
		loggedUser: pageProps.loggedUser,
	};

	return (
		<SessionProvider session={session}>
			<Layout {...layoutProps}>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}
