<script setup lang="ts">
import { format } from 'date-fns'
import { computed } from 'vue'

const start = defineModel<Date>('start', { required: true })
const end = defineModel<Date>('end', { required: true })

const startFromDateToInput = computed(() => {
  return format(start.value, 'yyyy-MM-dd\'T\'HH:mm')
})

const endFromDateToInput = computed(() => {
  return format(end.value, 'yyyy-MM-dd\'T\'HH:mm')
})
</script>

<template>
  <div class="w-full flex flex-row gap-2">
    <FormKit
      :value="startFromDateToInput"
      type="datetime-local"
      label="Date de début"
      @input="start = new Date($event)"
    />
    <FormKit
      :value="endFromDateToInput"
      type="datetime-local"
      label="Date de fin"
      @input="end = new Date($event)"
    />
  </div>
</template>
