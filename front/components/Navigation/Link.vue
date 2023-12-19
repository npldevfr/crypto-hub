<script setup lang="ts">
import {NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger} from "radix-vue";

const {title} = defineProps<{ title: string }>();

</script>

<template>
  <NavigationMenuItem>
    <template v-if="$slots.default">
      <NavigationMenuTrigger
          class="text-stone-800 hover:bg-stone-200/40 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none"
      >
        {{ title }}
        <div
             class="i-mdi-chevron-down text-green10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
        />
      </NavigationMenuTrigger>
        <NavigationMenuContent
            class="data-[motion=from-start]:animate-enter-from-left data-[motion=from-end]:animate-enter-from-right data-[motion=to-start]:animate-exit-to-left data-[motion=to-end]:animate-exit-to-right absolute top-0 left-0 w-full sm:w-auto">
          <slot/>
        </NavigationMenuContent>
    </template>
    <template v-else>
      <div
          class="cursor-pointer text-stone-800 hover:bg-stone-200/40 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none"
      >
        {{ title }}
      </div>
    </template>
  </NavigationMenuItem>
</template>
