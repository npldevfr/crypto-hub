<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
import { tv } from 'tailwind-variants'

interface AvatarProps {
  delayMs?: number
  src?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'profile'
  interactive?: boolean
  editable?: boolean

}

const props = withDefaults(defineProps<AvatarProps>(), {
  delayMs: 0,
  size: 'md',
  interactive: false,
  alt: '',
})

const getAvatarLetters = computed(() => {
  const [first, second] = props.alt.split('')
  if (!first || !second)
    return ''
  return `${first}${second}`.toUpperCase()
})

const avatar = tv({
  base: ':uno: relative bg-stone-900 inline-flex select-none items-center justify-center rounded-full align-middle',
  variants: {
    size: {
      'xs': ':uno: h-[20px] w-[20px] text-[10px]',
      'sm': ':uno: h-[24px] w-[24px] text-[11px]',
      'md': ':uno: h-[32px] w-[32px] text-[13px]',
      'lg': ':uno: h-[40px] w-[40px] text-[16px]',
      'xl': ':uno: h-[48px] w-[48px] text-[20px]',
      '2xl': ':uno: h-[56px] w-[56px] text-[20px]',
      '3xl': ':uno: h-[64px] w-[64px] text-[24px]',
      'profile': ':uno: h-[90px] w-[90px] text-[34px] !font-400',
    },
    interactive: {
      true: ':uno: cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    interactive: false,
  },
})
</script>

<template>
  <AvatarRoot :class="avatar({ size, interactive })">
    <AvatarImage
      class=":uno: h-full w-full rounded-[inherit] object-cover"
      :src="src"
      :alt="alt"
    />
    <AvatarFallback
      :class=" avatar({ size })"
      class=":uno: h-full w-full flex items-center justify-center bg-primary font-medium text-white"
      :delay-ms="delayMs"
    >
      {{ getAvatarLetters }}
    </AvatarFallback>

    <div
      v-if="$slots.default"
      class=":uno: absolute flex flex-row rounded-full bg-stone-900 p-1 text-[10px] text-primary -bottom-1 -right-2 blue:bg-slate-700 dark:bg-zinc-800"
    >
      <slot />
    </div>
  </AvatarRoot>
</template>
