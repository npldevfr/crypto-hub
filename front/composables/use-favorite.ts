import { useStorage } from '@vueuse/core'
import type { Ref } from 'vue'

export function useFavorite() {
  /**
   * Favorite articles slugs from storage
   * @type {Ref<string[]>}
   */
  const cryptocurrencySlugs: Ref<string[]> = useStorage<string[]>('cryptocurrencySlugs', [])

  /**
   * Check if an article is favorite
   * @param slug
   */
  const isFavorite = (slug: string) => cryptocurrencySlugs.value.includes(slug)

  /**
   * Mark an article as favorite
   * @param slug
   */
  const markAsFavorite = (slug: string): void => {
    if (!isFavorite(slug))
      cryptocurrencySlugs.value.push(slug)
  }

  /**
   * Unmark an article as favorite
   * @param slug
   */
  const unmarkAsFavorite = (slug: string): void => {
    if (isFavorite(slug))
      cryptocurrencySlugs.value = cryptocurrencySlugs.value.filter((favoriteSlug: string) => favoriteSlug !== slug)
  }

  return {
    cryptocurrencySlugs,
    isFavorite,
    markAsFavorite,
    unmarkAsFavorite,
  }
}
