<script setup lang="ts">
const {hasRoles} = useHasRoles()
const {user} = useAuth()
</script>

<template>
  <div class="w-full flex items-center justify-between bg-stone-900 h-[35px]" v-if="hasRoles(['admin'])">
    <div class="flex flex-row h-full">
      <AdminHeaderItem to="/admin" name="Dashboard" icon="i-mdi-view-dashboard-outline"/>
      <AdminHeaderItem to="/admin/users" name="Utilisateurs" icon="i-mdi-account-group-outline"/>
      <AdminHeaderItem to="/admin/articles" name="Articles" icon="i-mdi-newspaper-variant-outline"/>
      <AdminHeaderItem to="/admin/cryptocurrencies" name="Cryptomonnaies" icon="i-mdi-currency-btc"/>
    </div>
    <AdminHeaderItem
      :name="user?.roles.map(role => role.name).join(', ')"
      icon="i-mdi-account-circle-outline" />
  </div>
</template>

