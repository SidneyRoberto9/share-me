import { FastifyInstance } from 'fastify';

import { prismaClient } from '../lib/prisma';

export const userRouter = async (fastApp: FastifyInstance, options: any) => {
	fastApp.get<{ Params: IUserByIdParam }>('/id/:id', async (request, reply) => {
		const { id } = request.params;
		const user = await prismaClient.user.findUnique({
			where: { id: id },
			include: {
				posts: true,
				save: true,
				comment: true,
			},
		});

		if (user == null) {
			reply.code(404);
			return { message: 'user not found' };
		}

		reply.code(200).send({ data: user });
	});

	fastApp.get<{ Params: IUserByEmailParam }>(
		'/email/:email',
		async (request, reply) => {
			const { email } = request.params;
			const user = await prismaClient.user.findUnique({
				where: { email: email },
				include: {
					posts: true,
					save: true,
					comment: true,
				},
			});

			if (user == null) {
				reply.code(404);
				return { message: 'user not found' };
			}

			reply.code(200).send({ data: user });
		}
	);
};
