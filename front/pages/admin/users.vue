<script setup lang="ts">
import {userService} from "~/services/user.service";
import type {User} from "~/composables/use-auth";

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const {getPaginatedUsers, updateUser, deleteUser} = userService()
const {data: paginatedUsersList, get, page, sortable, query} = getPaginatedUsers()
const { userId: updateUserId, put: updateSelectedUser } = updateUser()
const { userId: deleteUserId, destroy: deleteSelectedUser } = deleteUser()
const selected = ref<User[]>([])

// When the selected user changes, update the userIds for the update and delete requests
watch(selected, (value) => {
  const userId = value[0]?.id
  if (userId) {
    updateUserId.value = userId
    deleteUserId.value = userId
  } 
})


</script>

<template>
  <Head>
    <Title>CryptoHUB &mdash; Utilisateurs</Title>
  </Head>


  <div class="w-full grid h-full grid-cols-3 gap-2">
    <div class="p-4" :class="{
        'col-span-3': selected.length === 0,
        'col-span-2': selected.length > 0
      }">

      <Section title="Utilisateurs"
               subtitle="Liste des utilisateurs de la plateforme">

        <DataTable :data="paginatedUsersList?.data"
                   v-if="paginatedUsersList"
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
                      :per-page="paginatedUsersList?.meta.per_page"
                      :total="paginatedUsersList?.meta.total"
                      show-edges
          />
        </DataTable>
      </Section>
    </div>
    <div v-if="selected.length > 0" class="col-span-1">
      <UserManagementCard @close="selected = []" :user="selected[0]"/>
    </div>
  </div>
</template>
