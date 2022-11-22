import { ImgurClient } from 'imgur';

import { prisma } from '../../../../lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

const client = new ImgurClient({
	clientId: process.env.IMGUR_CLIENT_ID,
	clientSecret: process.env.IMGUR_CLIENT_SECRET,
	refreshToken: process.env.IMGUR_CLIENT_REFRESH_TOKEN,
});

export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	const { id } = req.query;

	switch (method) {
		case 'GET':
			const postId = id[0];

			const post = await prisma.post.findUnique({
				where: {
					id: postId,
				},
			});

			await client.deleteImage(post.imageHash);

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
