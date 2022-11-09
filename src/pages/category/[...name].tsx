import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const Category = () => {
	const router = useRouter();
	const { name } = router.query;

	return <div className='text-black text-5xl'>{name}</div>;
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

export default Category;
