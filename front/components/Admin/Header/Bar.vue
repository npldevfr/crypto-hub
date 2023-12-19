<script setup lang="ts">
const { hasRoles } = useHasRoles()
const { user } = useAuth()
const route = useRoute()

const isOnAdminPage = computed(() => {
  return route.fullPath.match(/^\/admin/) !== null
})
</script>

<template>
  <div v-if="hasRoles(['admin'])" class="w-full flex items-center justify-between bg-zinc-900 border-b border-stone-20à h-[35px]">
    <div class="flex flex-row h-full">
      <AdminHeaderItem v-if="isOnAdminPage" to="/" name="Retour au site" icon="i-mdi-arrow-back" />
      <AdminHeaderItem to="/admin" name="Dashboard" icon="i-mdi-view-dashboard-outline" />
      <AdminHeaderItem to="/admin/users" name="Utilisateurs" icon="i-mdi-account-group-outline" />
      <AdminHeaderItem to="/admin/articles" name="Articles" icon="i-mdi-newspaper-variant-outline" />
      <AdminHeaderItem to="/admin/cryptocurrencies" name="Cryptomonnaies" icon="i-mdi-currency-btc" />
    </div>
    <AdminHeaderItem :name="`Mode ${user?.roles.map(role => role.name).join(', ').toLowerCase()}`" />
  </div>
</template>
