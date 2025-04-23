// server/utils/mailer.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT || 587),
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USERNAME!,
    pass: process.env.MAIL_PASSWORD!,
  },
});

export function sendResetPasswordEmail(to: string, token: string) {
  const link = `http://localhost:3000/auth/reset-password?token=${token}`;

  return transporter.sendMail({
    from: '"Sekolah Vue" <no-reply@sekolahvue.com>',
    to,
    subject: "Reset Password",
    html: `<p>Klik link ini untuk reset password:</p><p><a href="${link}">${link}</a></p>`,
  });
}

export function sendEmailVerificationEmail(to: string, token: string) {
  const link = `http://localhost:3000/api/verify-email?token=${token}`;

  return transporter.sendMail({
    from: '"Sekolah Vue" <no-reply@sekolahvue.com>',
    to,
    subject: "Verifikasi Email",
    html: `<p>Klik link ini untuk verifikasi email:</p><p><a href="${link}">${link}</a></p>`,
  });
}
