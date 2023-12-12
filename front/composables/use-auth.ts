import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import type { Router } from 'vue-router'
import { useRouter } from 'vue-router'
import { $fetch } from "~/composables/use-fetch";
import type { AfterFetchContext, OnFetchErrorContext } from '@vueuse/core'

export interface User {
    id: string
    email: string
    username: string
    avatar: string
    created_at: string
    roles: Role[]
}

export interface Role {
    name: string
    key: string
}

export function useAuth() {
    const router: Router = useRouter()
    const token = useCookie('crypto-token')
    const user = useState<User | null>('user')

    const login = () => {
        const errorMessage: Ref<string> = ref<string>('')

        const { data, statusCode, isFetching, post } = $fetch('users/login', {
            method: 'POST',
        }, {
            immediate: false,
            onFetchError: ({ data }: OnFetchErrorContext<any>): any => {
                errorMessage.value = data?.message || 'Une erreur est survenue'
            },
            async afterFetch({ data }: AfterFetchContext<{ token: string, user: User}>): Promise<any> {
                if (data?.token) {
                    errorMessage.value = ''
                    user.value = data.user
                    token.value = data.token
                    await router.push({ name: 'index' })
                }
            },
        }).json()

        return { data,isFetching, statusCode, post, errorMessage }
    }

    const register = () => {
        const errorMessage: Ref<string> = ref<string>('')

        const { post } = $fetch('users/register', {
            method: 'POST',
        }, {
            immediate: false,
            onFetchError: ({ data }: OnFetchErrorContext<any>): any => {
                errorMessage.value = data?.message || 'Une erreur est survenue'
            },
            async afterFetch(ctx: AfterFetchContext<any>): Promise<any> {
                if (ctx?.data) {
                    errorMessage.value = ''
                    await router.push({ name: 'login' })
                }
            },
        }).json()

        return { errorMessage, post }
    }

    const logout = async (): Promise<void> => {
        await $fetch('users/logout', {
            method: 'POST',
        })

        user.value = null
        token.value = null
    }

    const whoami = async (): Promise<void> => {
        if (!token.value)
            return

        await $fetch<User>('users/profile', {
            method: 'GET',
        }, {
            afterFetch({ data }: AfterFetchContext<User>): any {
                if (data) {
                    user.value = data
                }
            }
        }).json()
    }

    const isLogged: ComputedRef<boolean> = computed(() => !!user.value)
    const isUnauthenticated: ComputedRef<boolean> = computed(() => !isLogged.value)

    return {
        user,
        logout,
        register,
        login,
        isLogged,
        isUnauthenticated,
        whoami,
    }
}
