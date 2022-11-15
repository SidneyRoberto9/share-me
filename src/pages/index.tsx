import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

import { Feed, Layout, Loading } from '../components';
import { useAccount } from '../server/useAccount';
import { validateAuthentication } from '../utils/validateAuthentication';

const Home = () => {
	const { data } = useSession();
	const { user, isLoading, isError } = useAccount(data?.user.email);

	if (isLoading) return <Loading />;

	return (
		<Layout>
			<Feed categoryName='all' />
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
