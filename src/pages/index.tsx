import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

const Home = () => {
	return <div>home</div>;
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
	} else {
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
	}
};

export default Home;
