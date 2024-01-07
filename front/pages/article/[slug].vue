<script setup lang="ts">
import { articleServiceController } from "~/services/articleServiceController";
import { useRoute } from "vue-router";

const { params } = useRoute();
const { show } = articleServiceController();
const { data: article } = show(params?.slug as string);
</script>

<template>
  <div class="container mx-auto p-4" v-if="article">
    <Head>
      <Title> CryptoHUB &mdash; {{ article.slug }} </Title>
    </Head>

    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 class="font-bold text-xl mb-2">{{ article.name }}</h1>
      <h2 class="text-gray-700 text-base">
        Publié le {{ new Date(article.created_at).toLocaleDateString() }}
      </h2>
      <div v-if="article.image_url !== 'default_image_url'" class="my-4">
        <img
          :src="article.image_url"
          alt="Image de l'article"
          class="w-full h-auto object-cover rounded"
        />
      </div>
      <div
        v-html="article.content"
        class="article-content text-gray-700 text-base"
      ></div>
    </div>
  </div>
  <div v-else>
    <p>Chargement de l'article...</p>
  </div>
</template>

<style scoped></style>
