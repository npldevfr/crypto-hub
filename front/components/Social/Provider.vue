<script setup lang="ts">
const { icon, providerName } = defineProps<{
  icon: string
  providerName: string
}>()
</script>

<template>
  <div class="w-full border border-stone-200 flex hover:bg-stone-100 cursor-pointer gap-2 rounded px-4 py-2 justify-center items-center">
    <div :class="icon" class="text-xl" />
  </div>
</template>
