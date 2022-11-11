import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

import { Category, Layout, Loading, Pins } from '../components';
import { useAccount } from '../server/useUser';
import { validateAuthentication } from '../utils/validateAuthentication';

const Home = () => {
	const { data } = useSession();
	const { user, isLoading, isError } = useAccount(data?.user.email);

	if (isLoading) return <Loading />;

	return (
		<Layout>
			<Pins>
				<Category />
			</Pins>
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

export default Home;
