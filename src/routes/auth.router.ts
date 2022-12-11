import { FastifyInstance } from 'fastify';

import { prismaClient } from '../lib/prisma';

export const authRouter = async (fastApp: FastifyInstance, options: any) => {
	fastApp.post<{ Body: IAuthBodyParam }>('/', async (request, reply) => {
		const { name, email, image } = request.body;

		const user = await prismaClient.user.findUnique({
			where: {
				email: email,
			},
			include: {
				posts: true,
				save: true,
				comment: true,
			},
		});

		if (user) {
			reply.code(201).send({ data: user });
			return;
		}

		const createdUser = await prismaClient.user.create({
			data: {
				image,
				email,
				name,
			},
		});

		reply.code(201).send({ data: createdUser });
	});
};
