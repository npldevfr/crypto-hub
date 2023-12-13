<script setup lang="ts">
import {userService} from "~/services/user.service";
import type {User} from "~/composables/use-auth";

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const {getPaginatedUsers} = userService()
const {data, get, page, sortable, query} = getPaginatedUsers()
const selected = ref<User[]>([])


</script>

<template>
  <Head>
    <Title>◈ CryptoHUB &mdash; Utilisateurs</Title>
  </Head>
  <Section
      title="Gestion des utilisateurs"
      subtitle="Liste des utilisateurs">

    <div class="w-full grid grid-cols-3 gap-2">
      <div :class="{
        'col-span-3': selected.length === 0,
        'col-span-2': selected.length > 0
      }">

        <DataTable :data="data?.data"
                   v-if="data"
                   v-model:query="query"
                   v-model:sort="sortable"
                   v-model="selected"
                   :columns="[
                    { name: 'email', label: 'Email', sortable: true},
                    { name: 'username', label: 'Nom d\'utilisateur', sortable: true},
                    { name: 'created_at', label: 'Créé le', format: (value) => new Date(value).toLocaleDateString()}
               ]"
        >
          <Pagination v-model:page="page"
                      :per-page="data?.meta.per_page"
                      :total="data?.meta.total"
                      show-edges
          />
        </DataTable>
      </div>
      <div v-if="selected.length > 0" class="col-span-1">
        <UserManagementCard @close="selected = []" :user="selected[0]"/>
      </div>
    </div>
  </Section>
</template>
