import argon2 from "argon2";

import { prisma } from "./client_seeding";

async function seed() {

  const roles = await prisma.role.createMany({
    data: [{name:"student"},{name:"instructor"},{name:"admin"}]
  })

  console.log("Start seeding ->")
  const users = await prisma.user.createMany({
    data: [{
      email: "test@test.test",
      firstname: 'test',
      lastname: "test",
      pseudo: "admin",
      password: await argon2.hash("test"),
      roleId: 3,
      verified: true
    }, {
      email: "samed@celik.oclock",  
      pseudo: "TheKingOfLyon",
      password: await argon2.hash("samed"),
      roleId: 1,
      verified: true
    },
    {
      email: "jacques@suchamplecheval.oclock",
      pseudo: "President",
      password: await argon2.hash("jacques"),
      roleId: 1,
      verified: true

    },
    {
      email: "loic@leger.oclock",
      pseudo: "GifMaster",
      password: await argon2.hash("loic"),
      roleId: 2,
      verified: true
    },
    {
      email: "adrien@poncet.oclock",
      pseudo: "DreadMaster",
      password: await argon2.hash("adrien"),
      roleId: 2,
      verified: true
    },]
  });
  console.log("User : ", users.count)




  const categories = await prisma.category.createMany({
    data: [{
      name: "Menuiserie",
      description: "Travail du bois",
      borderColor: '#22c55e',
      textColor: '#15803d'
    },
    {
      name: "Plomberie",
      description: "Anti fuite",
      borderColor: '#3b82f6',
      textColor: '#1d4ed8'
    }]
  });
  console.log("Categories : ", categories.count)



  const learningObjectives = await prisma.learningObjective.createMany({
    data: [{
      title: "Couper l'arrivée d'eau en sécurité",
    },
    {
      title: "Démonter l\'ancien robinet",
    },
    {
      title: "Raccorder les flexibles",
    },
    {
      title: "Tester et contrôler les fuites",
    }
    ]
  });
  console.log("Objectif pedagogique : ", learningObjectives.count)



  const tools = await prisma.tool.createMany({
    data: [{
      name: "Clé à molette"
    },
    {
      name: "Téflon"
    },
    {
      name: "Flexibles"
    },
    {
      name: "Coupelle"
    }
    ]
  });
  console.log("Outils : ", tools.count)


  const courses = await prisma.cours.createMany({
    data: [
      {
        title: "Installer un robinet mitigeur",
        slug:"installer-un-robinet-mitigeur",
        littleSummary: "Apprenez à démonter et installer un robinet mitigeur. Raccordements, coupure d'eau, mise en service.",
        summary: "Dans ce cours, vous apprendrez à démonter un ancien robinet mitigeur et à installer un nouveau modèle. Nous verrons les différents types de raccordements, comment couper l'eau, préparer les arrivées et sécuriser l'installation avant la mise en service. Ce cours est adapté aux débutants complets. Aucune connaissance préalable en plomberie n'est nécessaire.",
        difficulty: 2,
        authorId: 4,
        categoryId: 2,
        numberPage:2
      },
      {
        title: "Installer un deuxieme robinet mitigeur",
        slug: "installer-un-deuxieme-robinet-mitigeur",
        littleSummary: "Apprenez à démonter et installer un robinet mitigeur. Raccordements, coupure d'eau, mise en service.",
        summary: "Dans ce cours, vous apprendrez à démonter un ancien robinet mitigeur et à installer un nouveau modèle. Nous verrons les différents types de raccordements, comment couper l'eau, préparer les arrivées et sécuriser l'installation avant la mise en service. Ce cours est adapté aux débutants complets. Aucune connaissance préalable en plomberie n'est nécessaire.",
        difficulty: 3,
        authorId: 5,
        categoryId: 2,
        numberPage:2
      },
      {
        title: "Installer une poigner de porte",
        slug: "installer-une-poigner-de-porte",
        littleSummary: "Changer une poignée de porte est une tâche simple et rapide.",
        summary: "Changer une poignée de porte est une tâche simple et rapide qui ne nécessite que quelques outils de base. Ce cours vous guide tout au long du processus",
        difficulty: 4,
        authorId: 5,
        categoryId: 1,
        numberPage:3
      }
    ]
  });
  console.log("Cours : ", courses.count)

  await prisma.coursHasTool.createMany({
    data: [
      { coursId: 1, toolsId: 1 },
      { coursId: 1, toolsId: 2 },
      { coursId: 1, toolsId: 3 },
      { coursId: 1, toolsId: 4 },]
  })

  await prisma.coursHasLearningObjective.createMany({
    data: [
      { coursId: 1, learningObjectiveId: 1 },
      { coursId: 1, learningObjectiveId: 2 },
      { coursId: 1, learningObjectiveId: 3 },
      { coursId: 1, learningObjectiveId: 4 },]
  })


  const coursContents = await prisma.courContent.createMany({
    data: [{
      content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
      numberPage: 1,
      coursId: 1
    },
    {
      content: "aliquip ex ea consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad min veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
      numberPage: 2,
      coursId: 1
    },
    {
      content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
      numberPage: 1,
      coursId: 2
    },
    {
      content: "aliquip ex ea consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad min veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
      numberPage: 2,
      coursId: 2
    },
    {
      content: " 1. Retirer l’ancienne poignée\
                Commence par dévisser les vis visibles sur la poignée(souvent sur la plaque ou la rosace).\
                Tire doucement pour séparer les deux côtés de la poignée.",
      numberPage: 1,
      coursId: 3
    },
    {
      content: "2. Enlever le carré (axe)\
                Une fois les poignées retirées, enlève la tige métallique (le carré) qui relie les deux côtés.",
      numberPage: 2,
      coursId: 3
    },
    {
      content: "3. Démonter le mécanisme (si nécessaire)\
                  Si tu changes aussi le mécanisme (le loquet), dévisse la plaque sur le chant de la porte et retire le système.",
      numberPage: 3,
      coursId: 3
    }]
  });

  console.log("Contenus : ", coursContents.count)

  const avis = await prisma.opinion.createMany({
    data: [{
      userId: 2,
      coursId: 1,
      note: 5,
      content: "C'est génial"
    }, {
      userId: 3,
      coursId: 1,
      note: 0,
      content: "C'est nul"
    }]
  })
  console.log("Avis :", avis.count)

  const comments = await prisma.comment.create({
    data: {
      description:"aaaa",
      authorId:1,
      coursId:1
    }
  })
console.log("Commentaires :", comments)

  console.log("Termined")
}

seed()

