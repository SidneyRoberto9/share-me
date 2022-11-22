import { prisma } from '../../../../lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';
export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	const { id } = req.query;

	switch (method) {
		case 'GET':
			const commentsWithUser = [];
			const postId = id as string;

			const comments = await prisma.comment.findMany({
				where: {
					post: {
						id: postId,
					},
				},
			});

			for (const comment of comments) {
				const user = await prisma.user.findUnique({
					where: {
						id: comment.authorId,
					},
				});

				commentsWithUser.push({ ...comment, ...user });
			}

			res.status(200).json({ comments: commentsWithUser });

			break;

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
