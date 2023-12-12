<script lang="ts" setup>
import Avatar from "~/components/Avatar/Avatar.vue";
import {headerService} from "~/services/header.service";
import type {DropdownItemProps} from "~/components/Dropdown/Item.vue";

const router = useRouter();
const { logout } = useAuth()
const {getHeaderData} = headerService();
const {data: headerData} = getHeaderData()
const {isLogged, user} = useAuth()

const dropdownItems: DropdownItemProps[] = [
  {
    title: 'Mon compte',
    icon: 'i-mdi-account',
    handle: () => router.push({ name: 'me' })
  },
  {
    title: 'Paramètres',
    icon: 'i-mdi-settings',
    handle: () => router.push({ name: 'me-settings' })
  },
  {
    title: 'Déconnexion',
    icon: 'i-mdi-logout',
    handle: async () => await logout()
  }
]

</script>
<template>
  <div class="flex flex-row border-b px-30 w-full h-[60px] items-center">
    <div class="flex lg-w-75">
      <Logo size="sm"/>
    </div>

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
      <template v-if="isLogged">
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
      </template>
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
