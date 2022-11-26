import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React from 'react';

import { Feed, Layout, Loading } from '../../components';
import { CategoryProps } from '../../interfaces/pages/ICategory';
import { IUserFull } from '../../interfaces/server/IUseAccount';
import { IPostFull } from '../../interfaces/server/IUsePosts';
import { getFullUserWithEmail } from '../../utils/queryPrisma';
import { validateAuthentication } from '../../utils/validateAuthentication';

const PinPage = ({ postData, userData }: CategoryProps) => {
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
		const { category } = context.query;

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
				userData: JSON.stringify(
					await getFullUserWithEmail(sessionActive.user.email)
				),
				postData: JSON.stringify(returnedPosts),
			},
		};
	});
};

export default PinPage;
