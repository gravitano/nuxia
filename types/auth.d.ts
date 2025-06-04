// auth.d.ts
declare module '#auth-utils' {
  interface User {
    // Add your own fields
    id: number
    name: string
    email: string
  }

  interface UserSession {
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
    apiToken: string
  }
}

export {}
