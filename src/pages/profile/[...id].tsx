import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const Profile = () => {
	const router = useRouter();
	const { id } = router.query;

	return <div className='text-white text-5xl'>{id}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const sessionActive = await getSession(context);

	if (!sessionActive) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	const loggedUser = await prisma.user.findUnique({
		where: {
			email: sessionActive.user.email,
		},
	});

	return {
		props: {
			sessionActive,
			loggedUser,
		},
	};
};

export default Profile;
