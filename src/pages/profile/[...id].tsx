import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React from 'react';

import { Layout, Loading, UserProfile } from '../../components';
import { ProfileProps } from '../../interfaces/pages/IProfile';
import { IUserFull } from '../../interfaces/server/IUseAccount';
import { getFullUserWithEmail } from '../../utils/queryPrisma';
import { validateAuthentication } from '../../utils/validateAuthentication';

const Profile = ({ userData }: ProfileProps) => {
	if (!userData) return <Loading />;

	const user: IUserFull = JSON.parse(userData);
	const router = useRouter();
	const refreshData = () => router.replace(router.asPath);

	return (
		<Layout user={user}>
			<UserProfile user={user} refresh={refreshData} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateAuthentication(context, async () => {
		const sessionActive = await getSession(context);

		return {
			props: {
				userData: JSON.stringify(
					await getFullUserWithEmail(sessionActive.user.email)
				),
			},
		};
	});
};

export default Profile;
