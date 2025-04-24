// server/api/auth/forgot-password.ts
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  if (!email) {
    return createError({
      statusCode: 400,
      statusMessage: "Email is required",
    });
  }

  // Cari user dengan email tsb
  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  });

  if (!user) {
    return {
      data: false,
      message: "User not found",
    };
  }

  // send email verification
  const token = sign({
    id: user.id,
    // 1 minute
    expires: Date.now() + 60 * 1000, // 1 minute
  });

  await sendEmailVerificationEmail(user.email, token);

  return {
    data: true,
    message: "Verification email sent",
  };
});
