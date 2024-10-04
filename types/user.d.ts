export {}

declare global {
    interface UserObj {
        name?: string
        email: string
        role: "user" | "admin" | "dev"
    }

    interface UserProfile {
        uid: string
        email: string
        siteAccess: siteAccess[]
    }

    interface SiteAccess {
        domain: string
        role: "user" | "admin" | "dev"
    }
}
