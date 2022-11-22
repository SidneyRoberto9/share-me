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
			const post = await prisma.post.findUnique({
				where: {
					id: id as string,
				},
			});

			res.status(200).json({ data: post });

			break;

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
