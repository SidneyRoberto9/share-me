import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Feed, Layout, Loading } from '../components';
import { IPostFull } from '../interfaces/posts';
import { IUserFull } from '../interfaces/user';
import { validateAuthentication } from '../utils/validateAuthentication';

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateAuthentication(context, async () => {
		const sessionActive = await getSession(context);

		const loggedUser: IUserFull = await prisma.user.findUnique({
			where: {
				email: sessionActive.user.email,
			},

			include: {
				posts: true,
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
			},
		});

		const returnedPosts: IPostFull[] = await prisma.post.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				author: true,
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

interface HomeProps {
	userData: string;
	postData: string;
}

const Home = ({ userData, postData }: HomeProps) => {
	if (!userData || !postData) return <Loading />;

	const user: IUserFull = JSON.parse(userData);
	const posts: IPostFull[] = JSON.parse(postData);
	const router = useRouter();
	const refreshData = () => router.replace(router.asPath);

	return (
		<Layout>
			<Feed posts={posts} refresh={refreshData} user={user} />
		</Layout>
	);
};

export default Home;
