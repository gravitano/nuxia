import { defineEventHandler, readBody } from "h3";
import { z } from "zod";
import { users } from "~/server/database/schema";

// Validasi input pakai Zod
const updateProfileSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
});

export default defineEventHandler(async (event) => {
  // make sure the user is logged in
  // This will throw a 401 error if the request doesn't come from a valid user session
  const { user } = await requireUserSession(event);

  // Parse the request body
  const result = await readValidatedBody(event, updateProfileSchema.safeParse);

  if (!result.success) {
    return createError({
      statusCode: 422,
      statusMessage: "Validation Error",
      data: result.error.flatten(),
    });
  }

  const { name, email } = result.data;

  await db
    .update(users)
    .set({
      name,
      email,
    })
    .where(eq(users.id, user.id));

  return {
    message: "Profile updated successfully",
  };
});
