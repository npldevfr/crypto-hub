<script setup lang="ts">
import { NuxtLink } from '#components'

const { to, name } = defineProps<{
  to?: string
  icon?: string
  name: string
}>()
</script>

<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    class="text-stone-100 select-none bg-zinc-900 text-[12px] px-2  h-full items-center gap-2 flex font-medium leading-[1.2]"
    :class="{ 'hover:bg-zinc-700 cursor-pointer': to }"
  >
    <div v-if="icon" :class="icon" />
    {{ name }}
  </component>
</template>
