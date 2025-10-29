import type { H3Event } from 'h3'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { H3Adapter } from '@bull-board/h3'
import sendConfirmationEmailQueue from '../queues/send-confirmation-email.queue'
import sendForgotPasswordEmailQueue from '../queues/send-forgot-password-email.queue'

const serverHandler = new H3Adapter()
serverHandler.setBasePath('/bull-board')

createBullBoard({
  queues: [
    new BullMQAdapter(sendConfirmationEmailQueue),
    new BullMQAdapter(sendForgotPasswordEmailQueue),
  ],
  serverAdapter: serverHandler,
})

const uiHandler = serverHandler.registerHandlers()

export async function redirectToBullboard(event: H3Event) {
  return await uiHandler.handler(event)
}
