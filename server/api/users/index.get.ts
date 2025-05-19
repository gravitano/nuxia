import { users } from "~~/server/database/schema";

export default defineEventHandler(async () => {
  const result = await db.select().from(users);
  return result;
});
