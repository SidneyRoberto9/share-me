import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Feed, Layout, Loading } from '../components';
import { IPostFull } from '../interfaces/posts';
import { IUserFull } from '../interfaces/user';
import { getFullUserWithEmail } from '../server/useAccount';
import { validateAuthentication } from '../utils/validateAuthentication';

interface HomeProps {
	userData: string;
	postData: string;
}

const Home = ({ userData, postData }: HomeProps) => {
	console.log(1);
	if (!userData || !postData) return <Loading />;

	const user: IUserFull = JSON.parse(userData);
	const posts: IPostFull[] = JSON.parse(postData);
	const router = useRouter();
	const refreshData = () => router.replace(router.asPath);

	console.log(2);
	return (
		<Layout>
			<Feed posts={posts} refresh={refreshData} user={user} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateAuthentication(context, async () => {
		const sessionActive = await getSession(context);

		const loggedUser: IUserFull = await getFullUserWithEmail(
			sessionActive.user.email
		);

		const returnedPosts: IPostFull[] = await prisma.post.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				comment: {
					include: {
						author: true,
						post: true,
					},
				},
				save: {
					include: {
						user: true,
						post: true,
					},
				},
				author: {
					include: {
						comment: true,
						posts: true,
						save: true,
					},
				},
			},
		});

		return {
			props: {
				userData: JSON.stringify(loggedUser),
				postData: JSON.stringify(returnedPosts),
			},
		};
	});
};

export default Home;
