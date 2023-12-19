<script setup lang="ts">
import { tv } from 'tailwind-variants'

export interface ButtonProps {
  hierarchy?: 'primary' | 'secondary' | 'secondary-outline' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  danger?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  danger: false,
  disabled: false,
  loading: false,
  hierarchy: 'primary',
  size: 'md',
})

const buttons = tv({
  base: 'rounded-md transition-[width,_height] duration-300 select-none flex items-center cursor-pointer font-500 justify-center space-x-2 transition duration-200 ease-in-out',
  variants: {
    hierarchy: {
      'primary': 'bg-stone-900 text-white hover:bg-stone-700',
      'secondary': 'bg-stone-500 text-white',
      'secondary-outline': 'bg-white text-gray-500 border border-stone-500',
      'link': 'bg-transparent text-stone-900 hover:bg-stone-100',
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
      true: 'hover:cursor-not-allowed',
    },
    danger: {
      true: 'bg-red-500 hover:bg-red-700 text-white',
    },
  },
  defaultVariants: {
    hierarchy: 'primary',
    size: 'md',
    danger: false,
    disabled: false,
    loading: false,
  },
})
</script>

<template>
  <button :class="buttons({ danger, hierarchy, size, disabled, loading })">
    <slot name="prefix" />
    <div v-if="loading" class="i-svg-spinners-ring-resize mx-2" />
    <slot />
    <slot name="suffix" />
  </button>
</template>
