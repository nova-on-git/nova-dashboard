export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.server) return

    const user = await $CurrentUser.asyncGet()

    if (!user) {
        console.debug("[Veloris Auth] User not found")
    }

    if ($CurrentUser.isAdmin || $CurrentUser.role === "client") {
        navigateTo("/admin")
    } else {
        console.debug("[Veloris Auth] Insufficient permissions to enter.")
        return navigateTo("/auth/login")
    }
})
