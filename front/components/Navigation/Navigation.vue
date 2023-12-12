<script setup lang="ts">
import { ref } from 'vue'
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'radix-vue'
import type {HeaderData} from "~/types/header";

const props = defineProps<{
  headerData?: HeaderData
}>()

provide('headerData', computed(() => props.headerData))
const currentTrigger = ref<string>('')
</script>

<template>
  <NavigationMenuRoot v-model="currentTrigger" class="relative z-1 flex w-full flex-row ">
    <NavigationMenuList class="center gap-2 m-0 flex list-none rounded-[6px]  p-1">

      <slot />

      <NavigationMenuIndicator
          class="data-[state=hidden]:opacity-0 duration-200 data-[state=visible]:animate-fade-in data-[state=hidden]:animate-fade-out top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[all,transform_250ms_ease]"
      >
        <div class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white shadow" />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div class="perspect-[2000px] absolute top-full left-0 flex w-full ">
      <NavigationMenuViewport
          class="data-[state=open]:animate-scale-in shadow data-[state=closed]:animate-scale-out relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-left-top overflow-hidden rounded-[10px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]"
      />
    </div>
  </NavigationMenuRoot>
</template>
