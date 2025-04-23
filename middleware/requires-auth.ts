export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useUserSession();

  console.log("Middleware: requires-auth");
  console.log("Logged in:", loggedIn.value);
  console.log("User:", user.value);

  if (!loggedIn.value) {
    return navigateTo("/auth/login");
  }
});
