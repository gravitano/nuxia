import { defineQueue } from '#processor'

type SendConfirmationEmailName = 'send-confirmation-email'
interface SendConfirmationEmailData { email: string, token: string }
interface SendConfirmationEmailResult { processedAt: number }

export default defineQueue<SendConfirmationEmailData, SendConfirmationEmailResult, SendConfirmationEmailName>({
  name: 'send-confirmation-email',
  options: {},
})
