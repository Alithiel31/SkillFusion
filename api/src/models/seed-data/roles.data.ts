import type { Prisma } from '../../../prisma/generated';

export const rolesData: Prisma.RoleCreateManyInput[] = [
    { name: 'student', frName: 'Etudiant' },
    { name: 'instructor', frName: 'Formateur' },
    { name: 'admin', frName: 'Administrateur' },
];
