<script setup lang="ts">
import { articleSourcesServiceController } from '~/services/articleSourcesServiceController'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const router = useRouter()
const { index } = articleSourcesServiceController()
const { data: paginatedSourcesList, page, sortable, query } = index()
</script>

<template>
  <Head>
    <Title>CryptoHUB &mdash; Sources d'articles</Title>
  </Head>

  <div class="w-full h-full gap-2">
    <div class="p-4">
      <Section
        title="Sources d'articles"
        subtitle="Liste des sources d'articles de la plateforme"
      >
        <DataTable
          v-if="paginatedSourcesList"
          v-model:query="query"
          v-model:sort="sortable"
          :data="paginatedSourcesList?.data"
          :columns="[
            { name: 'rssUrl', label: 'URL RSS', sortable: true },
            { name: 'created_at', label: 'Créé le', format: (value) => new Date(value).toLocaleDateString() },
          ]"
        >
          <Pagination
            v-model:page="page"
            :per-page="paginatedSourcesList?.meta.per_page"
            :total="paginatedSourcesList?.meta.total"
            show-edges
          />
        </DataTable>
      </Section>
    </div>
  </div>
</template>

<style scoped>
</style>
