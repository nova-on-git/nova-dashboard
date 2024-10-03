export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.server) return

    const user = await $CurrentUser.asyncGet()

    if (!user) {
        console.log("User not found")
    }

    let role = user.role

    if (role != "admin" && role != "dev") {
        return navigateTo("/auth/login")
    }
})
