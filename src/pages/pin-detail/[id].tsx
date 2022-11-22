import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React from 'react';

import { Layout, Loading, PinDetails } from '../../components';
import { useGetPostById } from '../../server/usePost';
import { validateAuthentication } from '../../utils/validateAuthentication';

const PinDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { post, isLoading } = useGetPostById(id as string);
	console.log(post);

	if (isLoading) return <Loading />;

	return (
		<Layout>
			<PinDetails pin={post} />
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

export default PinDetail;
