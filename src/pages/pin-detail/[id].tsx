import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React from 'react';

import { Layout, Loading, PinDetails } from '../../components';
import { IPostFull } from '../../interfaces/posts';
import { IUserFull } from '../../interfaces/user';
import { validateAuthentication } from '../../utils/validateAuthentication';

export const getServerSideProps: GetServerSideProps = async (context) => {
	return validateAuthentication(context, async () => {
		const sessionActive = await getSession(context);
		const { id } = context.query;

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

		const returnedPost: IPostFull = await prisma.post.findUnique({
			where: {
				id: id as string,
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
				postData: JSON.stringify(returnedPost),
			},
		};
	});
};

interface PosteDetailProps {
	userData: string;
	postData: string;
}

const PinDetail = ({ postData, userData }: PosteDetailProps) => {
	if (!userData || !postData) return <Loading />;

	const user: IUserFull = JSON.parse(userData);
	const post: IPostFull = JSON.parse(postData);

	const router = useRouter();
	const refreshData = () => router.replace(router.asPath);

	return (
		<Layout>
			<PinDetails post={post} user={user} refreshData={refreshData} />
		</Layout>
	);
};

export default PinDetail;
