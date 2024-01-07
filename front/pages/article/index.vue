<script setup lang="ts">
import { articleServiceController } from "~/services/articleServiceController";

const { index } = articleServiceController();
const { data: articles } = index();
</script>

<template>
  <div v-if="articles" class="px-20 py-15">
    <NuxtLink
      v-for="(article, index) in articles"
      :key="index"
      :to="`/article/${article.slug}`"
      ><CardNews
        :title="article.name"
        :vertical-layout="false"
        image-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
        additional-info="Information supplémentaire"
        avatar-url="https://exemple.com/avatar.jpg"
        :tags="['#Crypto', '#News', '#winter']"
        :date="article.created_at.split('T')[0]"
      />
    </NuxtLink>
  </div>

  <div class="flex flex-row space-x-10 px-20 py-10">
    <NuxtLink
      v-for="(article, index) in articles"
      :key="index"
      :to="`/article/${article.slug}`"
    >
      <CardNews
        vertical-layout
        card-height="medium"
        image-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
        :title="article.name"
        description="Description ici..."
        author-name="Nom de l'Auteur"
        additional-info="Informations supplémentaires"
        :tags="['Tag1', 'Tag2']"
        :date="article.created_at.split('T')[0]"
      />
      <br />
    </NuxtLink>
  </div>
</template>
