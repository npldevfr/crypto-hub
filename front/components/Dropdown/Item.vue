<script setup lang="ts">
import { DropdownMenuItem } from 'radix-vue'

export interface DropdownItemProps {
  icon?: string
  title: string
  handle?: () => void
}

const { title, icon, handle } = defineProps<DropdownItemProps>()
</script>

<template>
  <DropdownMenuItem
    :text-value="title.toLowerCase()"
    class="relative data-[disabled]:pointer-events-none pl-[30px] group data-[disabled]:opacity-50 mx-1 first-of-type:mt-1 last-of-type:mb-1 px-2 py-1.5 text-[13.5px] font-500 outline-none cursor-pointer rounded-[2px] transition-all hover:bg-stone-100/70  flex items-center gap-3"
    @click="handle"
  >
    <div class="absolute left-0 top-0 transition-all duration-200 text-stone-900/50 group-hover:text-stone-900 w-[32px] h-[32px] flex items-center justify-center">
      <div :class="icon" />
    </div>
    {{ title }}
  </DropdownMenuItem>
</template>
