<script setup lang="ts">
import { ref, computed } from "vue";
import { articleServiceController } from "~/services/articleServiceController";

const { index } = articleServiceController();
const { data: articles } = index();

const searchQuery = ref("");

const filteredArticles = computed(() => {
  if (!articles.value) return [];
  return articles.value.filter((article) =>
    article.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="search-bar-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher un article..."
      class="search-input"
    />
  </div>

  <div v-if="filteredArticles" class="px-20 py-15">
    <NuxtLink
      v-for="(article, index) in filteredArticles"
      :key="index"
      :to="`/article/${article.slug}`"
    >
      <CardNews
        :title="article.name"
        :vertical-layout="false"
        image-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
        additional-info="Information supplémentaire"
        avatar-url="https://exemple.com/avatar.jpg"
        :tags="['#Crypto', '#News']"
        :date="article.created_at.split('T')[0]"
      />
    </NuxtLink>
  </div>

  <div class="flex flex-row space-x-10 px-20 py-10">
    <NuxtLink
      v-for="(article, index) in filteredArticles"
      :key="index"
      :to="`/article/${article.slug}`"
    >
      <CardNews
        vertical-layout
        card-height="medium"
        :title="article.name"
        description="Description ici..."
        additional-info="Informations supplémentaires"
        :tags="['Actu', 'Tag2']"
        :date="article.created_at.split('T')[0]"
      />
      <br />
    </NuxtLink>
  </div>
</template>

<style>
.search-bar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
}

.search-input {
  width: 50%; /* Ajustez la largeur selon vos besoins */
  padding: 10px;
  font-size: 16px; /* Ajustez la taille de police si nécessaire */
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
