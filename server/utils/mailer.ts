/* eslint-disable no-console */
// server/utils/mailer.ts
import { render } from '@vue-email/render'
import { Resend } from 'resend'
import EmailVerificationEmail from '../emails/EmailVerificationEmail.vue'
import ResetPasswordEmail from '../emails/ResetPasswordEmail.vue'

const runtimeConfig = useRuntimeConfig()

const resend = new Resend(runtimeConfig.resendApiKey)

export function getMailFrom() {
  return `${runtimeConfig.mailFromName} <${runtimeConfig.mailFromEmail}>`
}

export async function sendResetPasswordEmail(to: string, token: string) {
  const link = `${runtimeConfig.appUrl}/auth/reset-password?token=${token}`
  const html = await render(
    ResetPasswordEmail,
    {
      name: 'User',
      resetUrl: link,
    },
    {
      pretty: true,
    },
  )

  try {
    await resend.emails.send({
      from: getMailFrom(),
      to,
      subject: 'Reset Password',
      html,
    })
    console.log('Reset password email sent successfully')
  }
  catch (error) {
    console.error('Error sending reset password email:', error)
  }
}

export async function sendEmailVerificationEmail(to: string, token: string) {
  const link = `${runtimeConfig.appUrl}/api/verify-email?token=${token}`
  const html = await render(
    EmailVerificationEmail,
    {
      name: 'User',
      verifyUrl: link,
    },
    {
      pretty: true,
    },
  )

  try {
    await resend.emails.send({
      from: getMailFrom(),
      to,
      subject: 'Verifikasi Email',
      html,
    })
    console.log('Email verification email sent successfully')
  }
  catch (error) {
    console.error('Error sending email verification email:', error)
  }
}
