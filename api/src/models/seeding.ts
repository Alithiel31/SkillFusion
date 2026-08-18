import { prisma } from './client_seeding';
import { rolesData } from './seed-data/roles.data';
import { usersData } from './seed-data/users.data';
import { categoriesData } from './seed-data/categories.data';
import { learningObjectivesData } from './seed-data/learning-objectives.data';
import { toolsData } from './seed-data/tools.data';
import { coursesData } from './seed-data/courses.data';
import { coursHasToolData } from './seed-data/cours-has-tool.data';
import { coursHasLearningObjectiveData } from './seed-data/cours-has-learning-objective.data';
import { coursContentsData } from './seed-data/cours-contents.data';
import { opinionsData } from './seed-data/opinions.data';
import { commentsData } from './seed-data/comments.data';
import { badgesData } from './seed-data/badges.data';
import { userHasBadgeData } from './seed-data/user-has-badge.data';

async function seed() {
    const existing = await prisma.role.findFirst();
    if (existing) {
        console.log('Base de données déjà peuplée — seeding ignoré.');
        await prisma.$disconnect();
        return;
    }

    console.log('Start seeding ->');

    const roles = await prisma.role.createMany({ data: rolesData });
    console.log('Users :', roles.count);

    const users = await prisma.user.createMany({ data: usersData });
    console.log('Users :', users.count);

    const categories = await prisma.category.createMany({ data: categoriesData });
    console.log('Categories :', categories.count);

    const learningObjectives = await prisma.learningObjective.createMany({
        data: learningObjectivesData,
    });
    console.log('LearningObjectives :', learningObjectives.count);

    const tools = await prisma.tool.createMany({ data: toolsData });
    console.log('Tools :', tools.count);

    const courses = await prisma.cours.createMany({ data: coursesData });
    console.log('Courses :', courses.count);

    // Liens outils et objectifs pour chaque cours (simplifié pour l'exemple)
    await prisma.coursHasTool.createMany({ data: coursHasToolData });

    await prisma.coursHasLearningObjective.createMany({ data: coursHasLearningObjectiveData });

    // Contenus pour chaque cours (4 pages chacun en Markdown)
    const coursContents = await prisma.coursContent.createMany({ data: coursContentsData });
    console.log('Contenus :', coursContents.count);

    // Opinions (notes des cours)
    const avis = await prisma.opinion.createMany({ data: opinionsData });
    console.log('Avis :', avis.count);

    // Commentaires (questions sur les cours)
    const comments = await prisma.comment.createMany({ data: commentsData });
    console.log('Commentaires :', comments.count);

    const badges = await prisma.badge.createMany({ data: badgesData });
    console.log('Badges :', badges.count);

    const asignedBadges = await prisma.userHasBadge.createMany({ data: userHasBadgeData });
    console.log('Badges assigned:', asignedBadges.count);

    console.log('Termined');
}

seed();
