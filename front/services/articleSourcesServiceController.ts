import type { ComputedRef, Ref } from 'vue'
import { $fetch } from '~/composables/use-fetch'
import type { ArticleSource } from '~/types/articleSource'

export function articleSourcesServiceController() {
  const index = () => {
    const page: Ref<number> = ref<number>(1)
    const computedPage: ComputedRef<string> = computed(() => `/article-sources?page=${page.value}`)

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

  const show = (articleSource_id: Pick<ArticleSource, 'id'>['id']) => {
    return $fetch(`/article-sources/${articleSource_id}`).json<ArticleSource>()
  }

  const toggleActiveStatus = (articleSource_id: Pick<ArticleSource, 'id'>['id']) => {
    return $fetch(`/article-sources/change-active-status/${articleSource_id}`, {
      method: 'PATCH',
    }).json<ArticleSource>()
  }

  const destroy = (articleSource_id: Pick<ArticleSource, 'id'>['id']) => {
    return $fetch(`/article-sources/${articleSource_id}`, {
      method: 'DELETE',
    }).json<ArticleSource>()
  }

  const addRssSource = (rssUrl: Pick<ArticleSource, 'url'>['url']) => {
    return $fetch(`/article-sources/add-rss-source/`, {
      method: 'POST',
      body: JSON.stringify({ rssUrl }),
    }).json<ArticleSource>()
  }

  const verifyRssSource = (rssUrl: Pick<ArticleSource, 'url'>['url']) => {
    return $fetch(`/article-sources/verify-rss-source/`, {
      method: 'POST',
      body: JSON.stringify({ rssUrl }),
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
