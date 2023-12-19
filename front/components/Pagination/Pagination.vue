<script setup lang="ts">
import { PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev, PaginationRoot } from 'radix-vue'
import type { PaginationRootProps } from 'radix-vue'

const props = defineProps<PaginationRootProps>()
const customPage = defineModel<number>('page', {
  default: 1,
})
</script>

<template>
  <PaginationRoot v-bind="props" v-model:page="customPage">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1 text-stone-900">
      <PaginationFirst class="w-9 h-9  flex items-center justify-center  disabled:opacity-50  rounded">
        <div class="i-radix-icons:double-arrow-left" />
      </PaginationFirst>
      <PaginationPrev class="w-9 h-9  flex items-center justify-center mr-4  disabled:opacity-50  rounded">
        <div class="i-radix-icons:chevron-left" />
      </PaginationPrev>
      <template v-for="(page, index) in items">
        <PaginationListItem v-if="page.type === 'page'" :key="index" class="w-9 h-9 border rounded  data-[selected]:bg-stone-900 data-[selected]:text-white hover:bg-stone-900/10 transition" :value="page.value">
          {{ page.value }}
        </PaginationListItem>
        <PaginationEllipsis v-else :key="page.type" :index="index" class="w-9 h-9 flex items-center justify-center">
          &#8230;
        </PaginationEllipsis>
      </template>
      <PaginationNext class="w-9 h-9  flex items-center justify-center  ml-4 disabled:opacity-50  rounded">
        <div class="i-radix-icons:chevron-right" />
      </PaginationNext>
      <PaginationLast class="w-9 h-9  flex items-center justify-center disabled:opacity-50  rounded">
        <div class="i-radix-icons:double-arrow-right" />
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
