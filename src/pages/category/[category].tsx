import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React from 'react';

import { Feed, Layout, Loading } from '../../components';
import { IPostFull } from '../../interfaces/posts';
import { IUserFull } from '../../interfaces/user';
import { getFullUserWithEmail } from '../../server/useAccount';
import { validateAuthentication } from '../../utils/validateAuthentication';

interface CategoryProps {
	userData: string;
	postData: string;
}

const PinPage = ({ postData, userData }: CategoryProps) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateAuthentication(context, async () => {
		const sessionActive = await getSession(context);
		const { category } = context.query;

		const loggedUser: IUserFull = await getFullUserWithEmail(
			sessionActive.user.email
		);

		const returnedPosts: IPostFull[] = await prisma.post.findMany({
			where: {
				category: {
					contains: category as string,
				},
			},
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

export default PinPage;
