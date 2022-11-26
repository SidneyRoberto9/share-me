import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React from 'react';

import { Layout, Loading, PostDetail as Details } from '../../components';
import { PostDetailProps } from '../../interfaces/pages/IPostDetail';
import { IUserFull } from '../../interfaces/server/IUseAccount';
import { IPostFull } from '../../interfaces/server/IUsePosts';
import { getFullUserWithEmail } from '../../utils/queryPrisma';
import { validateAuthentication } from '../../utils/validateAuthentication';

const PostDetail = ({ postData, userData }: PostDetailProps) => {
	if (!userData || !postData) return <Loading />;

	const user: IUserFull = JSON.parse(userData);
	const post: IPostFull = JSON.parse(postData);

	const router = useRouter();
	const refreshData = () => router.replace(router.asPath);

	return (
		<Layout user={user}>
			<Details post={post} user={user} refreshData={refreshData} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateAuthentication(context, async () => {
		const sessionActive = await getSession(context);
		const { id } = context.query;

		const returnedPost: IPostFull = await prisma.post.findUnique({
			where: {
				id: id as string,
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
				postData: JSON.stringify(returnedPost),
			},
		};
	});
};

export default PostDetail;
