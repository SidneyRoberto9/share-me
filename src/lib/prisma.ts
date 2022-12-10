import { PrismaClient } from '@prisma/client';

declare global {
	var prismaClient: PrismaClient | undefined;
}

export const prismaClient =
	globalThis.prismaClient ||
	new PrismaClient({
		log: ['info'],
	});

globalThis.prismaClient = prismaClient;
