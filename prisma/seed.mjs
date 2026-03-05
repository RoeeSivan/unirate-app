import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const courses = [
        // Year I
        { title: "Introduction to Computer Science", description: "Fundamentals of programming using Java.", isMandatory: true, year: 1, semester: "A" ,tags: ["A"]},
        { title: "Calculus I", description: "Limits, derivatives, and integrals.", isMandatory: true, year: 1, semester: "A",tags: ["A"] },
        { title: "Linear Algebra I", description: "Vectors, matrices, and linear transformations.", isMandatory: true, year: 1, semester: "A",tags: ["A"] },
        { title: "Discrete Mathematics", description: "Logic, sets, functions, and graph theory.", isMandatory: true, year: 1, semester: "A",tags: ["A"] },
        { title: "Calculus II", description: "Advanced topics in calculus.", isMandatory: true, year: 1, semester: "B" ,tags: ["B"]},
        { title: "Linear Algebra II", description: "Advanced linear algebra topics.", isMandatory: true, year: 1, semester: "B",tags: ["B"] },
        { title: "Logic and Set Theory", description: "Formal logic and set theory fundamentals.", isMandatory: true, year: 1, semester: "B" ,tags: ["B"]},
        { title: "Data Structures", description: "Fundamental data structures and algorithms.", isMandatory: true, year: 1, semester: "B",tags: ["B"] },
        { title: "System Programming in C", description: "Low-level system programming.", isMandatory: true, year: 1, semester: "B",tags: ["B"] },
        { title: "Computer Science English Advanced 2", description: "Advanced English for CS students.", isMandatory: true, year: 1, semester: "B" },

        // Year II
        { title: "Algorithms", description: "Design and analysis of algorithms.", isMandatory: true, year: 2, semester: "A" ,tags: ["A"]},
        { title: "Advanced Programming", description: "Advanced programming paradigms and techniques.", isMandatory: true, year: 2, semester: "A",tags: ["A"] },
        { title: "Introduction to Probability", description: "Probability", isMandatory: true, year: 2, semester: "A",tags: ["A"] },
        { title: "Operating Systems", description: "Principles of operating systems design.", isMandatory: true, year: 2, semester: "B" ,tags: ["B"]},
        { title: "Machine Learning from Data", description: "Introduction to machine learning algorithms.", isMandatory: true, year: 2, semester: "B",tags: ["B"] },
        { title: "Computational Models", description: "Automata theory and formal languages.", isMandatory: true, year: 2, semester: "B" , tags: ["B"]},
        { title: "Fundamentals of Finance", description: "Basic concepts of finance.", isMandatory: true, year: 2, semester: "A" ,tags: ["A"]},
        { title: "Digital Architectures", description: "Computer architecture and organization.", isMandatory: true, year: 2, semester: "A" ,tags: ["A"]},
        { title: "Digital systems", description: "Design of digital logic circuits.", isMandatory: true, year: 2, semester: "A" ,tags: ["A"]},
        { title: "Object Oriented Programming with C# and .NET", description: "Object Oriented Programming with C# and .NET", isMandatory: false, year: 2, semester: "B" ,tags: ["Elective","B"]},
        { title: "Algorithmic Game Theory", description: "Algorithmic Game Theory", isMandatory: false, year: 2, semester: "B" ,tags: ["Elective","B"]},
        { title: "From idea to App Using AI tools", description: "This course is an intensive, fast-paced program designed to help students leverage Generative AI as a force multiplier in product development. By integrating AI tools into the coding, graphic design, and brainstorming processes, the goal is to move from initial idea to a market-ready application or website in record time.", isMandatory: false, year: 2, semester: "B" ,tags: ["Elective","B"]},

        // Year III
        { title: "Computer Networks", description: "Principles of computer networking.", isMandatory: true, year: 3, semester: "A",tags: ["A"] },
        { title: "Complexity Theory", description: "Computational complexity classes.", isMandatory: true, year: 3, semester: "A",tags: ["A"] },
        { title: "Computer Graphics", description: "Fundamentals of 2D and 3D graphics.", isMandatory: true, year: 3, semester: "A",tags: ["A"] },
        { title: "Presentation Skills", description: "Effective communication and presentation.", isMandatory: true, year: 3, semester: "B",tags: ["B"] },
        { title: "Functional & Logic Programming", description: "Functional and declarative programming paradigms.", isMandatory: true, year: 3, semester: "B",tags: ["B"] },

        // additional electives
        { title: "Advanced Machine Learning", description: "Deep dive into ML algorithms.", isMandatory: false,year:3, tags: ["Elective","E","A","ML"] ,semester:"A"},
        { title: "Reinforcement Learning", description: "Agents that learn by interacting with environments.", isMandatory: false,year:3, tags: ["Elective","E","B","ML"],semester:"A" },
        { title: "Cryptography", description: "Encryption, decryption and security protocols.", isMandatory: false, tags: ["Elective","A"],semester:"A",year:3 },
        { title: "Data Streaming and Online Learning", description: "Real-time data processing techniques.", isMandatory: false, tags: ["Elective","B","ML"],semester:"A",year:3 },
        { title: "Natural Language Processing", description: "Computational treatment of human language.", isMandatory: false, tags: ["Elective","E","B","ML"] ,semester:"B",year:3},
        { title: "Artificial intelligence and Moral", description: "", isMandatory: false, tags: ["Elective","E","A"] ,semester:"A",year:2},
        { title: "3D Graphics and Animation with Unreal engine", description: "learn the key concepts of high end digital animation", isMandatory: false, tags: ["Elective","E","A"],semester:"A",year:2 },

        // Courses from computer science curriculum
        { title: "Computational Geometry", description: "Geometric algorithms and computational geometry techniques.", isMandatory: false, tags: ["Elective","A"] ,semester:"A",year:3},
        { title: "Algorithms in Computational Biology", description: "Computational approaches to biological problems.", isMandatory: false, tags: ["Elective","A"] ,semester:"A",year:3},
        { title: "Advanced Data Structures", description: "Advanced techniques in data structure design and analysis.", isMandatory: false, tags: ["Elective","A"] ,semester:"A",year:3},
        { title: "Statistics and Data Analysis", description: "Statistical methods and data analysis techniques.", isMandatory: false, tags: ["Elective","ML","A"] ,semester:"A"},
        { title: "Recommendation Systems", description: "Personalized recommendation algorithms and systems.", isMandatory: false, tags: ["Elective","ML","A"],semester:"A",year:3},
        { title: "Introduction to Speech Recognition", description: "Fundamentals of automatic speech recognition technology.", isMandatory: false, tags: ["Elective","A"],semester:"A" ,year:3},
        { title: "The Art of Rhetoric in the Hi-Tech World", description: "Effective communication and rhetoric in technology contexts.", isMandatory: false, tags: ["Elective","A"],semester:"A" ,year:3},
        { title: "Attacks on Secure Implementations", description: "Security vulnerabilities and attacks in cryptographic implementations.", isMandatory: false, tags: ["Elective","A"],semester:"A" ,year:3},
        { title: "Applied Methods in Computer Science", description: "Practical application of computational methods.", isMandatory: false, tags: ["Elective","A"] ,semester:"A",year:3},
        { title: "Intelligent Autonomous Agents: Design and Implementation", description: "Design and implementation of autonomous intelligent agents.", isMandatory: false, tags: ["Elective","A"],semester:"A" ,year:3},
        {title:"Introdcution to Image Processing and Analysis",description:"Introdcution to Image Processing and Analysis",isMandatory:false,tags: ["Elective","A"],semester:"A" ,year:3},
        {title:"Text Retreival and Search Engines",description:"Text Retreival and Search Engines",isMandatory:false,tags: ["Elective","A"],semester:"A" ,year:3},
        {title:"Cloud Computing and Software Engineering",description:"Cloud Computing and Software Engineering",isMandatory:false,tags: ["Elective","A"],semester:"A" ,year:3},
        {title:"Database Management",description:"This course provides a fundamental and comprehensive understanding of database systems, ranging from the basics and core technologies to the practical implementation of databases.",isMandatory:false,tags: ["Elective","B"],semester:"B" ,year:2},
        {title:"Internet Technologies and Full Stack Web Development",description:"",isMandatory:false,tags: ["Elective","B"],semester:"B" ,year:2},
        {title:"Native Android Development with Kotlin",description:"The purpose of the course is to provide students with full native development capabilities in Android environment. ",isMandatory:false,tags: ["Elective","B"],semester:"B" ,year:2},
        {title:"Cyber Security and Artificial Intelligence",description:"Students will gain both deep technical foundations and strategic foresight, preparing them for advancedresearch and leadership roles in next-generation cyber-AI security",isMandatory:false,tags: ["Elective","B"],semester:"B" ,year:3},
        {title:"Introduction to Statistics",description:"This course provides an introduction to statistical concepts and techniques used for data analysis and inference. The course covers the following topics: Moment generating function. Important distributions - Chi square, Gamma, Beta, t, F and multivariate such as Uniform and Normal. Population and sample - the distribution of the population and the distribution of the sample, the sample mean and the sample variance, the concept of statistic, sufficient statistic, minimal sufficient statistic and complete statistic. Point estimation - the estimator and the properties of unbiasedness and consistency, risk of an estimator, Fisher's information, maximum likelihood estimators, the invariance property and their asymptotic distribution. Confidence intervals - confidence level, approximate confidence intervals and exact confidence intervals. Statistical inference - one-sided and two-sided tests, first and second type error, significance level and power, Neyman-Pearson's lemma and most powerful tests, generalized likelihood ratio tests.",isMandatory:false,tags: ["Elective","B"],semester:"B" ,year:3},
        { title: "Blockchains and Cryptocurrencies", description: "Traditional currency systems rely on a state, bank or other institution to control and guarantee their value. Bitcoin is the first of a new form of digital currency: “crypto-currencies”. Using the “magic” of cryptography, crypto-currencies can be entirely decentralized—they work even though no single entity controls them. The technology underlying crypto-currencies—the blockchain—is a rapidly developing area of research, both in theory and in practice. The subject of this course will be the computer-science behind blockchains and crypto-currencies, with a focus on some of the cryptographic technologies they use. We will not assume prior cryptographic knowledge (although it will help), but students should be familiar with the basics of probability and linear algebra, and comfortable programming in some high-level language (most of the hands-on exercises will be in Python).", isMandatory: false, tags: ["Elective","B"],semester:"B" ,year:3},
        {title:"Text Retreival and Search Engines",description:"Text Retreival and Search Engines",isMandatory:false,tags: ["Elective","A"],semester:"A" ,year:3},
        {title:"Introduction to Quantum Computing",description:"No prior background in physics or quantum mechanics is required. In the course, we will learn the ׳rules of the game׳ of quantum computing, learn about interesting applications such as teleportation, dense coding, and quantum cryptography, try to understand what the advantages of quantum computing over classical computing could be, and learn the best-known quantum algorithms: Grover's algorithm for searching an unsorted array, and Shor's algorithm for factoring numbers in polynomial time. Finally, we will learn about quantum error correction and dealing with noise on the way to creating useful quantum computers on large scales.",isMandatory:false,tags: ["Elective","A"],semester:"A" ,year:3},

כג
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
