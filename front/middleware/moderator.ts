export default defineNuxtRouteMiddleware((to, from) => {
    const { hasRoles } = useHasRoles()

    if (!hasRoles(['moderator'])) {
        return navigateTo('/')
    }
})
