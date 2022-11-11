import type { NextApiRequest, NextApiResponse } from 'next';

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		query: { email },
		method,
	} = req;

	switch (method) {
		case 'GET':
			const returnedUser = await prisma.user.findUnique({
				where: {
					email: email[0],
				},
				include: {
					sessions: true,
				},
			});

			res.status(200).json({ ...returnedUser });
			break;

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
