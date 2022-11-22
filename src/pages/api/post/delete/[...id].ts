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
			const postId = id[0];

			await prisma.post.delete({
				where: {
					id: postId,
				},
			});

			await prisma.save.deleteMany({
				where: {
					postId: postId,
				},
			});

			res.status(200).json({ message: 'ok' });

			break;

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
