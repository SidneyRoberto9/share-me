import { useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import React from 'react';

import { Layout, Loading, UserProfile } from '../../components';
import { useAccount } from '../../server/useAccount';
import { validateAuthentication } from '../../utils/validateAuthentication';

const Profile = () => {
	const { data } = useSession();
	const { user, isLoading, isError } = useAccount(data?.user.email);

	if (isLoading) return <Loading />;

	return (
		<Layout>
			<UserProfile user={user} />
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
