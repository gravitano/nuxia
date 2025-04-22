2<script setup lang="ts"></script>

<template>
  <form class="w-full max-w-sm">
    <Card>
      <CardHeader>
        <CardTitle class="text-2xl"> Forgot Password </CardTitle>
        <CardDescription>
          Enter your email below to reset your password
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
          <Button type="submit" class="w-full"> 
            Send password reset link  
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Or, return to
          <NuxtLink to="/auth/login" class="underline"> Sign in </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>
