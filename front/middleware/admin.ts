export default defineNuxtRouteMiddleware((to, from) => {
  const { hasRoles } = useHasRoles()

  if (!hasRoles(['admin']))
    return navigateTo('/')
})
