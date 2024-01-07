<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

const { params } = useRoute()
const options = ref<ApexOptions>({

})
</script>

<template>
  <Head>
    <Title>
      CryptoHUB &mdash; {{ params?.slug }}
    </Title>
  </Head>
  <Section
    title="Price Chart"
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus."
  >
    <VueApexCharts
      type="line"
      :options="options"
      width="100%"
      height="100%"
      :series="[
        {
          name: 'BTC',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },
      ]"
    />
  </Section>
</template>
