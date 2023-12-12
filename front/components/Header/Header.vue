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
    <div class="flex flex-row justify-end items-center space-x-10 ">
      <div v-if="isLogged">
        <Avatar :src="user?.avatar"
                interactive
                size="lg"
                :alt="user?.username" />
      </div>
      <div
        v-else
        class="flex flex-row justify-end items-center space-x-2 w-full"
      >
        <Button size="sm" type="link" @click="router.push('/login')">
          S'inscrire
        </Button>
        <Button size="sm" type="primary" @click="router.push('/register')">
          Connexion
        </Button>
      </div>
    </div>
  </div>
</template>
