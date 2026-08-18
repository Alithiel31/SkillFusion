import type { Prisma } from '../../../prisma/generated';

export const badgesData: Prisma.BadgeCreateManyInput[] = [
    {
        name: '1 cours terminée',
        description: 'Tu a terminé un cours! Bravo continue',
        icon: 'one-star',
        color: '#f0f',
    },
    {
        name: '5 cours terminée',
        description: 'Tu a terminé cinq cours! Tu gere',
        icon: 'two-star',
        color: 'rgb(84, 255, 112)',
    },
    {
        name: '10 cours terminée',
        description: 'Tu a terminé dix cours! Un vrai pro',
        icon: 'three-star',
        color: 'rgb(252, 193, 0)',
    },
];
