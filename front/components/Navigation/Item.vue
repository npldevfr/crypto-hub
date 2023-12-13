<script setup lang="ts">
import {NavigationMenuLink} from 'radix-vue'
import type {RouteLocationRaw} from "vue-router";

const props = defineProps<{
  title: string
  to?: RouteLocationRaw
  isNew?: boolean
}>()

const { push } = useRouter()

</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <div
          @click="push(props.to || { name: 'index'})"
          class="cursor-pointer focus:shadow-[0_0_0_2px] hover:bg-stone-100 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline w-full outline-none transition-colors"
      >
        <div class="flex flex-row  gap-4">
          <slot name="prefix"/>
          <div class="flex flex-col">
          <div class="text-stone-900 items-center gap-2 flex mb-[5px] font-medium leading-[1.2]">
            {{ props.title }}
            <Badge v-if="props.isNew">
              Nouveau!
            </Badge>
          </div>
          <div class="text-stone-700 line-clamp-2 leading-[1.4] text-wrap">
            <slot/>
          </div>
          </div>
        </div>
      </div>

    </NavigationMenuLink>
  </li>
</template>
