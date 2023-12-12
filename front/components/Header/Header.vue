<script lang="ts" setup>
import Avatar from "~/components/Avatar/Avatar.vue";

const router = useRouter();

const { isLogged } = useAuth()

</script>
<template>
  <div class="flex flex-row border-b px-10 w-full h-[60px] items-center">
    <div class="flex lg-w-75">
      <Logo size="sm" />
    </div>

    <div class="w-full bg-red">
      <Navigation />
    </div>

<!--    <div class="flex px-2">-->
<!--      <input-->
<!--          type="text"-->
<!--          id="input-group-1"-->
<!--          class="bg-gray-50 w-65 h-10 px-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
<!--          placeholder="Rechercher ..."-->
<!--      />-->
<!--    </div>-->
    <div class="flex flex-row justify-end items-center space-x-10 w-full">
      <Avatar interactive size="lg" alt="npldev" />
      <div v-if="isLogged">
        <ProfileAvatar />
      </div>
      <div
        v-else
        class="flex flex-row justify-end items-center space-x-10 w-full"
      >
        <Button size="sm" type="secondary" @click="router.push('/login')">
          Me connecter
        </Button>
        <Button size="sm" type="secondary" @click="router.push('/register')">
          S'inscrire
        </Button>
      </div>
    </div>
  </div>
</template>
