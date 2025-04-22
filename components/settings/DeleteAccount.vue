<script setup lang="ts"></script>

<template>
  <div class="grid gap-4">
    <header>
      <h3 class="mb-0.5 text-base font-medium">Delete account</h3>
      <p class="text-sm text-muted-foreground">
        Delete your account and all of its resources
      </p>
    </header>

    <Alert variant="error">
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Please proceed with caution. This action cannot be undone.

        <SettingsDeleteAccountDialog />
      </AlertDescription>
    </Alert>
  </div>
</template>
