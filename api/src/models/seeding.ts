import argon2 from "argon2";

import { prisma } from "./client_seeding";

async function seed() {

  const roles = await prisma.role.createMany({
    data: [{name:"student",frName:'Etudiant'},{name:"instructor",frName:'Formateur'},{name:"admin",frName:'Administrateur'}]
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
      borderColor: '#C0DD97',
      textColor: '#27500A',
      backgroundColor: "#EAF3DE"
    },
    {
      name: "Plomberie",
      description: "Anti fuite",
      borderColor: '#B5D4F4',
      textColor: '#1D4E89',
      backgroundColor: "#EBF2FA"
    },
    {
      name: "Electricité",
      description: "Etre au courant",
      borderColor: '#FAC775',
      textColor: '#BA7517',
      backgroundColor: "#FEF5E7"
    },
    {
      name: "Chauffage",
      description: "Anti Froid",
      borderColor: '#D7BDE2',
      textColor: '#7D3C98',
      backgroundColor: "#F4ECF7"
    },
    {
      name: "Carrelage",
      description: "Mettre un habillage sur le mur",
      borderColor: '#F1948A',
      textColor: '#A93226',
      backgroundColor: "#FDEDEC"
    },
    {
      name: "Peinture",
      description: "Picasso de la maison ",
      borderColor: '#D6D3D1',
      textColor: '#57534E',
      backgroundColor: "#F5F5F4"
    },
  ]
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
      content: "# Introduction\n\nDécouvrez les bases de l'installation d'un robinet mitigeur. Ce guide vous accompagnera pas à pas dans le processus de remplacement de votre ancien robinet.",
      numberPage: 1,
      coursId: 1
    },
    {
      content: "# Étape 1 : Préparation\n\nAvant de commencer, assurez-vous de couper l'arrivée d'eau principale et de préparer tous les outils nécessaires pour une installation sécurisée.",
      numberPage: 2,
      coursId: 1
    },
    {
      content: "# Introduction\n\nApprenez à installer un deuxième robinet mitigeur dans votre cuisine ou salle de bain. Suivez ces étapes pour une installation réussie.",
      numberPage: 1,
      coursId: 2
    },
    {
      content: "# Étape 1 : Préparation avancée\n\nPour une installation de niveau intermédiaire, commencez par vérifier la compatibilité des raccordements existants avec le nouveau robinet.",
      numberPage: 2,
      coursId: 2
    },
    {
      content: "# Étape 1 : Retirer l'ancienne poignée\n\nCommencez par dévisser les vis visibles sur la poignée, souvent situées sur la plaque ou la rosace. Tirez doucement pour séparer les deux côtés de la poignée.",
      numberPage: 1,
      coursId: 3
    },
    {
      content: "# Étape 2 : Enlever le carré\n\nUne fois les poignées retirées, retirez la tige métallique appelée carré qui relie les deux côtés de la porte.",
      numberPage: 2,
      coursId: 3
    },
    {
      content: "# Étape 3 : Démonter le mécanisme\n\nSi vous changez également le mécanisme de verrouillage, dévissez la plaque sur le chant de la porte et retirez le système complet.",
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

