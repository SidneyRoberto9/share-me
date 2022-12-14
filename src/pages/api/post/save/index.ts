import { prisma } from './../../../../lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	const { postId, userEmail } = req.body;

	switch (method) {
		case 'POST':
			const user = await prisma.user.findUnique({
				where: {
					email: userEmail,
				},
			});

			const isSavedPost = await prisma.save.findUnique({
				where: {
					postId_userId: {
						postId,
						userId: user.id,
					},
				},
			});

			if (isSavedPost == null) {
				await prisma.save.create({
					data: {
						postId: postId,
						userId: user.id,
					},
				});

				res.status(200).json({ message: 'ok' });
			} else {
				await prisma.save.delete({
					where: {
						postId_userId: {
							postId,
							userId: user.id,
						},
					},
				});

				res.status(200).json({ message: 'ok' });
			}

			break;

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
