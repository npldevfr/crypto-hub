<script setup lang="ts">
import {tv} from "tailwind-variants";

const props = withDefaults(defineProps<{
  type: 'primary' | 'secondary' | 'secondary-outline'
  size: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  danger?: boolean
}>(),
    {
      danger: false,
      disabled: false,
      loading: false,
      type: 'primary',
      size: 'md'
})

const buttons = tv({
  base: 'rounded-md flex items-center justify-center space-x-2 transition duration-200 ease-in-out',
  variants: {
    type: {
      primary: 'bg-black text-white',
      secondary: 'bg-gray-500 text-white',
      'secondary-outline': 'bg-white text-gray-500 border border-gray-500',
    },
    size: {
      xs: 'text-xs px-2 py-1',
      sm: 'text-sm px-3 py-2',
      md: 'text-md px-4 py-3',
      lg: 'text-lg px-5 py-4',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
    loading: {
      true: 'opacity-50 cursor-wait',
    },
    danger: {
      true: 'bg-red-500 text-white',
    },
  },
  defaultVariants: {
    type: 'primary',
    size: 'md',
    danger: false,
    disabled: false,
    loading: false,
  },
})
</script>

<template>
  <div :class="buttons({ danger, type, size, disabled, loading })">
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </div>
</template>
