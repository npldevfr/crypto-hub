<script setup lang="ts">
import { NavigationMenuLink } from 'radix-vue'

const props = defineProps<{
  title: string
  isNew?: boolean
}>()
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <a
          v-bind="$attrs"
          class="focus:shadow-[0_0_0_2px] hover:bg-stone-100 focus:shadow-green7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors"
      >
        <div class="text-stone-900 items-center gap-2 flex mb-[5px] font-medium leading-[1.2]">
          {{ props.title }}
          <Badge v-if="props.isNew">
            Nouveau!
          </Badge>
        </div>
        <p class="text-mauve11 my-0 leading-[1.4]">
          <slot />
        </p>
      </a>
    </NavigationMenuLink>
  </li>
</template>
