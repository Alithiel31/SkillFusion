import type { Prisma } from '../../../prisma/generated';

export const userHasBadgeData: Prisma.UserHasBadgeCreateManyInput[] = [
    { userId: 2, badgeId: 2 },
    { userId: 2, badgeId: 3 },
    { userId: 3, badgeId: 1 },
];
