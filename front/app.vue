<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-gray-50 '
  }
})

const { user, isLogged } = useAuth()
</script>

<template>
  <div v-if="isLogged && user?.is_blocked">
    Vous êtes bloqué
  </div>
  <NuxtLayout v-else>
    <NuxtPage/>
  </NuxtLayout>
</template>
