<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-stone-200'
  }
})
</script>

<template>
  <AdminHeaderBar />
  <Head>
    <Title>◈ CryptoHUB &mdash; Utilisateurs</Title>
  </Head>
  <div class="w-full flex justify-center items-center">
    <div class="w-3/4 py-2">
      <slot />
    </div>
  </div>
</template>
