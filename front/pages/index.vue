<script setup lang="ts">
const dd = useRouter();
</script>

<template>
  <div class="px-20 py-15">
    <CardNews
      :vertical-layout="false"
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
      title="Titre de la carte horizontale"
      description="Description de la carte horizontale"
      additionalInfo="Information supplémentaire"
      avatarUrl="https://exemple.com/avatar.jpg"
      authorName="Nom de l'auteur"
      :tags="['#photography', '#travel', '#winter']"
    />
  </div>

  <div class="flex flex-row space-x-10 px-20 py-10">
    <CardNews
      verticalLayout
      cardHeight="medium"
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
      title="Titre de la Carte"
      description="Description ici..."
      authorName="Nom de l'Auteur"
      additionalInfo="Informations supplémentaires"
      :tags="['Tag1', 'Tag2']"
    />
    <CardNews
      verticalLayout
      cardHeight="s"
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
      title="Titre de la Carte"
      description="Description ici..."
      authorName="Nom de l'Auteur"
      additionalInfo="Informations supplémentaires"
      :tags="['Tag1', 'Tag2']"
    />
  </div>
</template>
