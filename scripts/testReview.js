import { FormData } from 'formdata-node'
import { addReviewAction } from '../src/lib/actions'

async function run() {
    // mimic a logged in session: we can't easily set cookie-based session here,
    // so getSession() will return null and action will respond with Unauthorized.
    // To fully test, we'd need to temporarily stub getSession, but we can at least
    // see whether missing rating/courseId triggers validation or an exception.

    const form = new FormData()
    form.append('courseId', 'some-id')
    form.append('rating', 'NaN')

    try {
        const res = await addReviewAction(form)
        console.log('action response', res)
    } catch (err) {
        console.error('action threw', err)
    }
}

run()
    .catch(console.error)
    .finally(() => process.exit())
