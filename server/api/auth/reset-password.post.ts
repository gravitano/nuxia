import { z } from "zod";
import { randomBytes } from "crypto"; // Untuk token reset password
import { passwordResetTokens, users } from "~/server/database/schema";
import { resetPasswordSchema } from "~/shared/shemas/reset-password";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Parse the body with Zod
  const result = resetPasswordSchema.safeParse(body);
  if (!result.success) {
    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage: "Validation error",
        data: result.error,
      })
    );
  }

  const { email, new_password: password } = result.data;

  // Cek apakah user ada di database
  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  });

  if (!user) {
    return sendError(
      event,
      createError({ statusCode: 404, statusMessage: "User not found" })
    );
  }

  // Menggenerate token reset password yang aman
  const resetToken = randomBytes(32).toString("hex");

  // Menyimpan token reset password (bisa dihapus setelah token digunakan)
  await db.insert(passwordResetTokens).values({
    email,
    token: resetToken,
  });

  // Hash password baru menggunakan bcrypt
  const hashedPassword = await hashPassword(password);

  // Update password user di database
  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.email, email));

  return {
    message: "Password reset successfully",
    data: user,
  };
});
