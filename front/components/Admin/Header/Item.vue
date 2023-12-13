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
             class="text-white select-none bg-stone-800 text-[12px] px-2  h-full items-center gap-2 flex font-medium leading-[1.2]"
             :class="{'hover:bg-stone-700 cursor-pointer': to}">
    <div :class="icon" v-if="icon"/>
    {{ name }}
  </component>
</template>

