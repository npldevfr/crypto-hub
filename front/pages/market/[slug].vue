<script setup lang="ts">
import {capitalize} from "@antfu/utils";

const { params } = useRoute()
</script>

<template>
  <Head>
    <Title>
      CryptoHUB &mdash; {{ capitalize(params?.slug) }}
    </Title>
  </Head>
</template>
