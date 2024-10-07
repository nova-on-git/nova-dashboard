export {}

declare global {
    type UserRole =  "user" | "admin" | "dev"
    interface SiteAccess {
        domain: string,
        role: UserRole
    }

    interface UserObj {
        displayName?: string
        email: string
        siteAccess: SiteAccess[]
    }
}
