import { prisma } from "./client";

async function main() {
  await prisma.user.create({
    data: {
      email: "test@test.test",
      nom: 'test',
      prenom: "test",
      mot_de_passe: "test",
      role: "ADMIN"
    }
  });

  await prisma.categories.create({
    data: {
      nom: "Test"
    }
  });

  await prisma.objectif_Pedagogique.create({
    data: {
      titre: "objectifTest",
      description: "test"
    }
  });

  await prisma.outils.create({
    data: {
      nom: "outilTest",
      description: "test"
    }
  });

  await prisma.cour_content.create({
    data: {
      contenu: 'test',
      numeros_page: 1,
    }
  });

  await prisma.cours.create({
    data: {
      titre: "courTest",
      phrase_resume: 'testTestTest',
      resume: "test",
      difficulte: "DEBUTANT",
      createur: {connect: { id: 1 } },
      outils: { connect: { id: 1 } },
      categories: { connect: { id: 1 } },
      objectifs: { connect: { id: 1 } },
      contenu: { connect: { id: 1 } }
    }
  });

  

  
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });