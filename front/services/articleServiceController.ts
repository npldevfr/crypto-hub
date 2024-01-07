import type { ComputedRef, Ref } from 'vue'
import type { AfterFetchContext } from '@vueuse/core'
import { $fetch } from '~/composables/use-fetch'
import type { User } from '~/composables/use-auth'
import type { PaginatedData } from '~/types/pagination'
import type { Article } from '~/types/article'

export function articleServiceController() {


  const home = () => {
    return $fetch(`/articles-home`).json<Article[]>()
  }
  const show = (slug:string) => {
    return $fetch(`/article/${slug}`).json<Article>()
  } 
  const index = () => {
    return $fetch(`/articles`).json<Article[]>()
  }

/*   const updateOrDelete = (user_id: Pick<User, 'id'>['id']) => {
    return $fetch(`/users/${user_id}`, {
      immediate: false,
    }).json<User>()
  } */




  return {
    index,
    home,
    show,
    /* updateOrDelete */
  }
}
