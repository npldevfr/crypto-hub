<script setup lang="ts">
import { ref } from 'vue'
import { articleSourcesServiceController } from '~/services/articleSourcesServiceController'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const router = useRouter()
const { index, addRssSource, verifyRssSource } = articleSourcesServiceController()
const { data: paginatedSourcesList, page } = index()

const newUrl = ref('') // This is the new URL input field value
const errorMessage = ref('') // Error message for displaying any validation or server errors
const refreshDataTable = ref(false) // Reactive variable to trigger DataTable refresh

async function addUrl() {
  errorMessage.value = '' // Clear previous error message

  // Validate the RSS source before adding
  const isValidRss = await verifyRssSource(newUrl.value)

  if (isValidRss) {
    try {
      // Attempt to add the RSS source
      await addRssSource(newUrl.value)
      // Clear the input field
      newUrl.value = ''
      // Refresh the current page
      router.go(0) // This will reload the current route
    }
    catch (error) {
      // Handle server errors
      errorMessage.value = 'Une erreur s\'est produite lors de l\'ajout de la source.'
    }
  }
  else {
    // Display validation error if the RSS source is not valid
    errorMessage.value = 'L\'URL RSS n\'est pas valide.'
  }
}
</script>

<template>
  <div class="w-full h-full gap-2">
    <Head>
      <Title>CryptoHUB &mdash; Sources d'articles</Title>
    </Head>

    <div class="p-4">
      <Section
        title="Ajouter une source d'article"
        subtitle="Ajoutez une nouvelle source d'article en spécifiant l'URL RSS"
      >
        <!-- New block for adding URL -->
        <div class="flex items-center gap-4 mb-4">
          <input v-model="newUrl" type="text" class="border p-2" placeholder="Nouvelle URL RSS">
          <Button hierarchy="primary" size="md" @click="addUrl">
            Ajouter
          </Button>
        </div>

        <!-- Display error message if any -->
        <div v-if="errorMessage" class="text-red-500 mb-4">
          {{ errorMessage }}
        </div>

        <!-- Existing code for displaying sources list with a key to trigger reactivity -->
        <DataTable
          v-if="paginatedSourcesList"
          :key="refreshDataTable"
          v-model:query="query"
          v-model:sort="sortable"
          :data="paginatedSourcesList?.data"
          :handle="(e) => router.push({ name: 'admin-articles-id', params: { id: e.id } })"
          :columns="[
            { name: 'name', label: 'Nom', sortable: true },
            { name: 'url', label: 'URL RSS', sortable: true },
            { name: 'created_at', label: 'Créé le', format: (value) => new Date(value).toLocaleDateString() },
            { name: 'is_active', label: 'Actif', format: (value) => value ? 'Oui' : 'Non' },
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
