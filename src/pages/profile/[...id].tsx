import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React from 'react';

import { Layout, Loading, UserProfile } from '../../components';
import { IUserFull } from '../../interfaces/user';
import { getFullUserWithEmail } from '../../server/useAccount';
import { validateAuthentication } from '../../utils/validateAuthentication';

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateAuthentication(context, async () => {
		const sessionActive = await getSession(context);

		const loggedUser: IUserFull = await getFullUserWithEmail(
			sessionActive.user.email
		);

		return {
			props: {
				userData: JSON.stringify(loggedUser),
			},
		};
	});
};

interface ProfileProps {
	userData: string;
}

const Profile = ({ userData }: ProfileProps) => {
	if (!userData) return <Loading />;

	const user: IUserFull = JSON.parse(userData);
	const router = useRouter();
	const refreshData = () => router.replace(router.asPath);

	return (
		<Layout>
			<UserProfile user={user} refresh={refreshData} />
		</Layout>
	);
};

export default Profile;
