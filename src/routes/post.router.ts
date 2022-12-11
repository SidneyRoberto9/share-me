import { FastifyInstance } from 'fastify';
import { createReadStream, createWriteStream, unlinkSync } from 'fs';
import { pipeline } from 'stream';
import util from 'util';

import { ImgurClient } from '../lib/imgur';
import { prismaClient } from '../lib/prisma';

const pump = util.promisify(pipeline);

export const postRouter = async (fastApp: FastifyInstance, options: any) => {
	fastApp.get('/', async (request, reply) => {
		const post = await prismaClient.post.findMany({
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

		reply.code(200).send({ data: post });
	});

	fastApp.get<{ Params: IPostQueryParam }>(
		'/delete/:postId',
		async (request, reply) => {
			const { postId } = request.params;

			const post = await prismaClient.post.findUnique({
				where: {
					id: postId,
				},
			});

			if (post) {
				await ImgurClient.deleteImage(post.imageHash);
			}

			await prismaClient.post.delete({
				where: {
					id: postId,
				},
			});

			await prismaClient.save.deleteMany({
				where: {
					postId: postId,
				},
			});

			reply.code(200).send({ data: 'ok' });
		}
	);

	fastApp.post<{ Body: ISaveBodyParam }>('/save', async (request, reply) => {
		const { postId, userId } = request.body;

		const isSavedPost = await prismaClient.save.findUnique({
			where: {
				postId_userId: {
					postId,
					userId,
				},
			},
		});

		if (isSavedPost == null) {
			await prismaClient.save.create({
				data: {
					postId,
					userId,
				},
			});

			reply.code(200).send({ data: 'ok' });
		} else {
			await prismaClient.save.delete({
				where: {
					postId_userId: {
						postId,
						userId,
					},
				},
			});

			reply.code(200).send({ data: 'ok' });
		}
	});

	fastApp.post<{ Body: ISaveBodyParam }>('/issave/', async (request, reply) => {
		const { postId, userId } = request.body;

		const isSavedPost = await prismaClient.save.findUnique({
			where: {
				postId_userId: {
					postId,
					userId,
				},
			},
		});

		reply.code(200).send({ data: isSavedPost });
	});

	fastApp.post<{ Body: ICommentBodyParam }>(
		'/comment/add',
		async (request, reply) => {
			const { text, postId, userId } = request.body;
			console.log(request.body);

			await prismaClient.comment.create({
				data: {
					text: text,
					postId: postId,
					authorId: userId,
				},
			});

			reply.code(200).send({ data: 'ok' });
		}
	);

	fastApp.post<{ Body: IPostDeleteBodyParam }>(
		'/delete',
		async (request, reply) => {
			const { fileName } = request.body;

			unlinkSync(`./src/tmp/${fileName}`);

			reply.code(200).send({ data: 'ok' });
		}
	);

	fastApp.post<{ Body: IPostAddBodyParam }>('/add', async (request, reply) => {
		const { title, destination, category, image, imageName, email } =
			request.body;

		const user = await prismaClient.user.findUnique({
			where: {
				email: email,
			},
		});

		const imagePath = `./src/tmp/${imageName}`;

		const { data } = await ImgurClient.upload({
			image: createReadStream(imagePath) as any,
			title: title,
			type: 'stream',
		});

		const url: string = 'https://i.' + String(data.link).slice(10);

		unlinkSync(imagePath);

		if (user && data.deletehash) {
			const post = await prismaClient.post.create({
				data: {
					title: title,
					destination: destination,
					category: category,
					imageUrl: url,
					authorId: user.id,
					imageHash: data.deletehash,
				},
			});

			reply.code(200).send({ data: post });
		}
	});

	fastApp.post('/upload', async (request, reply) => {
		try {
			const data = await request.file();

			if (data) {
				const fileName = `${data.filename}-${Date.now()}-${Math.round(
					Math.random() * 1e9
				)}.${data.mimetype.split('/')[1]}`;

				data.filename = fileName;

				pump(data.file, createWriteStream('./src/tmp/' + data.filename));

				reply.code(200).send({
					data: {
						directory: './src/tmp/',
						fileName: fileName,
					},
				});
			}
		} catch (e) {
			reply.code(500).send({ data: null, error: 'Internal Server Error' });
		}
	});
};
