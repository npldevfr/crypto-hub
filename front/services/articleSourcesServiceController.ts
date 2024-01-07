import type { ComputedRef, Ref } from 'vue'
import { $fetch } from '~/composables/use-fetch'
import type { ArticleSource } from '~/types/articleSource'

export function articleSourcesServiceController() {
  const index = () => {
    const page: Ref<number> = ref<number>(1)
    const computedPage: ComputedRef<string> = computed(() => `/article-sources`)

    const { get, data } = $fetch(computedPage, {
      immediate: true,
      refetch: true,
    }).json<ArticleSource[]>()

    return {
      page,
      data,
      get,
    }
  }

  const show = (id: number) => {
    return $fetch(`/article-sources/${id}`).json<ArticleSource>()
  }

  const toggleActiveStatus = (id: number) => {
    return $fetch(`/article-sources/change-active-status/${id}`, {
      immediate: false,
    }).json<ArticleSource>()
  }

  const destroy = (id: number) => {
    return $fetch(`/article-sources/${id}`, {
      method: 'DELETE',
      immediate: false,
    }).json<void>()
  }

  const addRssSource = (rssUrl: string) => {
    return $fetch('/article-sources/add-rss-source', {
      method: 'POST',
      body: { rssUrl },
      immediate: false,
    }).json<ArticleSource>()
  }

  const verifyRssSource = (rssUrl: string) => {
    return $fetch('/article-sources/verify-rss-source', {
      method: 'POST',
      body: { rssUrl },
      immediate: false,
    }).json<boolean>()
  }

  return {
    index,
    show,
    toggleActiveStatus,
    destroy,
    addRssSource,
    verifyRssSource,
  }
}
