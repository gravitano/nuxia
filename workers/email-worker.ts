export function sendResetPasswordEmailWorker(email: string, token: string) {
  sendResetPasswordEmail(email, token)
}

export function sendEmailVerificationEmailWorker(to: string, token: string) {
  sendEmailVerificationEmail(to, token)
}
