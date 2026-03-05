import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

    const { error } = await resend.emails.send({
        from: 'Uni-Rate <noreply@uni-rate.com>',
        to: email,
        subject: 'Verify your Uni-Rate account',
        html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 2rem;">
                <h2 style="color: #6366f1;">Welcome to Uni-Rate 👋</h2>
                <p>Click the button below to verify your email and activate your account.</p>
                <a href="${verifyUrl}" style="display:inline-block;margin-top:1rem;padding:0.75rem 1.5rem;background:#6366f1;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">
                    Verify Email
                </a>
                <p style="margin-top:1.5rem;color:#888;font-size:0.875rem;">
                    This link expires in 24 hours. If you didn't register, you can ignore this email.
                </p>
            </div>
        `,
    })
    if (error) throw new Error(error.message)
}
