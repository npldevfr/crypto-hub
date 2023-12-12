<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'radix-vue'

// const toggleState = ref(false)

function handleClick() {
  alert('hello!')
}
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger
        class="focus:outline-none"
    >
     <slot />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
          align="end"
          class="min-w-[180px] outline-none bg-white rounded-lg p-[6px] shadow-lg will-change-[opacity,transform] data-[side=top]:animate-fade-in data-[side=right]:animate-fade-in data-[side=bottom]:animate-fade-in data-[side=left]:animate-fade-in"
          :side-offset="5"
      >

        <DropdownItem icon="i-mdi-account" title="Mon compte" />
        <DropdownItem icon="i-mdi-settings" title="Paramètres" />
        <DropdownItem icon="i-mdi-logout" title="Déconnexion" />


        <DropdownMenuArrow class="fill-white shadow-lg" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
