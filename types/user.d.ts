export {}

declare global {
    interface UserObj {
        name?: string
        email: string
        role: "user" | "admin" | "dev"
    }
}
