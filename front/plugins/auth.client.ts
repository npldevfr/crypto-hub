export default defineNuxtPlugin(async () => {
    const { user, whoami } = useAuth()

    // Skip if already initialized on server
    if (user.value !== undefined)
        return

    await whoami()
})
