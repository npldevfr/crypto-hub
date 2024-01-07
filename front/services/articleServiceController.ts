import type { ComputedRef, Ref } from 'vue'
import type { AfterFetchContext } from '@vueuse/core'
import { $fetch } from '~/composables/use-fetch'
import type { User } from '~/composables/use-auth'
import type { PaginatedData } from '~/types/pagination'
import type { Article } from '~/types/article'

export function articleServiceController() {
  const index = () => {
   /*  const page: Ref<number> = ref<number>(1)
    const sortable = ref({
      column: 'email',
      direction: 'asc',
    })
    const query: Ref<string> = ref<string>('')
    const computedPage: ComputedRef<string> = computed(() => `/users?page=${page.value}&perPage=10&sortBy=${sortable.value.column}&sortDirection=${sortable.value.direction}&query=${query.value}`)

    const { get, data } = $fetch(computedPage, {
      immediate: true,
      refetch: true,
    }).json<PaginatedData<User>>()

    // If the page is greater than the last page, we set the page to the last page
    watch(data, (newData) => {
      if (newData) {
        if (page.value > newData.meta.last_page)
          page.value = newData.meta.last_page
      } */
 /*    })

    return {
      page,
      data,
      get,
      query,
      sortable,
    } */
  }

  const show = () => {
    return $fetch(`/articles-home`).json<Article[]>()
  }

/*   const updateOrDelete = (user_id: Pick<User, 'id'>['id']) => {
    return $fetch(`/users/${user_id}`, {
      immediate: false,
    }).json<User>()
  } */




  return {
    index,
    show,
    /* updateOrDelete */
  }
}
