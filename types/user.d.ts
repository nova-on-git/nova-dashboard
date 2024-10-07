export {}

declare global {
    type UserRole =  "user" | "admin" | "dev"
    interface SiteAccess {
        domain: string,
        role: UserRole
    }

    interface UserObj {
        uid: string
        displayName?: string
        email: string
        siteAccess?: SiteAccess[]
        role?: UserRole
    }
}
