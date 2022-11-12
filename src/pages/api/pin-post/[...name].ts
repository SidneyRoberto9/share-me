import type { NextApiRequest, NextApiResponse } from 'next';

export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		query: { name },
		method,
	} = req;

	const categoryName: string = name[0];

	switch (method) {
		case 'GET':
			if (categoryName === 'all') {
				const returnedPosts = await prisma.post.findMany({
					orderBy: {
						createdAt: 'desc',
					},
				});

				res.status(200).json({ posts: returnedPosts });
				break;
			} else {
				const returnedPosts = await prisma.post.findMany({
					where: {
						title: {
							contains: categoryName,
						},
						tags: {
							has: categoryName,
						},
					},
					orderBy: {
						createdAt: 'desc',
					},
				});

				res.status(200).json({ posts: returnedPosts });
				break;
			}

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
