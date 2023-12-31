import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import type { Router } from 'vue-router'
import { useRouter } from 'vue-router'
import type { AfterFetchContext, OnFetchErrorContext } from '@vueuse/core'
import { useCookie } from '#app'
import { $fetch } from '~/composables/use-fetch'
import type { CookieRef } from '#app'

export interface User {
  id: string
  email: string
  username: string
  avatar: string
  created_at: string
  roles: Role[]
  is_blocked: boolean
  providers: Provider[]
}

export interface Provider {
  id: string
  provider: string
  created_at: string
}

export interface Role {
  name: string
  key: string
}

export function useAuth() {
  const router: Router = useRouter()
  const token: CookieRef<string | null | undefined> = useCookie('crypto-token', { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) })
  const user = useState<User | null>('user')

  const authPrefix: string = '/users/'

  const whoami = async (): Promise<void> => {
    if (!token.value)
      return

    $fetch<User>(`${authPrefix}profile`, {
      method: 'GET',
    }, {
      async afterFetch({ data }: AfterFetchContext<User>): Promise<any> {
        if (data)
          user.value = data
      },
    }).json()
  }

  const setUser = async (tokenFromString: string): Promise<void> => {
    token.value = tokenFromString
    await whoami()
  }

  const login = () => {
    const errorMessage: Ref<string> = ref<string>('')

    const { data, statusCode, isFetching, post } = $fetch(`${authPrefix}login`, {
      method: 'POST',
    }, {
      immediate: false,
      onFetchError: ({ data }: OnFetchErrorContext<any>): any => {
        errorMessage.value = data?.message || 'Une erreur est survenue'
      },
      async afterFetch({ data }: AfterFetchContext<{ token: string, user: User }>): Promise<any> {
        if (data?.token) {
          errorMessage.value = ''
          await setUser(data.token)
          await router.push({ name: 'index' })
        }
      },
    }).json()

    return { data, isFetching, statusCode, post, errorMessage }
  }

  const register = () => {
    const errorMessage: Ref<string> = ref<string>('')

    const { post, isFetching } = $fetch(`${authPrefix}register`, {
      method: 'POST',
    }, {
      immediate: false,
      onFetchError: ({ data }: OnFetchErrorContext<any>): any => {
        errorMessage.value = data?.message || 'Une erreur est survenue'
      },
      async afterFetch({ data }: AfterFetchContext<{ token: string, user: User }>): Promise<any> {
        if (data?.token) {
          errorMessage.value = ''
          user.value = data.user
          token.value = data.token
          await router.push({ name: 'index' })
        }
      },
    }).json()

    return { errorMessage, post, isFetching }
  }

  const logout = async (): Promise<void> => {
    await $fetch(`${authPrefix}logout`, {
      method: 'POST',
    })

    user.value = null
    token.value = null
  }

  const isLogged: ComputedRef<boolean> = computed(() => !!user.value)
  const isUnauthenticated: ComputedRef<boolean> = computed(
    () => !isLogged.value,
  )

  return {
    token,
    user,
    logout,
    register,
    login,
    isLogged,
    isUnauthenticated,
    whoami,
    setUser,
  }
}
