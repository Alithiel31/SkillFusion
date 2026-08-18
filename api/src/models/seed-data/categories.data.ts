import type { Prisma } from '../../../prisma/generated';

export const categoriesData: Prisma.CategoryCreateManyInput[] = [
    {
        name: 'Menuiserie',
        description: 'Travail du bois, assemblage et finition.',
        borderColor: '#C0DD97',
        textColor: '#27500A',
        backgroundColor: '#EAF3DE',
    },
    {
        name: 'Plomberie',
        description: "Installations d'eau, robinetterie et évacuation.",
        borderColor: '#B5D4F4',
        textColor: '#1D4E89',
        backgroundColor: '#EBF2FA',
    },
    {
        name: 'Electricité',
        description: 'Montage de circuits, interrupteurs et prises.',
        borderColor: '#FAC775',
        textColor: '#BA7517',
        backgroundColor: '#FEF5E7',
    },
    {
        name: 'Chauffage',
        description: 'Entretien, purge et installation de radiateurs.',
        borderColor: '#D7BDE2',
        textColor: '#7D3C98',
        backgroundColor: '#F4ECF7',
    },
    {
        name: 'Carrelage',
        description: 'Pose de carrelage, joints et préparation des surfaces.',
        borderColor: '#F1948A',
        textColor: '#A93226',
        backgroundColor: '#FDEDEC',
    },
    {
        name: 'Peinture',
        description: 'Préparation des murs, choix de couleurs et application.',
        borderColor: '#D6D3D1',
        textColor: '#57534E',
        backgroundColor: '#F5F5F4',
    },
];
