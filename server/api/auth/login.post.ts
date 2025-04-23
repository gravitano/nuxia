export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const user = {
    id: 1,
    name: "John Doe",
    email,
  };

  await setUserSession(event, {
    user,
    // Private data accessible only on server/ routes
    secure: {
      apiToken: "1234567890",
    },
    // Any extra fields for the session data
    loggedInAt: new Date(),
  });

  return {
    data: {
      user,
      access_token: "dummy_token_123456",
    },
  };
});
