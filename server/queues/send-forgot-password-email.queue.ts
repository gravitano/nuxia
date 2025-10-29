import { defineQueue } from '#processor'

type SendForgotPasswordEmailName = 'send-forgot-password-email'
interface SendForgotPasswordEmailData { email: string, token: string }
interface SendForgotPasswordEmailResult { processedAt: number }

export default defineQueue<SendForgotPasswordEmailData, SendForgotPasswordEmailResult, SendForgotPasswordEmailName>({
  name: 'send-forgot-password-email',
  options: {},
})
