import type { NextApiRequest, NextApiResponse } from 'next';

export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		body: { data },
		method,
	} = req;

	console.log(data);

	switch (method) {
		case 'GET':
			const returnedPosts = await prisma.post.findMany({
				orderBy: {
					createdAt: 'desc',
				},
			});

			res.status(200).json({ posts: returnedPosts });
			break;

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
