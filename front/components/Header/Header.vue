<script lang="ts" setup>
const isLogged = ref(false);
</script>
<template>
  <div class="flex flex-row px-10 w-full p-5 items-center">
    <div class="flex lg-w-75">
      <Logo size="sm" />
    </div>
    <div class="flex px-2">
      <input
        type="text"
        id="input-group-1"
        class="bg-gray-50 w-65 h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Rechercher ..."
        style="text-align: center"
      />
    </div>
    <div class="flex px-30 flex-end space-x-10 w-full">
      <NuxtLink
        to="/"
        class="text-white bg-#0D1F2D hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >Accueil</NuxtLink
      >
      <NuxtLink
        to="/"
        class="text-gray-300 hover:bg-#0D1F2D hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >Actualités</NuxtLink
      >
      <NuxtLink
        to="/"
        class="text-gray-300 hover:bg-#0D1F2D hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >Crypto</NuxtLink
      >
    </div>
    <div class="flex flex-row justify-end items-center space-x-10 w-full">
      <div v-if="isLogged">
        <ProfileAvatar />
      </div>
      <div
        v-else
        class="flex flex-row justify-end items-center space-x-10 w-full"
      >
        <!-- <Button size="sm" type="primary"> Me connecter </Button> -->
        <NuxtLink
          to="/login"
          class="text-gray-300 bg-#237CA3 text-white rounded-md px-6 py-2 text-sm font-medium"
          >Se connecter</NuxtLink
        >

        <NuxtLink
          to="/register"
          class="text-gray-300 bg-#237CA3 text-white rounded-md px-6 py-2 text-sm font-medium"
          >S'inscrire</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
