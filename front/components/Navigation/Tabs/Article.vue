<script setup lang="ts">
import {NavigationMenuLink} from "radix-vue";
</script>

<template>
  <ul class=" m-0 grid gap-2 list-none p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
    <li class="row-span-3 grid">
      <NavigationMenuLink as-child>
        <a
            class="from-stone-900 to-stone-800 flex h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
            href="/"
        >
          <div class="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">À la une</div>
          <p class="text-stone-200 text-[14px] leading-[1.3]">Unstyled, accessible components for Vue.</p>
        </a>
      </NavigationMenuLink>
    </li>

    <NavigationItem href="https://stitches.dev/" title="NFT" is-new>
      Liste des NFTs disponibles sur la plateforme.
    </NavigationItem>
    <NavigationItem href="/colors" title="Finance">
      FTX, la chute du pilier de la finance décentralisée.
    </NavigationItem>
    <NavigationItem href="/typography" title="Gaming">
      Les jeux vidéo, un marché en pleine expansion.
    </NavigationItem>
  </ul>
</template>

