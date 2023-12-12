<script lang="ts" setup>
import Avatar from "~/components/Avatar/Avatar.vue";
import {headerService} from "~/services/header.service";

const router = useRouter();
const { getHeaderData } = headerService();
const { data: headerData } = getHeaderData()
const { isLogged, user } = useAuth()

</script>
<template>
  <div class="flex flex-row border-b px-30 w-full h-[60px] items-center">
    <div class="flex lg-w-75">
      <Logo size="sm" />
    </div>

    <div class="w-full">
      <Navigation :header-data="headerData" >
        <NavigationLink title="Actualités">
            <NavigationTabsArticle />
        </NavigationLink>
        <NavigationLink title="Marché">
          <NavigationTabsCryptocurrenciesList />
        </NavigationLink>
        <NavigationLink title="NFT" />
        <NavigationLink title="Convertisseur" />
      </Navigation>
    </div>

<!--    <div class="flex px-2">-->
<!--      <input-->
<!--          type="text"-->
<!--          id="input-group-1"-->
<!--          class="bg-gray-50 w-65 h-10 px-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
<!--          placeholder="Rechercher ..."-->
<!--      />-->
<!--    </div>-->
    <div class="flex flex-row justify-end items-center space-x-10 ">
      <div v-if="isLogged">
        <Avatar :src="user?.avatar"
                interactive
                size="lg"
                :alt="user?.username" />
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
