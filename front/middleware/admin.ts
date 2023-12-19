export default defineNuxtRouteMiddleware(() => {
  const { hasRoles } = useHasRoles()

  if (!hasRoles(['admin']))
    return navigateTo('/')
})
