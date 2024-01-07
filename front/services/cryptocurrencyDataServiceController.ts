import { $fetch } from '~/composables/use-fetch'

export function cryptocurrencyDataServiceController() {
  function show(slug: string) {
    return $fetch(`/cryptocurrencies-data/${slug}`, { method: 'POST' }).json<{
      slug: string
      name: string
      symbol: string
      logo: string
      prices: [number, number][]
    }>()
  }

  return {
    show,
  }
}
