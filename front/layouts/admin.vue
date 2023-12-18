<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col h-[100vh]">
    <AdminHeaderBar/>
    <div class="w-full h-full flex justify-center items-center">
        <slot/>
    </div>
  </div>
</template>
