export default defineNuxtRouteMiddleware((to, from) => {
  const { isLogged } = useAuth()
  const router = useRouter()

  if (isLogged.value)
    return router.push({ name: 'index' })
})
