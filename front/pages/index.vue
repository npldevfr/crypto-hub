<script setup lang="ts">
import { articleServiceController } from "~/services/articleServiceController";

const { show } = articleServiceController();
const { data: articles } = show();
</script>

<template>
  <pre>{{ articles }}</pre>
  <div v-if="articles" class="px-20 py-15">
    <CardNews
      v-for="(article, index) in articles"
      :key="index"
      :title="article.name"
      :vertical-layout="false"
      image-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
      additional-info="Information supplémentaire"
      avatar-url="https://exemple.com/avatar.jpg"
      author-name="Nom de l'auteur"
      :tags="['#photography', '#travel', '#winter']"
    />
  </div>

  <!--   <div class="flex flex-row space-x-10 px-20 py-10">
    <CardNews
      vertical-layout
      card-height="medium"
      image-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
      title="Titre de la Carte"
      description="Description ici..."
      author-name="Nom de l'Auteur"
      additional-info="Informations supplémentaires"
      :tags="['Tag1', 'Tag2']"
    />
    <CardNews
      vertical-layout
      card-height="s"
      image-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
      title="Titre de la Carte"
      description="Description ici..."
      author-name="Nom de l'Auteur"
      additional-info="Informations supplémentaires"
      :tags="['Tag1', 'Tag2']"
    />
  </div> -->
</template>
