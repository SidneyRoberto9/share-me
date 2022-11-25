import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

import type { AppProps } from 'next/app';
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<>
			<Head>
				<title>Share - Me</title>
			</Head>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}
