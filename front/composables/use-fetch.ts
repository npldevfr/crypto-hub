import { createFetch } from '@vueuse/core'

export const $fetch = createFetch({
  baseUrl: 'http://localhost:3333/api',
  fetchOptions: {
    credentials: 'include',
  },
  options: {
    async beforeFetch({ options }): Promise<{ options: RequestInit }> {
      const token = useCookie('crypto-token')

      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      }

      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`,
        }
      }

      return { options }
    },
  },
})
