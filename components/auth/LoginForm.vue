<script setup lang="ts"></script>

<template>
  <form class="w-full max-w-sm">
    <Card>
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <NuxtLink to="/auth/forgot-password" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </NuxtLink>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" class="w-full"> Login </Button>
          <Button type="button" variant="outline" class="w-full"> Login with Google </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/auth/register" class="underline"> Sign up </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>
