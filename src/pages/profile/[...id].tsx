import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React from 'react';

import { Layout } from '../../components';
import { validateAuthentication } from '../../utils/validateAuthentication';

const Profile = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<Layout>
			<div className='text-black text-5xl'>{id}</div>
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

export default Profile;
