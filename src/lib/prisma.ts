import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

export const prisma =
	globalThis.prisma ||
	new PrismaClient({
		log: ['info'],
	});

globalThis.prisma = prisma;
