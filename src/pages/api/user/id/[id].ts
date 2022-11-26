import { IUserFull } from '../../../../interfaces/server/IUseAccount';
import { includeForIUserFull } from '../../../../utils/queryPrisma';

import type { NextApiRequest, NextApiResponse } from 'next';
export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		query: { id },
		method,
	} = req;

	switch (method) {
		case 'GET':
			const returnedUser: IUserFull = await prisma.user.findUnique({
				where: {
					id: id as string,
				},
				include: includeForIUserFull,
			});

			res.status(200).json({ ...returnedUser });
			break;

		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
