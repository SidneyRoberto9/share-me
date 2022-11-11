import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React from 'react';

import { Layout } from '../../components';
import { validateAuthentication } from '../../utils/validateAuthentication';

const PinPage = () => {
	const router = useRouter();
	const { category } = router.query;

	return (
		<Layout>
			<div>{category}</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateAuthentication(context, () => {
		return {
			props: {},
		};
	});
};

export default PinPage;
