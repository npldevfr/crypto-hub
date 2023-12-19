<script setup lang="ts">
defineProps<{
  color?: string
}>()
</script>

<template>
  <div class="rounded-full bg-stone-800 text-white text-xs px-2 py-0.2">
    <slot />
  </div>
</template>
