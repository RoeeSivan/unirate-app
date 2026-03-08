import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const courseNumbers: Record<string, string> = {
  'Introduction to Computer Science': '417',
  'Discrete Mathematics': '56',
  'Calculus I': '52',
  'Linear Algebra I': '54',
  'Computer Science English Advanced 2': '110',
  'Logic and Set Theory': '69',
  'Data Structures': '59',
  'Calculus II': '53',
  'Linear Algebra II': '55',
  'System Programming in C': '3144',
  'Advanced Programming': '3030',
  'Digital Architectures': '3967',
  'Algorithms': '77',
  'Introduction to Probability': '109',
  'Microeconomics - Hebrew Track': '152',
  'Microeconomics - International Track': '152',
  'Fundamentals of Finance': '3979',
  'Operating Systems': '84',
  'Computational Models': '3699',
  'Machine Learning from Data': '3141',
  'Computer Networks': '592',
  'Complexity Theory': '3967',
  'Computer Graphics': '164',
  'Presentation Skills': '282',
  // Electives
  'Cryptography': '159',
  'Advanced Machine Learning': '3945',
  'Reinforcement Learning': '3639',
  'Advanced Data Structures': '3581',
  'Computational Geometry': '3519',
  'Algorithms in Computational Biology': '3571',
  'Natural Language Processing': '3523',
  'Blockchains and Cryptocurrencies': '3626',
  'Database Management': '3123',
  'Object Oriented Programming with C# and .NET': '3125',
  'Artificial intelligence and Moral': '3169',
  'Algorithmic Game Theory': '3987',
  'Introduction to Quantum Computing': '3983',
  'Introduction to Statistics': '3989',
  'Statistics and Data Analysis': '3620',
  'Cyber Security and Artificial Intelligence': '3664',
  'Attacks on Secure Implementations': '3682',
  'Introduction to Speech Recognition': '3669',
  'Native Android Development with Kotlin': '3695',
  'Internet Technologies and Full Stack Web Development': '3980',
  'Cloud Computing and Software Engineering': '3961',
  'Introdcution to Image Processing and Analysis': '3915',
  '3D Graphics and Animation with Unreal engine': '3354',
  'Text Retreival and Search Engines': '3959',
  'From idea to App Using AI tools': '3976',
  'Intelligent Autonomous Agents: Design and Implementation': '3904',
  'Data Streaming Algorithms and Online Learning': '3604',
  'Data Streaming and Online Learning': '3604',
  'Recommendation Systems': '3639',
  'Advanced Systems Development Using AI': '3924',
}

async function main() {
  let updated = 0
  for (const [title, courseNumber] of Object.entries(courseNumbers)) {
    try {
      const result = await prisma.course.updateMany({
        where: { title },
        data: { courseNumber },
      })
      if (result.count > 0) {
        console.log(`Updated: ${title} -> ${courseNumber}`)
        updated++
      } else {
        console.log(`Not found: ${title}`)
      }
    } catch (err) {
      console.error(`Error updating ${title}:`, err)
    }
  }
  console.log(`\nDone. Updated ${updated} courses.`)
}

main().finally(() => prisma.$disconnect())
