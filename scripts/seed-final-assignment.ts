import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Maps course title -> "exam" or "paper"
const finalAssignments: Record<string, "exam" | "paper"> = {
  // Year 1 mandatory
  "Calculus I": "exam",
  "Calculus II": "exam",
  "Linear Algebra I": "exam",
  "Linear Algebra II": "exam",
  "Discrete Mathematics": "exam",
  "Data Structures": "exam",
  "Logic and Set Theory": "exam",
  "Introduction to Computer Science": "exam",
  "System Programming in C": "exam",
  "Computer Science English Advanced 2": "exam",

  // Year 2 mandatory
  "Algorithms": "exam",
  "Operating Systems": "exam",
  "Introduction to Probability": "exam",
  "Microeconomics - Hebrew Track": "exam",
  "Microeconomics - International Track": "exam",
  "Advanced Programming": "exam",
  "Machine Learning from Data": "exam",
  "Computational Models": "exam",
  "Fundamentals of Finance": "exam",
  "Digital Architectures": "exam",
  "Digital systems": "exam",

  // Year 3 mandatory
  "Presentation Skills": "paper",
  "Computer Networks": "exam",
  "Complexity Theory": "exam",

  // Electives - exam
  "Computer Graphics": "exam",
  "Computer Vision": "exam",
  "Deep Learning": "exam",
  "Statistics and Data Analysis": "exam",
  "Database Management": "exam",
  "Computational Geometry": "exam",
  "Algorithms in Computational Biology": "exam",
  "Advanced Data Structures": "exam",
  "Introduction to Quantum Computing": "exam",
  "Algorithmic Game Theory": "exam",
  "Introduction to Statistics": "exam",
  "Cryptography": "exam",
  "Information Theory": "exam",

  // Electives - paper
  "Introduction to Bioinformatics": "paper",
  "Advanced Topics in Computer Systems Security": "paper",
  "Applied Methods in Computer Science": "paper",
  "Natural Language Processing": "paper",
  "Data Streaming Algorithms and Online Learning": "paper",
  "Data Streaming and Online Learning": "paper",
  "Blockchains and Cryptocurrencies": "paper",
  "Recommendation Systems": "paper",
  "Cyber Security and Artificial Intelligence": "paper",
  "Introduction to Speech Recognition": "paper",
  "Attacks on Secure Implementations": "paper",
  "Native Android Development with Kotlin": "paper",
  "Object Oriented Programming with C# and .NET": "paper",
  "Cloud Computing and Software Engineering": "paper",
  "Advanced Machine Learning": "paper",
  "Text Retreival and Search Engines": "paper",
  "Internet Technologies and Full Stack Web Development": "paper",
  "Intelligent Autonomous Agents: Design and Implementation": "paper",
  "Introdcution to Image Processing and Analysis": "paper",
  "3D Graphics and Animation with Unreal engine": "paper",
  "Artificial intelligence and Moral": "paper",
  "From idea to App Using AI tools": "paper",
  "The Art of Rhetoric in the Hi-Tech World": "paper",
  "Advanced Systems Development Using AI": "paper",
  "Using AI for Malware and Intrusion Detection": "paper",
  // Entrepreneurship
  "Entrepreneurship, Creativity and Innovation - From 0 to 1": "exam",
  "Research Methods for Entrepreneurs": "exam",
  "Entrepreneurship and Innovation within Organization": "exam",
  "Practical Tools and Strategies for Entrepreneurs": "paper",
  "Digital Marketing for Entrepreneurs": "exam",
  "Legal and Tax Aspects of Entrepreneurial Ventures": "exam",
  "UX/UI and Prototyping": "paper",
  "Product Management": "paper",
  "Accounting & Finance Fundamentals for Entrepreneurs": "exam",
  "AI Tools for Entrepreneurs": "paper",
  "Human Capital in Ventures and Innovative Organizations": "exam",
  "Decision Making in Entrepreneurship": "exam",
  // Vertical Courses
  "Real Estate Entrepreneurship": "paper",
  "Consumer Products Entrepreneurship": "paper",
  "Fintech Entrepreneurship": "paper",
  "Medical Entrepreneurship and BioTech": "exam",
  "Sport Tech and Wellness Entrepreneurship": "paper",
  "FashionTech Entrepreneurship": "paper",
  "Internet, E-commerce, New Media & Social Entrepreneurship": "paper",
  "Cannabis Tech": "paper",
  "Cyber and Software Solutions Entrepreneurship": "paper",
  "Founding and Managing Accelerators and VC Funds": "paper",
  "Impact Entrepreneurship": "paper",
  "Org Innovation w/Digitization, AI & Robotics": "paper",
  "The Playtika Gaming Vertical": "paper",
  "Cross Vertical Acceleration": "paper",
  "Power and Influence in Entrepreneurship": "exam",
  "GreenTech Entrepreneurship": "paper",
  "Psychology of Language in Innovation and Entrepreneurship": "paper",
}

async function main() {
  let updated = 0
  let notFound = 0

  for (const [title, type] of Object.entries(finalAssignments)) {
    const result = await prisma.course.updateMany({
      where: { title },
      data: { finalAssignment: type },
    })
    if (result.count > 0) {
      updated++
      console.log(`  Updated: ${title} -> ${type}`)
    } else {
      notFound++
      console.log(`  NOT FOUND: ${title}`)
    }
  }

  console.log(`\nDone: ${updated} updated, ${notFound} not found`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
