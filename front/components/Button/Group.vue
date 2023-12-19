<script setup lang="ts">
import type { ButtonProps } from '~/components/Button/Button.vue'

interface ExtendedButtonProps extends Omit<ButtonProps, 'size'> {
  handle: () => void
  label: string
}

const { buttons, size } = defineProps<{
  buttons: ExtendedButtonProps[]
  size: Pick<ButtonProps, 'size'>['size']
}>()
</script>

<template>
  <div class="flex flex-row [&>*]:rounded-none">
    <Button
      v-for="button in buttons" v-bind="button" :size="size" class="!first:rounded-l-md !last:rounded-r-md "
      @click="button.handle"
    >
      {{ button.label }}
    </Button>
  </div>
</template>
