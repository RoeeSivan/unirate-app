import { FormData } from 'formdata-node'
import { addReviewAction } from '../src/lib/actions.ts'

async function run() {
    const form = new FormData()

    // missing session scenario
    form.append('courseId', 'fake-id')
    form.append('rating', '0')

    // cast to any because the server action expects the built-in DOM FormData
    const res = await addReviewAction(form as any)
    console.log('result with invalid rating & no session', res)
}

run().catch(err => {
    console.error('caught error', err)
})
