import { IPostFull } from '../../../interfaces/server/IUsePosts';

import type { NextApiRequest, NextApiResponse } from 'next';
export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	switch (method) {
		case 'GET':
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

			res.status(200).json({ posts: returnedPosts });
			break;

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
