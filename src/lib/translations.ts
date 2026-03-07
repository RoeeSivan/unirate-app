export type Lang = 'en' | 'he'

const translations = {
  // Navbar
  signOut: { en: 'Sign Out', he: 'התנתקות' },
  signIn: { en: 'Sign In', he: 'התחברות' },
  hey: { en: 'Hey', he: 'היי' },

  // Hero
  heroTitle1: { en: 'Discover the Best ', he: 'גלו את הקורסים ' },
  heroTitleHighlight: { en: 'Courses', he: 'הטובים ביותר' },
  heroSubtitle: {
    en: 'Real ratings and test tips from your peers at the university. Make informed decisions for your next semester. For more precise information about the courses, you should search the',
    he: 'דירוגים אמיתיים וטיפים למבחנים מעמיתים שלכם באוניברסיטה. קבלו החלטות מושכלות לסמסטר הבא. למידע מדויק יותר על הקורסים, חפשו ב'
  },
  yedion: { en: 'Yedion', he: 'ידיעון' },

  // Features
  honestRatings: { en: 'Honest Ratings', he: 'דירוגים כנים' },
  honestRatingsDesc: { en: 'See what students really think about the workload and difficulty.', he: 'ראו מה סטודנטים באמת חושבים על העומס והקושי.' },
  courseTips: { en: 'Course Tips', he: 'טיפים לקורס' },
  courseTipsDesc: { en: 'Get a head start with advice on assignments and lectures.', he: 'קבלו יתרון עם עצות על מטלות והרצאות.' },
  testStrategies: { en: 'Test Strategies', he: 'אסטרטגיות למבחנים' },
  testStrategiesDesc: { en: 'Learn exactly how to study for the midterm and final exams.', he: 'למדו בדיוק איך ללמוד לבחינות האמצע והסוף.' },

  // Filters
  searchCourses: { en: 'Search courses...', he: 'חיפוש קורסים...' },
  year: { en: 'Year', he: 'שנה' },
  semester: { en: 'Semester', he: 'סמסטר' },
  all: { en: 'All', he: 'הכל' },
  mandatory: { en: 'Mandatory', he: 'חובה' },
  elective: { en: 'Elective', he: 'בחירה' },
  allElectives: { en: 'All Electives', he: 'כל קורסי הבחירה' },
  theoreticalCluster: { en: 'Theoretical Cluster', he: 'אשכול עיוני' },
  resetFilters: { en: 'Reset', he: 'איפוס' },
  noCoursesFound: { en: 'No courses found matching your filters.', he: 'לא נמצאו קורסים התואמים את הסינון.' },
  moreCourses: { en: 'more courses', he: 'קורסים נוספים' },
  signInToSeeAll: { en: 'Sign in with your Reichman account to see all courses.', he: 'התחברו עם חשבון רייכמן כדי לראות את כל הקורסים.' },
  review: { en: 'review', he: 'ביקורת' },
  reviews: { en: 'reviews', he: 'ביקורות' },

  // Course page
  courseNumber: { en: 'Course Number', he: 'מספר הקורס' },
  reviewsTitle: { en: 'Reviews', he: 'ביקורות' },
  noReviewsYet: { en: 'No reviews yet. Be the first!', he: 'אין עדיין ביקורות. היו הראשונים!' },
  courseTip: { en: 'Course Tip', he: 'טיפ לקורס' },
  testTip: { en: 'Test Tip', he: 'טיפ למבחן' },
  anonymous: { en: 'Anonymous', he: 'אנונימי' },
  delete: { en: 'Delete', he: 'מחיקה' },
  deleting: { en: 'Deleting...', he: 'מוחק...' },

  // Add review form
  addYourRating: { en: 'Add Your Rating', he: 'הוסיפו דירוג' },
  overallRating: { en: 'Overall Rating', he: 'דירוג כללי' },
  courseTipOptional: { en: 'Course Tip (Optional)', he: 'טיפ לקורס (אופציונלי)' },
  courseTipPlaceholder: { en: 'What should students know about the lectures, assignments, etc.?', he: 'מה כדאי לסטודנטים לדעת על ההרצאות, המטלות וכו\'?' },
  testTipOptional: { en: 'Test Tip (Optional)', he: 'טיפ למבחן (אופציונלי)' },
  testTipPlaceholder: { en: 'How should someone study for the exams?', he: 'איך כדאי ללמוד למבחנים?' },
  yearTaken: { en: 'Year Taken', he: 'שנה שנלקח' },
  selectYear: { en: 'Select year', he: 'בחרו שנה' },
  postAnonymously: { en: 'Post anonymously', he: 'פרסום אנונימי' },
  submitRating: { en: 'Submit Rating', he: 'שלחו דירוג' },
  submitting: { en: 'Submitting...', he: 'שולח...' },
  pleaseSelectRating: { en: 'Please select a rating', he: 'אנא בחרו דירוג' },

  // Login
  signInTitle: { en: 'Sign In', he: 'התחברות' },
  useReichmanAccount: { en: 'Use your Reichman university account.', he: 'השתמשו בחשבון אימייל של רייכמן שלכם.' },
  username: { en: 'Username', he: 'שם משתמש' },
  sendingLink: { en: 'Sending link...', he: 'שולח קישור...' },
  checkInbox: { en: 'Check your inbox', he: ' בדקו את תיבת הדואר ' },
  checkInboxDesc: { en: 'We sent a sign-in link to your Reichman email. Click it and you\'ll be signed in automatically, in the meantime, close this tab.', he: 'שלחנו קישור התחברות למייל של רייכמן . לחצו עליו ותתחברו אוטומטית, בינתיים סגרו את הטאב.' },
  waitingForVerification: { en: 'Waiting for verification...', he: 'ממתין לאימות...' },
  linkExpired: {
    en: 'This link has expired or already been used. Enter your username to get a new one.',
    he: 'הקישור פג תוקף או כבר נעשה בו שימוש. הזינו את שם המשתמש לקבלת קישור חדש.'
  },

  // Verify email
  signInToUniRate: { en: 'Sign in to Uni-Rate', he: 'התחברות ל-Uni-Rate' },
  completeSignIn: { en: 'Complete Sign In', he: 'השלמת התחברות' },
  completeSignInDesc: { en: 'Click the button below to complete your sign-in.', he: 'לחצו על הכפתור למטה להשלמת ההתחברות.' },

  // Review sidebar
  wantToAddReview: { en: 'Want to add a review?', he: 'רוצים להוסיף ביקורת?' },
  signInToReview: { en: 'Sign in with your university email to share your experience.', he: 'התחברו עם המייל האוניברסיטאי כדי לשתף את החוויה שלכם.' },
} as const

export type TranslationKey = keyof typeof translations

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key][lang]
}

export default translations
