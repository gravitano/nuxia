import { users } from "~/server/database/schema";
import { db } from "~/server/utils/db";

export default defineEventHandler(async () => {
  const result = await db.select().from(users);
  return result;
});
