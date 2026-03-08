import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const electiveHebrew: Record<string, { titleHe: string; descriptionHe: string }> = {
  'Functional & Logic Programming': {
    titleHe: 'תכנות פונקציונלי ולוגי',
    descriptionHe: 'הקורס מציג פרדיגמות תכנות שונות מהתכנות הפרוצדורלי המוכר. תכנות פונקציונלי בשפת Haskell ותכנות לוגי בשפת Prolog.',
  },
  'Advanced Machine Learning': {
    titleHe: 'למידה חישובית מתקדמת',
    descriptionHe: 'למידה חישובית הוא התחום במדעי המחשב העוסק בבניית מערכות שמשתפרות באופן אוטומטי עם ניסיון. הקורס מכסה נושאים מתקדמים כגון למידה עמוקה, שיטות אנסמבל, ולמידה לא מפוקחת.',
  },
  'Reinforcement Learning': {
    titleHe: 'למידה באמצעות חיזוקים',
    descriptionHe: 'הקורס עוסק בלמידה באמצעות חיזוקים, תחום בבינה מלאכותית שבו סוכן לומד לקבל החלטות מיטביות על ידי אינטראקציה עם סביבה. תהליכי החלטה מרקוביאניים, אלגוריתמי Q-learning ו-Policy Gradient.',
  },
  'Cryptography': {
    titleHe: 'קריפטוגרפיה',
    descriptionHe: 'קריפטוגרפיה היא המדע העוסק באבטחת מידע. הקורס מכסה הצפנה סימטרית ואסימטרית, פונקציות גיבוב, חתימות דיגיטליות, פרוטוקולים קריפטוגרפיים והוכחות אפס-ידע.',
  },
  'Data Streaming and Online Learning': {
    titleHe: 'אלגוריתמים לניתוח זרם נתונים ולמידה מקוונת',
    descriptionHe: 'הקורס עוסק בעיבוד כמויות גדולות של נתונים בזמן אמת. אלגוריתמים יעילים לסיכום וניתוח זרמי נתונים, מבני נתונים הסתברותיים, ולמידה מקוונת.',
  },
  'Data Streaming Algorithms and Online Learning': {
    titleHe: 'אלגוריתמים לניתוח זרם נתונים ולמידה מקוונת',
    descriptionHe: 'הקורס עוסק בעיבוד כמויות גדולות של נתונים בזמן אמת. אלגוריתמים יעילים לסיכום וניתוח זרמי נתונים, מבני נתונים הסתברותיים, ולמידה מקוונת.',
  },
  'Computational Geometry': {
    titleHe: 'גיאומטריה חישובית',
    descriptionHe: 'הקורס עוסק באלגוריתמים לפתרון בעיות גיאומטריות. מעטפות קמורות, דיאגרמות ורונוי, טריאנגולציות דלוני, חיפוש טווח וחיתוך קטעים.',
  },
  'Algorithms in Computational Biology': {
    titleHe: 'אלגוריתמים בביולוגיה חישובית',
    descriptionHe: 'הקורס עוסק באלגוריתמים לפתרון בעיות ביולוגיות. יישור רצפים, בניית עצים פילוגנטיים, ניתוח מבנה חלבונים, וגנומיקה חישובית.',
  },
  'Advanced Data Structures': {
    titleHe: 'מבני נתונים מתקדמים',
    descriptionHe: 'קורס תאורטי המכסה נושאים נבחרים במבני נתונים מתקדמים. עצי AVL, עצי B, עצי ספליי, ערימות פיבונאצ\'י, מבני נתונים פרסיסטנטיים ומבני נתונים מרוכזים.',
  },
  'Statistics and Data Analysis': {
    titleHe: 'סטטיסטיקה ועיבוד נתונים',
    descriptionHe: 'סטטיסטיקה הוא הענף המדעי העוסק בניתוח יעיל של נתונים. הסקה סטטיסטית, בדיקות השערות, רגרסיה לינארית, ניתוח שונות ושיטות לא-פרמטריות.',
  },
  'Recommendation Systems': {
    titleHe: 'מערכות המלצה',
    descriptionHe: 'הקורס עוסק בתכנון ובניית מערכות המלצה. סינון שיתופי, סינון מבוסס תוכן, שיטות היברידיות, פקטוריזציה של מטריצות ולמידה עמוקה למערכות המלצה.',
  },
  'Introduction to Speech Recognition': {
    titleHe: 'מבוא לזיהוי דיבור',
    descriptionHe: 'הקורס מקנה יסודות בעיבוד אותות דיבור וזיהוי דיבור אוטומטי. מודלים אקוסטיים, מודלי שפה, מודלים מרקוביאניים חבויים ורשתות נוירונים לזיהוי דיבור.',
  },
  'The Art of Rhetoric in the Hi-Tech World': {
    titleHe: 'אמנות הרטוריקה בעולם ההייטק',
    descriptionHe: 'הקורס מפתח כישורי תקשורת ונאום בהקשר של עולם ההייטק. הצגת רעיונות, שכנוע, מצגות מקצועיות ותקשורת אפקטיבית בסביבה טכנולוגית.',
  },
  'Attacks on Secure Implementations': {
    titleHe: 'תקיפות על מימושים מאובטחים',
    descriptionHe: 'הקורס יסקור נושאים שונים באבטחת מחשבים ורשתות. התקפות ערוץ צדדי, ניתוח זמן ריצה, התקפות הזרקת שגיאות, והגנות מפני תקיפות על מימושים קריפטוגרפיים.',
  },
  'Applied Methods in Computer Science': {
    titleHe: 'שיטות יישומיות במדעי המחשב',
    descriptionHe: 'הקורס מציג שיטות יישומיות ופרקטיות במדעי המחשב. כלים ושיטות לפתרון בעיות מעשיות, אופטימיזציה, סימולציה ומודלים חישוביים.',
  },
  'Intelligent Autonomous Agents: Design and Implementation': {
    titleHe: 'סוכנים אוטונומיים חכמים: תכנון ומימוש',
    descriptionHe: 'הקורס עוסק בתכנון ומימוש של סוכנים אוטונומיים חכמים. ארכיטקטורות סוכנים, קבלת החלטות, תכנון, למידה ושיתוף פעולה במערכות רב-סוכניות.',
  },
  'Natural Language Processing': {
    titleHe: 'עיבוד שפה טבעית',
    descriptionHe: 'תחום מחקר הנקרא בלשנות חישובית. הקורס מכסה ניתוח טקסט, סיווג מסמכים, זיהוי ישויות, תרגום מכונה, ומודלי שפה מבוססי רשתות נוירונים.',
  },
  'Software Engineering using Desing Patterns': {
    titleHe: 'הנדסת תוכנה בעזרת Design Patterns',
    descriptionHe: 'הקורס יסקור מספר בעיות תוכנה קלאסיות ואת הפתרונות שלהן באמצעות דפוסי עיצוב. דפוסי יצירה, מבנה והתנהגות, עקרונות SOLID ותכנון מונחה עצמים.',
  },
  'Computer Graphics': {
    titleHe: 'גרפיקה ממוחשבת',
    descriptionHe: 'הקורס מקנה יסודות בגרפיקה ממוחשבת. טרנספורמציות גיאומטריות, רסטריזציה, הצללה, מיפוי טקסטורות, עקומות ומשטחים, ורינדור בזמן אמת.',
  },
  'Blockchains and Cryptocurrencies': {
    titleHe: 'בלוקצ\'יין ומטבעות קריפטוגרפיים',
    descriptionHe: 'הקורס עוסק בטכנולוגיית הבלוקצ\'יין ומטבעות קריפטוגרפיים. מנגנוני קונצנזוס, חוזים חכמים, ביטקוין, את\'ריום, ואפליקציות מבוזרות.',
  },
  'Text Retreival and Search Engines': {
    titleHe: 'אחזור טקסט ומנועי חיפוש',
    descriptionHe: 'הקורס עוסק בשיטות לאחזור מידע וחיפוש טקסט. מודלים לאחזור מידע, אינדוקס, דירוג תוצאות, הערכת מערכות חיפוש וחיפוש באינטרנט.',
  },
  '3D Graphics and Animation with Unreal engine': {
    titleHe: 'גרפיקה תלת-ממדית ואנימציה עם Unreal Engine',
    descriptionHe: 'הקורס מלמד פיתוח גרפיקה תלת-ממדית ואנימציה באמצעות מנוע Unreal Engine. מודלינג, תאורה, אנימציה, פיזיקה ופיתוח משחקים.',
  },
  'Introdcution to Image Processing and Analysis': {
    titleHe: 'מבוא לעיבוד וניתוח תמונה',
    descriptionHe: 'הקורס מקנה יסודות בעיבוד תמונות דיגיטליות. סינון, שיפור תמונה, זיהוי קצוות, סגמנטציה, מורפולוגיה מתמטית וייצוג תמונות.',
  },
  'Internet Technologies and Full Stack Web Development': {
    titleHe: 'טכנולוגיות אינטרנט ופיתוח פול-סטאק',
    descriptionHe: 'הקורס מלמד פיתוח אפליקציות אינטרנט מקצה לקצה. HTML, CSS, JavaScript, React, Node.js, מסדי נתונים, REST APIs ופריסת אפליקציות.',
  },
  'Native Android Development with Kotlin': {
    titleHe: 'פיתוח על אנדרואיד בשפת קוטלין',
    descriptionHe: 'הקורס מלמד פיתוח אפליקציות אנדרואיד באמצעות שפת Kotlin. ארכיטקטורת אנדרואיד, ממשק משתמש, ניהול מצב, רשת ואחסון מקומי.',
  },
  'Cyber Security and Artificial Intelligence': {
    titleHe: 'אבטחת סייבר ובינה מלאכותית',
    descriptionHe: 'הקורס משלב בין תחומי אבטחת הסייבר והבינה המלאכותית. זיהוי חדירות, ניתוח תוכנות זדוניות, למידת מכונה לאבטחה וטכניקות התקפה והגנה.',
  },
  'Object Oriented Programming with C# and .NET': {
    titleHe: 'תכנות מונחה עצמים בסביבת דוט-נט ושפת C#',
    descriptionHe: 'הקורס מחולק לשני חלקים עיקריים: לימוד שפת C# ועקרונות תכנות מונחה עצמים, ופיתוח אפליקציות בסביבת .NET.',
  },
  'Algorithmic Game Theory': {
    titleHe: 'תורת המשחקים האלגוריתמית',
    descriptionHe: 'הקורס יעסוק במושגי יסוד בתורת המשחקים מנקודת מבט אלגוריתמית. שיווי משקל נאש, מכירות פומביות, מנגנונים ומשחקים חוזרים.',
  },
  'From idea to App Using AI tools': {
    titleHe: 'מרעיון לאפליקציה בעזרת כלי AI',
    descriptionHe: 'הקורס מלמד כיצד לבנות אפליקציות באמצעות כלי בינה מלאכותית מודרניים. שימוש ב-AI לפיתוח, עיצוב, ויצירת מוצרים דיגיטליים.',
  },
  'Cloud Computing and Software Engineering': {
    titleHe: 'מחשוב ענן והנדסת תוכנה',
    descriptionHe: 'הקורס עוסק בעקרונות מחשוב הענן והנדסת תוכנה מודרנית. שירותי ענן, מיקרו-שירותים, קונטיינרים, CI/CD ופריסה אוטומטית.',
  },
  'Database Management': {
    titleHe: 'ניהול מסדי נתונים',
    descriptionHe: 'הקורס מקנה ידע בתכנון וניהול מסדי נתונים. מודל יחסי, שפת SQL, נורמליזציה, אופטימיזציה של שאילתות, טרנזקציות ומסדי נתונים מבוזרים.',
  },
  'Introduction to Statistics': {
    titleHe: 'מבוא לסטטיסטיקה',
    descriptionHe: 'הקורס מציג את יסודות הסטטיסטיקה. סטטיסטיקה תיאורית, הסקה סטטיסטית, בדיקות השערות, רווחי סמך ורגרסיה.',
  },
  'Introduction to Quantum Computing': {
    titleHe: 'מבוא לחישוב קוונטי',
    descriptionHe: 'הקורס מציג את יסודות החישוב הקוונטי. קיוביטים, שערים קוונטיים, אלגוריתם שור, אלגוריתם גרובר ויתרון קוונטי.',
  },
  'Artificial intelligence and Moral': {
    titleHe: 'בינה מלאכותית ומוסר',
    descriptionHe: 'קורס ייחודי הפתוח בפני סטודנטים למשפטים ולמדעי המחשב. שילוב בין בינה מלאכותית וסוגיות אתיות, משפטיות וחברתיות.',
  },
  'Advanced Systems Development Using AI': {
    titleHe: 'פיתוח מערכות מתקדמות מבוסס AI',
    descriptionHe: 'פיתוח מערכות מתקדמות תוך שימוש בכלים וטכניקות של בינה מלאכותית לבניית אפליקציות מודרניות.',
  },
}

async function main() {
  let updated = 0
  for (const [title, data] of Object.entries(electiveHebrew)) {
    try {
      const result = await prisma.course.updateMany({
        where: { title },
        data: { titleHe: data.titleHe, descriptionHe: data.descriptionHe },
      })
      if (result.count > 0) {
        console.log(`Updated: ${title} -> ${data.titleHe}`)
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
