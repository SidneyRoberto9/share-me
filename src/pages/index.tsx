import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Feed, Layout, Loading } from '../components';
import { HomeProps } from '../interfaces/pages/IHome';
import { IUserFull } from '../interfaces/server/IUseAccount';
import { IPostFull } from '../interfaces/server/IUsePosts';
import { getFullUserWithEmail, getManyFullPosts } from '../utils/queryPrisma';
import { validateAuthentication } from '../utils/validateAuthentication';

const Home = ({ userData, postData }: HomeProps) => {
	if (!userData || !postData) return <Loading />;

	const user: IUserFull = JSON.parse(userData);
	const posts: IPostFull[] = JSON.parse(postData);
	const router = useRouter();
	const refreshData = () => router.replace(router.asPath);

	return (
		<Layout user={user}>
			<Feed posts={posts} refresh={refreshData} user={user} />
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
				postData: JSON.stringify(await getManyFullPosts()),
			},
		};
	});
};

export default Home;
