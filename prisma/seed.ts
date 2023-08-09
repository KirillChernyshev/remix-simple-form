import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.todo.deleteMany();

  const todos = [
    {
      title: "Do the demo!",
    },
    {
      title: "Don't forget to do the demo!",
    },
  ];

  for (const todo of todos) {
    await prisma.todo.upsert({
      where: { title: todo.title },
      update: todo,
      create: todo,
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
