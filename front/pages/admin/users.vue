<script setup lang="ts">
import {userService} from "~/services/user.service";

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const {getPaginatedUsers} = userService()
const {data, get, page, sortable, query} = getPaginatedUsers()



</script>

<template>
  <Section
      title="Gestion des utilisateurs"
      subtitle="Liste des utilisateurs">
<!--    <pre>-->
<!--      {{ data }}-->
<!--    </pre>-->
    <DataTable :data="data?.data"
               v-model:query="query"
               v-model:sort="sortable"
               v-model:page="page"
               :columns="[
                    { name: 'email', label: 'Email', sortable: true},
                    { name: 'username', label: 'Nom d\'utilisateur', sortable: true},
                    { name: 'created_at', label: 'Créé le', format: (value) => new Date(value).toLocaleDateString()}
               ]"
    />
  </Section>
</template>

<style scoped>

</style>
