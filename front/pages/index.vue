<script setup lang="ts">
import { articleServiceController } from "~/services/articleServiceController";

const { home } = articleServiceController();
const { data: articles } = home();
const { index } = articleServiceController();
const { data: articlesAll } = index();
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

  <swiper
    :slides-per-view="3"
    :effect="'creative'"
    :modules="[SwiperAutoplay]"
    :autoplay="{
      delay: 4000,
      disableOnInteraction: true,
    }"
  >
    <SwiperSlide v-for="(article, index) in articlesAll" :key="index">
      <div class="px-2">
        <NuxtLink :key="index" :to="`/article/${article.slug}`"
          ><CardNews
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
        </NuxtLink>
      </div>
    </SwiperSlide>
  </swiper>
</template>
