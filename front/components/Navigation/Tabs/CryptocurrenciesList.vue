<script setup lang="ts">

import type {HeaderData} from "~/types/header";

const headerData = inject<HeaderData>('headerData')
</script>


<template>
  <ul class="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-4">
    <NavigationItem
        v-for="(cryptocurrency, key) in headerData.cryptocurrencies"
        :key="key"
        :title="cryptocurrency?.symbol"
        :to="{ name: 'market-slug', params: { slug: cryptocurrency?.slug } }"
        >

      <template #prefix>
        <img :src="cryptocurrency?.logo" :alt="cryptocurrency?.name" class="w-[24px] h-[24px] rounded-[4px]"/>
      </template>

      {{ cryptocurrency?.name }}
    </NavigationItem>

    <NavigationItem
      title="Voir plus"
      :to="{ name: 'market' }"
    >
      <template #prefix>
        <div class="w-[24px]" />
      </template>

      + de 1000 cryptomonnaies

    </NavigationItem>


  </ul>
</template>
