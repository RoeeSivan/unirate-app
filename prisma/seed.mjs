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
        { title: "Cryptography", description: "Encryption, decryption and security protocols.", isMandatory: false, tags: ["Elective","E","A"],semester:"A",year:3 },
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
        { title: "Blockchains and Cryptocurrencies", description: "Traditional currency systems rely on a state, bank or other institution to control and guarantee their value. Bitcoin is the first of a new form of digital currency: “crypto-currencies”. Using the “magic” of cryptography, crypto-currencies can be entirely decentralized—they work even though no single entity controls them. The technology underlying crypto-currencies—the blockchain—is a rapidly developing area of research, both in theory and in practice. The subject of this course will be the computer-science behind blockchains and crypto-currencies, with a focus on some of the cryptographic technologies they use. We will not assume prior cryptographic knowledge (although it will help), but students should be familiar with the basics of probability and linear algebra, and comfortable programming in some high-level language (most of the hands-on exercises will be in Python).", isMandatory: false, tags: ["Elective","E","B"],semester:"B" ,year:3},
        {title:"Text Retreival and Search Engines",description:"Text Retreival and Search Engines",isMandatory:false,tags: ["Elective","A"],semester:"A" ,year:3},
        {title:"Introduction to Quantum Computing",description:"No prior background in physics or quantum mechanics is required. In the course, we will learn the ׳rules of the game׳ of quantum computing, learn about interesting applications such as teleportation, dense coding, and quantum cryptography, try to understand what the advantages of quantum computing over classical computing could be, and learn the best-known quantum algorithms: Grover's algorithm for searching an unsorted array, and Shor's algorithm for factoring numbers in polynomial time. Finally, we will learn about quantum error correction and dealing with noise on the way to creating useful quantum computers on large scales.",isMandatory:false,tags: ["Elective","A"],semester:"A" ,year:3},
        {title:"Advanced Systems Development Using AI",description:"Advanced systems development leveraging AI tools and techniques for building modern applications.",isMandatory:false,tags: ["Elective","E","A"],semester:"A" ,year:3},
        {title:"Information Theory",description:"An introductory class to information theory and the mathematical theory of communication. Information theory deals with the fundamental limits of data representation, compression, and transmission. Explore entropy, coding theory, channel capacity, error correction, and their practical applications in fields such as telecommunications, data compression, cryptography, and machine learning.",isMandatory:false,tags: ["Elective","E","A"],semester:"A" ,year:3},
        {title:"Introduction to Bioinformatics",description:"An introductory course to bioinformatics combining computer science and biology. Topics include sequence analysis, genome assembly, phylogenetics, protein structure prediction, and computational approaches to biological problems.",isMandatory:false,tags: ["Elective","E","B"],semester:"B" ,year:3},
        {title:"Advanced Topics in Computer Systems Security",description:"The goal of computer systems security is to ensure that our computer systems are reliable and safe, taking into account that they often face an adversarial environment. We need to protect our systems not just from random errors and inadvertant bugs, but also against actively malicious actors. In this course, we will study the fundamentals of computer systems security from both a theoretical and a practical standpoint. We will approach the subject from two angles: security analysis (attacking systems) and secure systems construction (defending systems).",isMandatory:false,tags: ["Elective","E","B"],semester:"B" ,year:3},
        {title:"Using AI for Malware and Intrusion Detection",description:"This course covers the application of artificial intelligence techniques for detecting malware and network intrusions. Students will learn to apply machine learning and deep learning methods to cybersecurity challenges.",isMandatory:false,tags: ["Elective","E","B"],semester:"B" ,year:3},

        // Entrepreneurship electives
        {title:"Entrepreneurship, Creativity and Innovation - From 0 to 1",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},
        {title:"Research Methods for Entrepreneurs",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},
        {title:"Entrepreneurship and Innovation within Organization",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},
        {title:"Practical Tools and Strategies for Entrepreneurs",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},
        {title:"Digital Marketing for Entrepreneurs",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},
        {title:"Legal and Tax Aspects of Entrepreneurial Ventures",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},
        {title:"UX/UI and Prototyping",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},
        {title:"Product Management",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},
        {title:"Accounting & Finance Fundamentals for Entrepreneurs",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},
        {title:"AI Tools for Entrepreneurs",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},
        {title:"Human Capital in Ventures and Innovative Organizations",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},
        {title:"Decision Making in Entrepreneurship",description:"",isMandatory:false,tags: ["Elective","Entrepreneurship"],year:3},

        // Vertical Courses (Year 2)
        {title:"Real Estate Entrepreneurship",description:"Proptech innovations and real estate investment fundamentals with financial analysis tools. Covers real estate technology, market analysis, and investment strategies.",isMandatory:false,tags:["Vertical"],year:2,semester:"A"},
        {title:"Consumer Products Entrepreneurship",description:"Focuses on physical, tangible products — items we can physically hold in our hands — rather than purely digital offerings. Covers product development, manufacturing, supply chain, and go-to-market strategies.",isMandatory:false,tags:["Vertical"],year:2,semester:"A"},
        {title:"Fintech Entrepreneurship",description:"Technology-driven financial services and enabling technologies for finance sector innovation. Explores blockchain, data science, and fintech business models.",isMandatory:false,tags:["Vertical"],year:2,semester:"A"},
        {title:"Medical Entrepreneurship and BioTech",description:"Healthcare innovation including regulatory pathways, digital health solutions, and clinical trial requirements for medical startups.",isMandatory:false,tags:["Vertical"],year:2,semester:"A"},
        {title:"Sport Tech and Wellness Entrepreneurship",description:"Sports technology evolution and innovation within global athletic organizations and startup contexts. Covers wearables, analytics, and wellness industry trends.",isMandatory:false,tags:["Vertical"],year:2,semester:"A"},
        {title:"FashionTech Entrepreneurship",description:"How technology revolutionizes fashion manufacturing and retail, an industry valued at approximately 2.4 trillion dollars globally.",isMandatory:false,tags:["Vertical"],year:2,semester:"A"},
        {title:"Internet, E-commerce, New Media & Social Entrepreneurship",description:"Digital venture launching including mobile internet trends, IoT emerging markets, social media platforms, and e-commerce business models.",isMandatory:false,tags:["Vertical"],year:2,semester:"A"},
        {title:"Cannabis Tech",description:"The cannabis industry value chain from cultivation through pharmaceutical applications, using Israel as a primary case study.",isMandatory:false,tags:["Vertical"],year:2,semester:"A"},
        {title:"Cyber and Software Solutions Entrepreneurship",description:"Computing security challenges and enterprise software development. Covers Israel's cybersecurity industry and SaaS business models.",isMandatory:false,tags:["Vertical"],year:2,semester:"A"},
        {title:"Founding and Managing Accelerators and VC Funds",description:"Venture capital mechanics including valuations, term sheets, due diligence, and exit strategies.",isMandatory:false,tags:["Vertical"],year:2,semester:"B"},
        {title:"Impact Entrepreneurship",description:"Socially-conscious ventures aligned with green economy transformation and measurable positive social outcomes.",isMandatory:false,tags:["Vertical"],year:2,semester:"B"},
        {title:"Org Innovation w/Digitization, AI & Robotics",description:"Business simulations and industry leader interaction to develop digital transformation competencies using AI and robotics.",isMandatory:false,tags:["Vertical"],year:2,semester:"B"},
        {title:"The Playtika Gaming Vertical",description:"Gaming ecosystem structure, business models, and gaming venture development. In collaboration with Playtika.",isMandatory:false,tags:["Vertical"],year:2,semester:"B"},
        {title:"Cross Vertical Acceleration",description:"Early-stage venture development supporting preparation for the third-year acceleration program.",isMandatory:false,tags:["Vertical"],year:2,semester:"B"},
        {title:"Power and Influence in Entrepreneurship",description:"Influence dynamics through case studies, negotiation techniques, and stakeholder relationship building.",isMandatory:false,tags:["Vertical"],year:2,semester:"B"},
        {title:"GreenTech Entrepreneurship",description:"Transforms environmental challenges into startup opportunities, emphasizing sustainability assessment tools.",isMandatory:false,tags:["Vertical"],year:2,semester:"B"},
        {title:"Psychology of Language in Innovation and Entrepreneurship",description:"Narrative building, persuasive communication, and linguistic strategies for entrepreneurial success.",isMandatory:false,tags:["Vertical"],year:2,semester:"B"},

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
