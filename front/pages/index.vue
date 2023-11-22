<script setup lang="ts">
const dd = useRouter();
</script>

<template>
  <Header />
  <div class="px-20 py-15">
    <CardNews
      :verticalLayout="false"
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
      title="Titre de la carte horizontale"
      description="Description de la carte horizontale"
      additionalInfo="Information supplémentaire"
      avatarUrl="https://exemple.com/avatar.jpg"
      authorName="Nom de l'auteur"
      date="Date de publication"
      :tags="['#photography', '#travel', '#winter']"
    />
  </div>

  <div class="flex flex-row space-x-10 px-20 py-10">
    <CardNews
      :verticalLayout="true"
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
      title="The Coldest Sunset"
      date="Date de publication"
      authorName="Nom de l'auteur"
      additionalInfo="Information supplémentaire"
      description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."
      :tags="['#photography', '#travel', '#winter']"
    />
    <CardNews
      :verticalLayout="true"
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARfTOMEBVV1_3fc3Ga_9E_UZ1pBnSGRHCG-qkB-3czg&s"
      title="The Coldest Sunset"
      date="Date de publication"
      authorName="Nom de l'auteur"
      additionalInfo="Information supplémentaire"
      description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."
      :tags="['#photography', '#travel', '#winter']"
    />
  </div>
</template>
