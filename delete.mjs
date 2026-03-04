import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("connecting to neon database");

  const courseTitle = "Introduction to Microeconomics";

  try {
    const deletedCourse = await prisma.course.delete({
      where: {
        title: courseTitle,
      },
    });

    console.log("the course was deleted successfully");
    console.log(deletedCourse);
  } catch (error) {
    console.error("there was an error during deletion");
    console.error(error.message);
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});