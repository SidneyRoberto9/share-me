import type { NextApiRequest, NextApiResponse } from 'next';

export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		query: { email },
		method,
	} = req;

	const userEmail: string = email[0];

	switch (method) {
		case 'GET':
			const user = await prisma.user.findUnique({
				where: {
					email: userEmail,
				},
			});

			const savesByUserId = await prisma.save.findMany({
				where: {
					userId: user.id,
				},
			});

			const savedPostsByUserId = await prisma.post.findMany({
				where: {
					id: {
						in: savesByUserId.map((save) => save.postId),
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			});

			res.status(200).json({ savedPosts: savedPostsByUserId });
			break;

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
