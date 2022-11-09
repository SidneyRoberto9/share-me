import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';

const Pins = () => {
	return <div>Pins</div>;
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

export default Pins;
