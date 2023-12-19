<script setup lang="ts">
import { userServiceController } from '~/services/userServiceController'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const router = useRouter()
const { index } = userServiceController()
const { data: paginatedUsersList, page, sortable, query } = index()
</script>

<template>
  <Head>
    <Title>CryptoHUB &mdash; Utilisateurs</Title>
  </Head>

  <div class="w-full h-full gap-2">
    <div class="p-4">
      <Section
        title="Utilisateurs"
        subtitle="Liste des utilisateurs de la plateforme"
      >
        <DataTable
          v-if="paginatedUsersList"
          v-model:query="query"
          v-model:sort="sortable"
          :data="paginatedUsersList?.data"
          :handle="(e) => router.push({ name: 'admin-users-id', params: { id: e.id } })"
          :columns="[
            { name: 'email', label: 'Email', sortable: true },
            { name: 'username', label: 'Nom d\'utilisateur', sortable: true },
            { name: 'created_at', label: 'Créé le', format: (value) => new Date(value).toLocaleDateString() },
          ]"
        >
          <Pagination
            v-model:page="page"
            :per-page="paginatedUsersList?.meta.per_page"
            :total="paginatedUsersList?.meta.total"
            show-edges
          />
        </DataTable>
      </Section>
    </div>
  </div>
</template>
