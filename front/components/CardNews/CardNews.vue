<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    verticalLayout: boolean;
    imageUrl: string;
    title: string;
    description: string;
    tags?: string[];
    additionalInfo?: string;
    avatarUrl?: string;
    authorName?: string;
    date?: Date | string;
  }>(),
  {
    verticalLayout: true,
    tags: [],
    additionalInfo: "",
    avatarUrl: "",
    authorName: "",
    date: new Date(),
  }
);

const formatDate = (date: Date | string) => {
  if (date instanceof Date) {
    return date.toLocaleDateString("fr-FR", {});
  } else {
    return date;
  }
};
</script>

<template>
  <div
    v-if="verticalLayout"
    class="max-w-xs rounded overflow-hidden w-full shadow-lg"
  >
    <img class="w-full" :src="imageUrl" alt="Image de la carte" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <p class="text-gray-700 text-base">{{ description }}</p>
      <p class="text-gray-900 mt-3 leading-none" v-if="authorName">
        {{ authorName }}
      </p>
      <p class="text-gray-600 text-sm" v-if="date">{{ date }}</p>

      <p class="text-sm text-gray-600 px-3 py-3 flex items-center">
        {{ additionalInfo }}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <Tag v-for="tag in tags" :key="tag" :text="tag" />
    </div>
  </div>
  <div v-else class="max-w-sm w-full lg:max-w-full lg:flex">
    <div
      class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-l text-center overflow-hidden"
      :style="`background-image: url('${imageUrl}')`"
      :title="additionalInfo"
    ></div>
    <div
      class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
    >
      <div class="mb-8">
        <p class="text-sm text-gray-600 flex items-center">
          {{ additionalInfo }}
        </p>
        <div class="text-gray-900 font-bold text-xl mb-2">{{ title }}</div>
        <p class="text-gray-700 text-base">{{ description }}</p>
      </div>
      <div class="flex items-center" v-if="avatarUrl">
        <div class="text-sm">
          <p class="text-gray-900 leading-none" v-if="authorName">
            {{ authorName }}
          </p>
          <p class="text-gray-600" v-if="date">{{ date }}</p>
          <div class="px-6 pt-4 pb-2">
            <Tag v-for="tag in tags" :key="tag" :text="tag" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
