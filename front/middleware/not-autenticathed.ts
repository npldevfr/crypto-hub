export default defineNuxtRouteMiddleware(() => {
  const { isLogged } = useAuth()
  const router = useRouter()

  if (isLogged.value)
    return router.push({ name: 'index' })
})
