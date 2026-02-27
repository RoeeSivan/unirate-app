import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const courses = [
        // Year I
        { title: "Introduction to Computer Science", description: "Fundamentals of programming using Java.", isMandatory: true, year: 1, semester: "A" },
        { title: "Calculus I", description: "Limits, derivatives, and integrals.", isMandatory: true, year: 1, semester: "A" },
        { title: "Linear Algebra I", description: "Vectors, matrices, and linear transformations.", isMandatory: true, year: 1, semester: "A" },
        { title: "Discrete Mathematics", description: "Logic, sets, functions, and graph theory.", isMandatory: true, year: 1, semester: "A" },
        { title: "Calculus II", description: "Advanced topics in calculus.", isMandatory: true, year: 1, semester: "B" },
        { title: "Linear Algebra II", description: "Advanced linear algebra topics.", isMandatory: true, year: 1, semester: "B" },
        { title: "Logic and Set Theory", description: "Formal logic and set theory fundamentals.", isMandatory: true, year: 1, semester: "B" },
        { title: "Data Structures", description: "Fundamental data structures and algorithms.", isMandatory: true, year: 1, semester: "B" },
        { title: "System Programming in C", description: "Low-level system programming.", isMandatory: true, year: 1, semester: "B" },
        { title: "Computer Science English Advanced 2", description: "Advanced English for CS students.", isMandatory: true, year: 1, semester: "B" },

        // Year II
        { title: "Algorithms", description: "Design and analysis of algorithms.", isMandatory: true, year: 2, semester: "A" },
        { title: "Advanced Programming", description: "Advanced programming paradigms and techniques.", isMandatory: true, year: 2, semester: "A" },
        { title: "Probability Theory", description: "Probability and statistics.", isMandatory: true, year: 2, semester: "A" },
        { title: "Operating Systems", description: "Principles of operating systems design.", isMandatory: true, year: 2, semester: "A" },
        { title: "Machine Learning from Data", description: "Introduction to machine learning algorithms.", isMandatory: true, year: 2, semester: "B" },
        { title: "Computational Models", description: "Automata theory and formal languages.", isMandatory: true, year: 2, semester: "B" },
        { title: "Microeconomics", description: "Principles of microeconomics.", isMandatory: true, year: 2, semester: "B" },
        { title: "Finance Fundamentals", description: "Basic concepts of finance.", isMandatory: true, year: 2, semester: "B" },
        { title: "Digital Architectures", description: "Computer architecture and organization.", isMandatory: true, year: 2, semester: "B" },
        { title: "Digital systems", description: "Design of digital logic circuits.", isMandatory: true, year: 2, semester: "B" },

        // Year III
        { title: "Computer Networks", description: "Principles of computer networking.", isMandatory: true, year: 3, semester: "A" },
        { title: "Complexity Theory", description: "Computational complexity classes.", isMandatory: true, year: 3, semester: "A" },
        { title: "Computer Graphics", description: "Fundamentals of 2D and 3D graphics.", isMandatory: true, year: 3, semester: "A" },
        { title: "Presentation Skills", description: "Effective communication and presentation.", isMandatory: true, year: 3, semester: "B" },
        { title: "Functional & Logic Programming", description: "Functional and declarative programming paradigms.", isMandatory: true, year: 3, semester: "B" },

        // additional electives
        { title: "Advanced Machine Learning", description: "Deep dive into ML algorithms.", isMandatory: false,year:3, tags: ["Elective","E","A","ML"] ,semester:"A"},
        { title: "Reinforcement Learning", description: "Agents that learn by interacting with environments.", isMandatory: false,year:3, tags: ["Elective","E","B","ML"],semester:"A" },
        { title: "Cryptography", description: "Encryption, decryption and security protocols.", isMandatory: false, tags: ["Elective","A"],semester:"A",year:3 },
        { title: "Data Streaming and Online Learning", description: "Real-time data processing techniques.", isMandatory: false, tags: ["Elective","B","ML"],semester:"A",year:3 },
        { title: "Natural Language Processing", description: "Computational treatment of human language.", isMandatory: false, tags: ["Elective","E","B","ML"] ,semester:"B",year:3},
        { title: "Artificial intelligence and Moral", description: "", isMandatory: false, tags: ["Elective","E","A"] ,semester:"A",year:2},
        { title: "3D Graphics and Animation with Unreal engine", description: "learn the key concepts of high end digital animation", isMandatory: false, tags: ["Elective","E","A"],semester:"A",year:2 },

        // Courses from computer science curriculum
        { title: "Computational Geometry", description: "Geometric algorithms and computational geometry techniques.", isMandatory: false, tags: ["Elective"] ,semester:"A",year:3},
        { title: "Algorithms in Computational Biology", description: "Computational approaches to biological problems.", isMandatory: false, tags: ["Elective"] ,semester:"A",year:3},
        { title: "Advanced Data Structures", description: "Advanced techniques in data structure design and analysis.", isMandatory: false, tags: ["Elective"] ,semester:"A",year:3},
        { title: "Statistics and Data Analysis", description: "Statistical methods and data analysis techniques.", isMandatory: false, tags: ["Elective","ML"] ,semester:"A"},
        { title: "Recommendation Systems", description: "Personalized recommendation algorithms and systems.", isMandatory: false, tags: ["Elective","ML"],semester:"A",year:3 },
        { title: "Introduction to Speech Recognition", description: "Fundamentals of automatic speech recognition technology.", isMandatory: false, tags: ["Elective"],semester:"A" ,year:3},
        { title: "The Art of Rhetoric in the Hi-Tech World", description: "Effective communication and rhetoric in technology contexts.", isMandatory: false, tags: ["Elective"],semester:"A" ,year:3},
        { title: "Attacks on Secure Implementations", description: "Security vulnerabilities and attacks in cryptographic implementations.", isMandatory: false, tags: ["Elective"],semester:"A" ,year:3},
        { title: "Applied Methods in Computer Science", description: "Practical application of computational methods.", isMandatory: false, tags: ["Elective"] ,semester:"A",year:3},
        { title: "Intelligent Autonomous Agents: Design and Implementation", description: "Design and implementation of autonomous intelligent agents.", isMandatory: false, tags: ["Elective"],semester:"A" ,year:3},
        {title:"Introdcution to Image Processing and Analysis",description:"Introdcution to Image Processing and Analysis",isMandatory:false,tags: ["Elective"],semester:"A" ,year:3},
        {title:"Text Retreival and Search Engines",description:"Text Retreival and Search Engines",isMandatory:false,tags: ["Elective"],semester:"A" ,year:3},
         {title:"Cloud Computing and Software Engineering",description:"Cloud Computing and Software Engineering",isMandatory:false,tags: ["Elective"],semester:"A" ,year:3}      
    ]          
    

    // The previous version wiped the whole database, which also removed
    // user reviews whenever the seed script ran. To preserve existing
    // feedback we switch to upsert - it creates a course if it doesn't exist
    // or updates its fields otherwise, leaving all related reviews untouched.
    // We no longer clear the reviews table.

    for (const c of courses) {
        await prisma.course.upsert({
            where: { title: c.title },
            update: {
                description: c.description,
                isMandatory: c.isMandatory,
                tags: c.tags || [],
                year: c.year || null,
                semester: c.semester || null,
            },
            create: c,
        })
    }

    console.log("Seeding complete.")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
