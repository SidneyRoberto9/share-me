import { GetServerSidePropsContext, PreviewData } from 'next';
import { getSession } from 'next-auth/react';
import { ParsedUrlQuery } from 'querystring';

export const validateAuthentication = async (
	context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
	callback: any
) => {
	const sessionActive = await getSession(context);

	if (!sessionActive) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return callback();
};

export const validateLoginAuthentication = async (
	context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
	callback: any
) => {
	const sessionActive = await getSession(context);

	if (sessionActive) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return callback();
};
