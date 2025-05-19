import { users } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const token = query.token as string;

  const payload = verify(token);

  if (!payload || payload.expires < Date.now()) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid or expired token",
      })
    );
  }

  await db
    .update(users)
    .set({
      emailVerifiedAt: new Date(),
    })
    .where(eq(users.id, payload.id));

  return sendRedirect(event, "/auth/login?verified=true");
});
