<script lang="ts" setup>
const props = defineProps({
  to: String,
  label: String,
});
</script>

<template>
  <a :href="props.to" class="profile-item">{{ props.label }}</a>
</template>
