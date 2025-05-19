// server/utils/mailer.ts
import nodemailer from "nodemailer";

const runtimeConfig = useRuntimeConfig();

const transporter = nodemailer.createTransport({
  host: runtimeConfig.mailHost,
  port: Number(runtimeConfig.mailPort || 587),
  secure: runtimeConfig.mailSecure,
  auth: {
    user: runtimeConfig.mailUsername,
    pass: runtimeConfig.mailPassword,
  },
});

export function getMailFrom() {
  return `"${runtimeConfig.mailFromName}" <${runtimeConfig.mailUsername}>`;
}

export function sendResetPasswordEmail(to: string, token: string) {
  const link = `${runtimeConfig.appUrl}/auth/reset-password?token=${token}`;

  return transporter.sendMail({
    from: getMailFrom(),
    to,
    subject: "Reset Password",
    html: `<p>Klik link ini untuk reset password:</p><p><a href="${link}">${link}</a></p>`,
  });
}

export function sendEmailVerificationEmail(to: string, token: string) {
  const link = `${runtimeConfig.appUrl}/api/verify-email?token=${token}`;

  return transporter.sendMail({
    from: getMailFrom(),
    to,
    subject: "Verifikasi Email",
    html: `<p>Klik link ini untuk verifikasi email:</p><p><a href="${link}">${link}</a></p>`,
  });
}
