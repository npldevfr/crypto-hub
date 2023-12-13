<script setup lang="ts" generic="T">
interface DataTableProps {
  isLoading?: boolean
  columns: DataTableColumn[]
  data: T[] | []
  sort?: DataTableSort
  multiple?: boolean
}

const query = defineModel<string>('query', {
  default: ''
})
const sortable = defineModel<DataTableSort>('sort', {
  default: {
    column: '',
    direction: 'asc'
  }
})
const modelValue = defineModel<T[]>('modelValue', {
  default: []
})

type SortValues = 'asc' | 'desc'

interface DataTableSort {
  column: string
  direction: SortValues
}

interface DataTableColumn {
  name: string
  label: string
  sortable?: boolean
  type?: string
  format?: (value: any) => string
}

const props = defineProps<DataTableProps>()
const icons = {
  asc: 'i-mdi-arrow-up',
  desc: 'i-mdi-arrow-down'
}

// on sort update sort state
const onSort = (column: DataTableColumn) => {
  if (!column.sortable) return
  if (sortable.value.column === column.name) {
    sortable.value.direction = sortable.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sortable.value.column = column.name
    sortable.value.direction = 'asc'
  }
}

const toggleSelectedItem = (item: T) => {
  if (!props.multiple) {
    modelValue.value = [item]
    return
  }
  const index = modelValue.value.findIndex((value) => value === item)
  if (index === -1) {
    modelValue.value.push(item)
  } else {
    modelValue.value.splice(index, 1)
  }
}

</script>

<template>

  <div class="w-full flex justify-between items-center">
    <div class="w-1/4">
      <FormKit
          type="text"
          placeholder="Rechercher"
          v-model="query"
      />
    </div>
    <slot/>
  </div>
  <div class="relative w-full bg-stone-100 border border-stone-300/50 rounded-md">
    <table class="w-full table-auto select-none overflow-hidden rounded">
      <thead class="bg-stone-100">
      <tr class="border-b border-stone-200/50 ">
        <th class="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-stone-500"
            v-for="column in props.columns" :key="column.name">
          <div class="flex w-fit px-2 py-1 rounded cursor-pointer gap-2 items-center"
               @click="onSort(column)"
               :class="{'cursor-pointer hover:bg-stone-200': column.sortable}">
            {{ column.label }}

            <div v-if="column.sortable && sortable.column === column.name"
                 class="inline-flex items-center">
              <div v-if="sortable.column === column.name && sortable.direction === 'asc'" class="ml-1 text-stone-500"
                   :class="icons.asc"></div>
              <div v-if="sortable.column === column.name && sortable.direction === 'desc'" class="ml-1 text-stone-500"
                   :class="icons.desc"></div>
            </div>
          </div>

        </th>
      </tr>
      </thead>
      <tbody class="bg-stone-50 divide-y divide-stone-200">
      <tr class="bg-stone-50 hover:bg-stone-100 cursor-pointer " v-for="(item, key) in props.data" :key="key">
        <td class="whitespace-nowrap text-sm px-6 py-2"
            :class="{'bg-stone-100': modelValue.includes(item)}"
            @click="toggleSelectedItem(item)"
            v-for="column in props.columns" :key="column.name">
          {{ column.format ? column.format(item[column.name]) : item[column.name] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

