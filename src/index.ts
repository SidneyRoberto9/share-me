import fastify, { FastifyInstance } from 'fastify';

import cors from '@fastify/cors';
import Multipart from '@fastify/multipart';

import { authRouter, postRouter, userRouter } from './routes';

const fastApp: FastifyInstance = fastify({
	logger: true,
});

fastApp.register(cors);

fastApp.register(Multipart);
fastApp.register(userRouter, { prefix: 'api/user' });
fastApp.register(authRouter, { prefix: 'api/auth' });
fastApp.register(postRouter, { prefix: 'api/post' });

fastApp.listen({ port: 3001 }, () => {});
