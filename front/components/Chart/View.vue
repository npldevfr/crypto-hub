<script setup lang="ts">
const { title } = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="my-2 flex flex-col gap-4 bg-stone-50 p-5">
    {{ title }}
    <slot />
  </div>
</template>
