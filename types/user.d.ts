export {}

declare global {
    type UserRole = "user" | "admin" | "dev" | "client"
    interface SiteAccess {
        domain: string
        role: UserRole
    }

    interface UserProfile {
        uid: string
        displayName?: string
        email: string
        siteAccess: SiteAccess[]
    }
}
