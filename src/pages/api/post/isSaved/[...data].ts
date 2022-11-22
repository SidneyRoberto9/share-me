import { prisma } from '../../../../lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	const { data } = req.query;

	switch (method) {
		case 'GET':
			const user = await prisma.user.findUnique({
				where: {
					email: data[1],
				},
			});

			const isSavedPost = await prisma.save.findUnique({
				where: {
					postId_userId: {
						postId: data[0],
						userId: user.id,
					},
				},
			});

			if (isSavedPost == null) {
				res.status(200).json({ data: false });
			} else {
				res.status(200).json({ data: true });
			}

			break;

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
