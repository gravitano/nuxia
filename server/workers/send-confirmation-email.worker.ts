import { defineWorker } from '#processor'

type SendResetPasswordEmailName = 'send-reset-password-email'
interface SendResetPasswordEmailData { email: string, token: string }
interface SendResetPasswordEmailResult { processedAt: number }

export default defineWorker<SendResetPasswordEmailName, SendResetPasswordEmailData, SendResetPasswordEmailResult>({
  name: 'send-reset-password-email',
  async processor(job) {
    const { email, token } = job.data
    await sendResetPasswordEmail(email, token)

    return {
      processedAt: Date.now(),
    }
  },
  options: {},
})
