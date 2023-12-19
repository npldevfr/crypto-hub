<script setup lang="ts">
</script>

<template>
  <div class="px-20 py-15">
    <CardNews
      :vertical-layout="false"
      image-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
      title="Titre de la carte horizontale"
      description="Description de la carte horizontale"
      additional-info="Information supplémentaire"
      avatar-url="https://exemple.com/avatar.jpg"
      author-name="Nom de l'auteur"
      :tags="['#photography', '#travel', '#winter']"
    />
  </div>

  <div class="flex flex-row space-x-10 px-20 py-10">
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
  </div>
</template>
