import { users } from "../database/schema";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Seed the database with initial data",
  },
  async run({ payload, context }) {
    await db.insert(users).values([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: await hashPassword("secret123"),
        emailVerifiedAt: new Date(),
      },
    ]);

    return { result: "Success" };
  },
});
