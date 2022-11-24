import { prisma } from '../../../../lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';
export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	const { id } = req.query;

	const { comment, userId } = req.body;

	switch (method) {
		case 'POST':
			await prisma.comment.create({
				data: {
					text: comment,
					authorId: userId,
					postId: id as string,
				},
			});

			res.status(200).json({ comments: 'ok' });

			break;

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
