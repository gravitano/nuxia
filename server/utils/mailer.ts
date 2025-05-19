// server/utils/mailer.ts
import { render } from "@vue-email/render";
import nodemailer from "nodemailer";
import ResetPasswordEmail from "../emails/ResetPasswordEmail.vue";
import EmailVerificationEmail from "../emails/EmailVerificationEmail.vue";

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

export async function sendResetPasswordEmail(to: string, token: string) {
  const link = `${runtimeConfig.appUrl}/auth/reset-password?token=${token}`;
  const html = await render(
    ResetPasswordEmail,
    {
      name: "User",
      resetUrl: link,
    },
    {
      pretty: true,
    }
  );

  return transporter.sendMail({
    from: getMailFrom(),
    to,
    subject: "Reset Password",
    html,
  });
}

export async function sendEmailVerificationEmail(to: string, token: string) {
  const link = `${runtimeConfig.appUrl}/api/verify-email?token=${token}`;
  const html = await render(
    EmailVerificationEmail,
    {
      name: "User",
      verifyUrl: link,
    },
    {
      pretty: true,
    }
  );
  
  return transporter.sendMail({
    from: getMailFrom(),
    to,
    subject: "Verifikasi Email",
    html,
  });
}
