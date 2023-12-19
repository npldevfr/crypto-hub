export default defineNuxtRouteMiddleware(() => {
  const { hasRoles } = useHasRoles()

  if (!hasRoles(['moderator']))
    return navigateTo('/')
})
