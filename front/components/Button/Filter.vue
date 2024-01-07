<script setup lang="ts">
import { tv } from 'tailwind-variants'

const { size, hierarchy, icon, destructive, disabled, block, isLoading, skew } = defineProps<{
  size?: 'xs' | 'md' | 'lg' | 'xl' | '2xl' | 'xxs'
  hierarchy?: 'stone-900' | 'secondary-color' | 'secondary-gray' | 'secondary-outline' | 'link-color' | 'link-gray' | 'arcade'
  icon?: 'leading' | 'trailing' | 'only'
  destructive?: boolean
  disabled?: boolean
  block?: boolean
  skew?: boolean
  isLoading?: boolean
}>()

const button = tv({
  base: 'w-fit h-fit flex items-center rounded-full !focus:outline-none justify-center  transition-all duration-200 font-semibold outline-none focus:outline-none truncate',
  variants: {
    size: {
      'xxs': 'px-2 py-1 text-xs font-300 ',
      'xs': 'px-4 py-2 text-[12px]',
      'md': 'px-6 py-3 text-base ',
      'lg': 'px-8 py-4 text-base',
      'xl': 'px-10 py-5 text-lg ',
      '2xl': 'px-12 py-6 text-xl',
    },
    hierarchy: {
      'stone-900': '!bg-stone-900 text-white border border-stone-900 !hover:bg-stone-900/90 ring ring-2 ring-transparent',
      'secondary-color': ' bg-secondary/80 text-stone hover:bg-secondary focus:bg-secondary/80',
      'secondary-outline': 'bg-transparent border text-stone-900 border-stone-200 hover:bg-stone-200/80 ',
      'secondary-gray': 'bg-stone-100 hover:bg-stone-100/80 focus:bg-stone-100/80 text-stone-900',
      'link-color': 'p-0 bg-transparent shadow-none text-stone-900 hover:text-stone-900/80',
      'link-gray': 'p-0 bg-transparent shadow-none text-stone-900 hover:text-stone-900/80 ',
      'arcade': 'bg-stone-900/90 text-white shadow-[0_5px_0_#1c1c1c] select-none cursor-pointer overflow-hidden active:shadow-none outline-none transform transition-all ease-in-out duration-100 after:content-empty after:absolute after:w-full after:h-full after:rounder after:top-0 after:left-0 after:opacity-50 active:translate-y-[5px]',
    },
    icon: {
      leading: 'gap-2',
      trailing: 'gap-2',
      only: 'w-[38px] h-[38px] !text-[20px] p-0',
    },
    destructive: {
      true: '!bg-[#CB2F2F] text-stone-100 !hover:bg-[#CB2F2F]/80 !focus:bg-[#CB2F2F]/80',
      false: '',
    },
    disabled: {
      true: 'bg-[#171819] text-stone-100 cursor-not-allowed',
      false: '',
    },
    skew: {
      true: '!skew-x-[-5deg]',
      false: '',
    },
    isLoading: {
      true: 'bg-[#171819] text-stone-100 cursor-not-allowed',
      false: '',
    },
    block: {
      true: '!w-full',
      false: '',
    },
  },
  compoundVariants: [
    {
      hierarchy: 'link-gray',
      destructive: true,
      class: '!bg-transparent !hover:bg-transparent !focus:bg-transparent !ring-transparent !text-[#CB2F2F] !hover:text-[#CB2F2F]/80 !focus:text-[#CB2F2F]/80',
    },
    {
      hierarchy: 'secondary-outline',
      disabled: true,
      class: 'bg-transparent text-stone-900/50',
    },
  ],
  defaultVariants: {
    size: 'md',
    hierarchy: 'stone-900',
    icon: 'trailing',
    destructive: false,
    disabled: false,
    block: false,
    isLoading: false,
  },
})
</script>

<template>
  <button :class="button({ size, skew, hierarchy, icon, destructive, disabled, isLoading, block })">
    <template v-if="icon !== 'only'">
      <slot
        v-if="icon === 'leading'"
        name="icon"
      />
      <slot />
      <slot
        v-if="icon === 'trailing'"
        name="icon"
      />
    </template>
    <template v-else>
      <span
        v-if="isLoading"
        class="i-svg-spinners-ring-resize"
      />
      <slot name="icon" />
    </template>
  </button>
</template>
