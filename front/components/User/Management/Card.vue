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
  <div class="bg-stone-100 flex flex-col gap-4 h-full p-6">
    <div class="flex items-start justify-between">
      <div class="flex flex-col">
        <h1 class="text-lg font-bold">
          {{ user.username }}
        </h1>
        <p class="text-sm text-stone-500">
          {{ user.email }}
        </p>
      </div>
      <div @click="emits('close')" class="w-6 h-6 cursor-pointer flex items-center justify-center rounded-full bg-stone-200 hover:bg-stone-900 hover:text-white transition">
        <div class="i-mdi-close"/>
      </div>
    </div>

    <ButtonGroup size="sm" :buttons="[
       {
         label: 'Supprimer l\'utilisateur',
         danger: true,
         handle: () => {
            console.log('delete')
         }
       }
    ]" />

  </div>
</template>


