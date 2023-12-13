<script setup lang="ts">
import type {User} from "~/composables/use-auth";

const props = defineProps<{
  user: User
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()

</script>

<template>
  <div class="bg-stone-100 border border-stone-300/50 rounded-md p-2">
    {{ user.username }}

    <div @click="emits('close')">
      X
    </div>

  </div>
</template>


