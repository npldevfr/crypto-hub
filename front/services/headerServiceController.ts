import { $fetch } from '~/composables/use-fetch'
import type { HeaderData } from '~/types/header'

export function headerServiceController() {
  const getHeaderData = () => $fetch('header-data').json<HeaderData>()

  return {
    getHeaderData,
  }
}
