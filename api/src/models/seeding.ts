import { prisma } from "./client";

async function seed() {
  console.log("Start seeding ->")
  await prisma.user.create({
    data: {
      email: "test@test.test",
      firstname: 'test',
      lastname: "test",
      password: "test",
      role:2
    }
  });

  await prisma.category.create({
    data: {
      name: "Test"
    }
  });

  await prisma.learningObjective.create({
    data: {
      title: "objectifTest",
      description: "test"
    }
  });

  await prisma.tool.create({
    data: {
      name: "outilTest",
      description: "test"
    }
  });

  

  await prisma.cours.create({
    data: {
      title: "courTest",
      littleSummary: 'testTestTest',
      summary: "test",
      difficulty: 0,
      author: {connect: { id: 1 } },
      content: { connect: { id: 1 } },
      category: { connect: { id: 1 } },
      learningObjectives: { connect: {id: 1} },
      tools: { connect: {id: 1} }  
    }
  });
  await prisma.courContent.create({
    data: {
      content: 'test',
      numberPage: 1,
      cours:{connect:{id:1}}
    }
  });
}

seed()

console.log("Termined")