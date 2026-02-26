import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const courses = [
        // Year I
        { title: "Introduction to Computer Science", description: "Fundamentals of programming using Java.", isMandatory: true },
        { title: "Calculus I", description: "Limits, derivatives, and integrals.", isMandatory: true },
        { title: "Linear Algebra I", description: "Vectors, matrices, and linear transformations.", isMandatory: true },
        { title: "Discrete Mathematics", description: "Logic, sets, functions, and graph theory.", isMandatory: true },
        { title: "Calculus II", description: "Advanced topics in calculus.", isMandatory: true },
        { title: "Linear Algebra II", description: "Advanced linear algebra topics.", isMandatory: true },
        { title: "Logic and Set Theory", description: "Formal logic and set theory fundamentals.", isMandatory: true },
        { title: "Data Structure", description: "Fundamental data structures and algorithms.", isMandatory: true },
        { title: "System Programming in C", description: "Low-level system programming.", isMandatory: true },
        { title: "Computer Science English Advanced 2", description: "Advanced English for CS students.", isMandatory: true },

        // Year II
        { title: "Algorithms", description: "Design and analysis of algorithms.", isMandatory: true },
        { title: "Advanced Programming", description: "Advanced programming paradigms and techniques.", isMandatory: true },
        { title: "Probability Theory", description: "Probability and statistics.", isMandatory: true },
        { title: "Operating Systems", description: "Principles of operating systems design.", isMandatory: true },
        { title: "Machine Learning from Data", description: "Introduction to machine learning algorithms.", isMandatory: true },
        { title: "Computational Models", description: "Automata theory and formal languages.", isMandatory: true },
        { title: "Microeconomics", description: "Principles of microeconomics.", isMandatory: true },
        { title: "Finance Fundamentals", description: "Basic concepts of finance.", isMandatory: true },
        { title: "Digital Architectures", description: "Computer architecture and organization.", isMandatory: true },
        { title: "Digital systems", description: "Design of digital logic circuits.", isMandatory: true },

        // Year III
        { title: "Computer Networks", description: "Principles of computer networking.", isMandatory: true },
        { title: "Complexity Theory", description: "Computational complexity classes.", isMandatory: true },
        { title: "Computer Graphics", description: "Fundamentals of 2D and 3D graphics.", isMandatory: true },
        { title: "Presentation Skills", description: "Effective communication and presentation.", isMandatory: true },
        { title: "Functional & Logic Programming", description: "Functional and declarative programming paradigms.", isMandatory: true },

        // additional electives
        { title: "Advanced Machine Learning", description: "Deep dive into ML algorithms.", isMandatory: false, tags: ["Elective","E","A","ML"] },
        { title: "Reinforcement Learning", description: "Agents that learn by interacting with environments.", isMandatory: false, tags: ["Elective","E","B","ML"] },
        { title: "Cryptography", description: "Encryption, decryption and security protocols.", isMandatory: false, tags: ["Elective","A"] },
        { title: "Data Streaming and Online Learning", description: "Real-time data processing techniques.", isMandatory: false, tags: ["Elective","B","ML"] },
        { title: "Natural Language Processing", description: "Computational treatment of human language.", isMandatory: false, tags: ["Elective","E","B","ML"] },
        { title: "Software Engineering using Desing Patterns", description: "", isMandatory: false, tags: ["Elective","E","A"] },
        { title: "Artificial intelligence and Moral", description: "", isMandatory: false, tags: ["Elective","E","A"] },
        { title: "3D Graphics and Animation with Unreal engine", description: "learn the key concepts of high end digital animation", isMandatory: false, tags: ["Elective","E","A"] },

        // Courses from computer science curriculum
        { title: "Computational Geometry", description: "Geometric algorithms and computational geometry techniques.", isMandatory: false, tags: ["Elective"] },
        { title: "Algorithms in Computational Biology", description: "Computational approaches to biological problems.", isMandatory: false, tags: ["Elective"] },
        { title: "Advanced Data Structures", description: "Advanced techniques in data structure design and analysis.", isMandatory: false, tags: ["Elective"] },
        { title: "Data Streaming Algorithms and Online Learning", description: "Algorithms for streaming data and online learning systems.", isMandatory: false, tags: ["Elective","ML"] },
        { title: "Statistics and Data Analysis", description: "Statistical methods and data analysis techniques.", isMandatory: false, tags: ["Elective","ML"] },
        { title: "Recommendation Systems", description: "Personalized recommendation algorithms and systems.", isMandatory: false, tags: ["Elective","ML"] },
        { title: "Reinforcement Learning", description: "Learning through interaction with environments.", isMandatory: false, tags: ["Elective","ML"] },
        { title: "Introduction to Speech Recognition", description: "Fundamentals of automatic speech recognition technology.", isMandatory: false, tags: ["Elective"] },
        { title: "The Art of Rhetoric in the Hi-Tech World", description: "Effective communication and rhetoric in technology contexts.", isMandatory: false, tags: ["Elective"] },
        { title: "Attacks on Secure Implementations", description: "Security vulnerabilities and attacks in cryptographic implementations.", isMandatory: false, tags: ["Elective"] },
        { title: "Applied Methods in Computer Science", description: "Practical application of computational methods.", isMandatory: false, tags: ["Elective"] },
        { title: "Intelligent Autonomous Agents: Design and Implementation", description: "Design and implementation of autonomous intelligent agents.", isMandatory: false, tags: ["Elective"] }

        
    ]   

    // Delete all existing courses since we removed the code field
    await prisma.review.deleteMany({})
    await prisma.course.deleteMany({})

    for (const c of courses) {
        await prisma.course.create({
            data: c,
        })
    }

    console.log("Seeding complete.")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
