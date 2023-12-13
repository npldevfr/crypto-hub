<script lang="ts" setup>
import {headerService} from "~/services/header.service";
import type {DropdownItemProps} from "~/components/Dropdown/Item.vue";

const router = useRouter();
const {logout} = useAuth()
const {getHeaderData} = headerService();
const {data: headerData} = getHeaderData()
const {isLogged, user} = useAuth()

const dropdownItems: DropdownItemProps[] = [
  {
    title: 'Mon compte',
    icon: 'i-mdi-account',
    handle: () => router.push({name: 'me'})
  },
  {
    title: 'Paramètres',
    icon: 'i-mdi-settings',
    handle: () => router.push({name: 'me-settings'})
  },
  {
    title: 'Déconnexion',
    icon: 'i-mdi-logout',
    handle: async () => await logout()
  }
]

</script>
<template>
  <AdminHeaderBar/>
  <div class="flex flex-row border-b gap-10 px-30 w-full h-[60px] items-center">
    <Logo size="sm"/>
    <div class="w-full">
      <Navigation :header-data="headerData">
        <NavigationLink title="Actualités">
          <NavigationTabsArticle/>
        </NavigationLink>
        <NavigationLink title="Marché">
          <NavigationTabsCryptocurrenciesList/>
        </NavigationLink>
        <NavigationLink title="NFT"/>
        <NavigationLink title="Convertisseur"/>
      </Navigation>
    </div>
    <div class="flex flex-row justify-end items-center space-x-10 ">
      <div class="flex items-center gap-2" v-if="isLogged">
        <div class="flex flex-col justify-center leading-5 items-end">
          {{ user?.username }}
         <span class="text-xs text-stone-500">{{ user?.email }}</span>
        </div>
        <Dropdown>
          <Avatar :src="user?.avatar"
                  interactive
                  size="lg"
                  :alt="user?.username"/>

          <template #content>
            <DropdownItem v-for="(item, key) in dropdownItems"
                          :title="item.title"
                          :icon="item.icon"
                          :handle="item.handle"
                          :key="key"
            />
          </template>

        </Dropdown>
      </div>
      <div
          v-else
          class="flex flex-row justify-end items-center space-x-2 w-full"
      >
        <Button size="sm" hierarchy="link" @click="router.push('/register')">
          S'inscrire
        </Button>
        <Button size="sm" hierarchy="primary" @click="router.push('/login')">
          Connexion
        </Button>
      </div>
    </div>
  </div>
</template>
