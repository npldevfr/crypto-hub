<script setup lang="ts">
const { title, subtitle } = defineProps<{
  title?: string
  subtitle?: string
  bottomSeparator?: boolean
}>()
</script>

<template>
  <div class="col-span-full w-full flex flex-col gap-2">
    <div class="flex justify-between">
      <div class="flex flex-col gap-0">
        <h1
          v-if="title"
          class="text-[22px] font-semibold tracking-[-0.48px] text-stone-800"
        >
          {{ title }}
        </h1>
        <h2
          v-if="subtitle"
          class="text-[14px] leading-[15px] text-stone-900/80"
        >
          {{ subtitle }}
        </h2>
      </div>
      <div class="flex flex-row items-center">
        <slot name="actions" />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <slot />
    </div>
    <div
      v-if="bottomSeparator"
      class="my-2 h-[1px] w-full bg-stone-300/50"
    />
  </div>
</template>
