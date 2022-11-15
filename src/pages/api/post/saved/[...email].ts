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

			const savedPostsByUserId = await prisma.save.findMany({
				where: {
					userId: user.id,
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
