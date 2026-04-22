import { prisma } from "./client";

async function seed() {
  console.log("Start seeding ->")
  const users = await prisma.user.create({
    data: {
      email: "test@test.test",
      firstname: 'test',
      lastname: "test",
      password: "test",
      role:2
    }
  });
  console.log(users)

  const categories = await prisma.category.create({
    data: {
      name: "Test"
    }
  });
  console.log(categories)

  const learningObjectives = await prisma.learningObjective.create({
    data: {
      title: "objectifTest",
      description: "test"
    }
  });

  console.log(learningObjectives)

  const tools = await prisma.tool.create({
    data: {
      name: "outilTest",
      description: "test"
    }
  });
  console.log(tools)
  

  const courses = await prisma.cours.create({
    data: {
      title: "courTest",
      littleSummary: 'testTestTest',
      summary: "test",
      difficulty: 0,
      author: {connect: { id: users.id } },
      tools: {
      create: [
        {
          tools: { connect: { id: tools.id } }
        }
      ]
    },

    learningObjectives: {
      create: [
        {
          objectif: { connect: { id: learningObjectives.id } }
        }
      ]
    },
      category: { connect: { id: categories.id } }
    }
  });
  console.log(courses)

  const coursContents = await prisma.courContent.create({
    data: {
      content: 'test',
      numberPage: 1,
      cours:{connect:{id:1}}
    }
  });

  console.log(coursContents)


  console.log("Termined")
}

seed()

