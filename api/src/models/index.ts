import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export type { User, RefreshToken, Role } from '@prisma/client';