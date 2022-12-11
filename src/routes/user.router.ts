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

	fastApp.get<{ Params: IUserByIdParam }>(
		'/created/:id',
		async (request, reply) => {
			const { id } = request.params;

			const posts = await prismaClient.post.findMany({
				where: {
					authorId: id,
				},
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					comment: {
						include: {
							author: true,
							post: true,
						},
					},
					save: {
						include: {
							user: true,
							post: true,
						},
					},
					author: {
						include: {
							comment: true,
							posts: true,
							save: true,
						},
					},
				},
			});

			reply.code(200).send({ data: posts });
		}
	);

	fastApp.get<{ Params: IUserByIdParam }>(
		'/saved/:id',
		async (request, reply) => {
			const { id } = request.params;

			const saves = await prismaClient.save.findMany({
				where: {
					userId: id,
				},
			});

			const data: any[] = [];

			saves.forEach(async (save) => {
				const post = await prismaClient.post.findUnique({
					where: {
						id: save.postId,
					},
					include: {
						comment: {
							include: {
								author: true,
								post: true,
							},
						},
						save: {
							include: {
								user: true,
								post: true,
							},
						},
						author: {
							include: {
								comment: true,
								posts: true,
								save: true,
							},
						},
					},
				});

				data.push(post);
			});

			reply.code(200).send({ data: data });
		}
	);
};
