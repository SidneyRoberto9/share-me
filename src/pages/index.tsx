import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

import { Feed, Layout, Loading, Pins } from '../components';
import { useAccount } from '../server/useAccount';
import { validateAuthentication } from '../utils/validateAuthentication';

const Home = () => {
	const { data } = useSession();
	const { user, isLoading, isError } = useAccount(data?.user.email);

	if (isLoading) return <Loading />;

	return (
		<Layout>
			<Pins>
				<Feed categoryName='all' />
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
