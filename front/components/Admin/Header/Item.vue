<script setup lang="ts">
import {NuxtLink} from "#components";

const {to, name} = defineProps<{
  to?: string
  icon?: string
  name: string
}>()
</script>

<template>
  <component :is="to ? NuxtLink : 'div'"
             :to="to"
             class="text-white bg-stone-800 text-[12px] px-2 hover:bg-stone-700 h-full items-center gap-2 flex font-medium leading-[1.2]">
    <div :class="icon"/>
    {{ name }}
  </component>
</template>

