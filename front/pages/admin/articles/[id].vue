<script setup lang="ts">
import { articleSourcesServiceController } from '~/services/articleSourcesServiceController'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const { params } = useRoute()
const { push } = useRouter()
const source_id = params.id.toString()
const { show, destroy, toggleActiveStatus } = articleSourcesServiceController()

const { data: source, get: refreshSource } = show(source_id)

function handleToggleActive() {
  toggleActiveStatus(source_id)
    .execute()
    .then(() => refreshSource().execute())
}
function handleDeleteSource() {
  destroy(source_id)
    .execute()
    .then(() => push('/admin/articles'))
}
</script>

<template>
  <div>
    <Head>
      <Title>CryptoHUB &mdash; Sources d'articles</Title>
    </Head>

    <div class="flex space-x-4">
      <Button
        danger
        size="lg"
        @click="handleDeleteSource"
      >
        Supprimer
      </Button>

      <Button
        size="lg"
        :danger="!source?.is_active"
        @click="handleToggleActive"
      >
        {{ source?.is_active ? 'Désactiver' : 'Activer' }}
      </Button>
    </div>

    <Section
      title="Source d'article"
      subtitle="Détails de la source d'article"
    >
      <!-- Affichage des valeurs stylisé -->
      <div class="source-details">
        <div class="source-detail">
          <label class="detail-label">Nom:</label>
          <span class="detail-value">{{ source?.name }}</span>
        </div>
        <div class="source-detail">
          <label class="detail-label">URL RSS:</label>
          <span class="detail-value">{{ source?.url }}</span>
        </div>
      </div>
    </Section>
  </div>
</template>

<style scoped>
.source-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.source-detail {
  display: flex;
  align-items: center;
}

.detail-label {
  font-weight: bold;
  margin-right: 10px;
}

.detail-value {
  word-break: break-all;
}
</style>
