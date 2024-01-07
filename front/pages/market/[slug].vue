<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { subDays } from 'date-fns'
import { capitalize } from 'vue'
import { cryptocurrencyDataServiceController } from '~/services/cryptocurrencyDataServiceController'
import { chart } from '~/config/chart.config'

const { params } = useRoute()
const { show } = cryptocurrencyDataServiceController()
const { start, end, applyPreset, presets, isActivePreset } = useDateRange(subDays(new Date(), 7), new Date())

const { data: cryptocurrency, post: updateCryptoConfig } = show(params?.slug as string)
const options = ref<ApexOptions>({
  chart: {
    ...chart,
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    labels: {
      formatter: (value: number) => {
        return `${value.toFixed(2)}€`
      },
    },
  },
  dataLabels: {
    formatter: (value: number) => {
      return `$${value.toFixed(2)}`
    },
  },
})

watch([start, end], () => {
  /**
   * Stacked Bar Chart for teams
   */
  // if dates are valid Date objects then execute the request
  if (!start.value || !end.value)
    return

  updateCryptoConfig({
    start_time: start.value?.toISOString(),
    end_time: end.value?.toISOString(),
  }).execute()
})
</script>

<template>
  <Head>
    <Title>
      CryptoHUB &mdash; {{ params?.slug }}
    </Title>
  </Head>
  <Section
    v-if="cryptocurrency"
    :title="capitalize(params?.slug)"
    :logo="cryptocurrency?.logo"
    subtitle="Retrouvez toutes les informations sur la crypto-monnaie"
  >
    <div class="flex flex-row gap-2">
      <ButtonFilter
        v-for="preset in presets"
        :key="preset.name"
        :hierarchy="isActivePreset(preset.key).value ? 'primary' : 'secondary-outline'"
        size="xxs"
        @click="applyPreset(preset)"
      >
        {{ preset.name }}
      </ButtonFilter>
    </div>
    <DateRange
      v-model:start="start"
      v-model:end="end"
    />
    <VueApexCharts
      type="line"
      :options="options"
      width="100%"
      height="300px"
      :series="[
        {
          name: 'Price',
          data: cryptocurrency?.prices,
        },
      ]"
    />
  </Section>
</template>
