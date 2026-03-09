import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Map: course title → array of { prereq title, simultaneous? }
const prerequisiteData: Record<string, { title: string; simultaneous?: boolean }[]> = {
    // Year 1 Semester B
    'Calculus II': [
        { title: 'Calculus I' },
    ],
    'Linear Algebra II': [
        { title: 'Linear Algebra I' },
    ],
    'Data Structures': [
        { title: 'Introduction to Computer Science' },
    ],
    'Logic and Set Theory': [
        { title: 'Discrete Mathematics' },
    ],
    'System Programming in C': [
        { title: 'Introduction to Computer Science' },
        { title: 'Data Structures', simultaneous: true },
    ],

    // Year 2 Semester A
    'Algorithms': [
        { title: 'Discrete Mathematics' },
        { title: 'Data Structures' },
        { title: 'Logic and Set Theory' },
    ],
    'Introduction to Probability': [
        { title: 'Discrete Mathematics' },
        { title: 'Calculus I' },
    ],
    'Advanced Programming': [
        { title: 'Introduction to Computer Science' },
    ],
    'Digital Architectures': [
        { title: 'Introduction to Computer Science' },
        { title: 'Discrete Mathematics' },
    ],
    'Digital systems': [
        { title: 'Introduction to Computer Science' },
        { title: 'Discrete Mathematics' },
    ],

    // Year 2 Semester B
    'Operating Systems': [
        { title: 'Data Structures' },
        { title: 'Digital Architectures' },
        { title: 'System Programming in C' },
    ],
    'Machine Learning from Data': [
        { title: 'Calculus I' },
        { title: 'Calculus II' },
        { title: 'Linear Algebra I' },
        { title: 'Linear Algebra II' },
        { title: 'Introduction to Probability' },
    ],
    'Computational Models': [
        { title: 'Discrete Mathematics' },
        { title: 'Logic and Set Theory' },
        { title: 'Algorithms' },
    ],

    // Year 3
    'Computer Graphics': [
        { title: 'Algorithms' },
    ],
    'Computer Networks': [
        { title: 'Algorithms' },
        { title: 'Operating Systems' },
    ],
    'Complexity Theory': [
        { title: 'Algorithms' },
        { title: 'Computational Models' },
    ],

    // Electives
    'Cryptography': [
        { title: 'Algorithms' },
    ],
    '3D Graphics and Animation with Unreal engine': [
        { title: 'Advanced Programming' },
    ],
    'Introduction to Statistics': [
        { title: 'Introduction to Probability' },
    ],
    'Statistics and Data Analysis': [
        { title: 'Introduction to Probability' },
    ],
    'Advanced Systems Development Using AI': [
        { title: 'Advanced Programming' },
    ],
    'Text Retreival and Search Engines': [
        { title: 'Linear Algebra I' },
        { title: 'Linear Algebra II' },
        { title: 'Introduction to Probability' },
        { title: 'Introduction to Computer Science' },
        { title: 'Machine Learning from Data' },
    ],
    'Cloud Computing and Software Engineering': [
        { title: 'Advanced Programming' },
    ],
    'Natural Language Processing': [
        { title: 'Algorithms' },
        { title: 'Machine Learning from Data' },
    ],
    'Information Theory': [
        { title: 'Calculus I' },
        { title: 'Calculus II' },
        { title: 'Linear Algebra I' },
        { title: 'Linear Algebra II' },
        { title: 'Discrete Mathematics' },
        { title: 'Data Structures' },
        { title: 'Logic and Set Theory' },
        { title: 'Introduction to Probability' },
        { title: 'Introduction to Computer Science' },
    ],
    'Introduction to Bioinformatics': [
        { title: 'Calculus I' },
        { title: 'Calculus II' },
        { title: 'Linear Algebra I' },
        { title: 'Linear Algebra II' },
        { title: 'Discrete Mathematics' },
        { title: 'Data Structures' },
        { title: 'Logic and Set Theory' },
        { title: 'Introduction to Computer Science' },
    ],
    'Advanced Topics in Computer Systems Security': [
        { title: 'Calculus I' },
        { title: 'Calculus II' },
        { title: 'Linear Algebra I' },
        { title: 'Linear Algebra II' },
        { title: 'Discrete Mathematics' },
        { title: 'Data Structures' },
        { title: 'Logic and Set Theory' },
        { title: 'Operating Systems' },
        { title: 'Introduction to Computer Science' },
        { title: 'Computer Networks' },
        { title: 'Advanced Programming' },
    ],
    'Using AI for Malware and Intrusion Detection': [
        { title: 'Calculus I' },
        { title: 'Calculus II' },
        { title: 'Linear Algebra I' },
        { title: 'Linear Algebra II' },
        { title: 'Discrete Mathematics' },
        { title: 'Data Structures' },
        { title: 'Logic and Set Theory' },
        { title: 'Introduction to Computer Science' },
    ],
}

async function main() {
    // Build a lookup of title → course id
    const allCourses = await prisma.course.findMany({ select: { id: true, title: true } })
    const courseByTitle: Record<string, string> = {}
    for (const c of allCourses) {
        courseByTitle[c.title] = c.id
    }

    let created = 0
    let skipped = 0

    for (const [courseTitle, prereqs] of Object.entries(prerequisiteData)) {
        const courseId = courseByTitle[courseTitle]
        if (!courseId) {
            console.warn(`⚠ Course not found: "${courseTitle}"`)
            continue
        }

        for (const prereq of prereqs) {
            const prerequisiteId = courseByTitle[prereq.title]
            if (!prerequisiteId) {
                console.warn(`⚠ Prerequisite not found: "${prereq.title}" (for "${courseTitle}")`)
                continue
            }

            await prisma.coursePrerequisite.upsert({
                where: {
                    courseId_prerequisiteId: { courseId, prerequisiteId },
                },
                update: {
                    simultaneous: prereq.simultaneous ?? false,
                },
                create: {
                    courseId,
                    prerequisiteId,
                    simultaneous: prereq.simultaneous ?? false,
                },
            })
            created++
        }
    }

    console.log(`✅ Prerequisites seeded: ${created} links created/updated, ${skipped} skipped.`)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
