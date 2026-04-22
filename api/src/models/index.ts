import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export type { User, RefreshToken } from '@prisma/client';