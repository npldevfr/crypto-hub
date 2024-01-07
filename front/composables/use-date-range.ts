import type { Ref } from 'vue'
import { computed, ref } from 'vue'

interface DateRange {
  applyPreset: (preset: PresetDateRange) => void
  end: Ref<Date>
  findPresetsByKey: (key: string) => PresetDateRange | undefined
  presets: PresetDateRange[]
  isActivePreset: (key: string) => Ref<boolean>
  setEnd: (date: Date) => void
  setStart: (date: Date) => void
  start: Ref<Date>
}

interface PresetDateRange {
  key: string
  name: string
  start: Date
  end: Date
}

export function useDateRange(initialStart: Date, initialEnd: Date): DateRange {
  /**
   * Start and end date
   */
  const start: Ref<Date> = ref<Date>(initialStart)
  const end: Ref<Date> = ref<Date>(initialEnd)

  /**
   * Set the start date
   * @param date
   */
  const setStart = (date: Date): void => {
    start.value = date
  }

  /**
   * Set the end date
   * @param date
   */
  const setEnd = (date: Date): void => {
    end.value = date
  }

  /**
   * Preset date ranges
   */
  const presets: PresetDateRange[] = [
    {
      key: 'last_24_hours',
      name: '24 dernières heures',
      start: new Date(new Date().setDate(new Date().getDate() - 1)),
      end: new Date(),
    },
    {
      key: 'last_7_days',
      name: '7 derniers jours',
      start: new Date(new Date().setDate(new Date().getDate() - 7)),
      end: new Date(),
    },
    {
      key: 'last_30_days',
      name: '30 derniers jours',
      start: new Date(new Date().setDate(new Date().getDate() - 30)),
      end: new Date(),
    },
    {
      key: 'last_3_months',
      name: '3 derniers mois',
      start: new Date(new Date().setMonth(new Date().getMonth() - 3)),
      end: new Date(),
    },
    {
      key: 'last_6_months',
      name: '6 derniers mois',
      start: new Date(new Date().setMonth(new Date().getMonth() - 6)),
      end: new Date(),
    },
    {
      key: 'current_year',
      name: 'Année en cours',
      start: new Date(new Date().getFullYear(), 0, 1),
      end: new Date(),
    },
  ]

  /**
   * Find a preset by key
   * @param key
   */
  const findPresetsByKey = (key: string): PresetDateRange | undefined => {
    return presets.find((preset: PresetDateRange): boolean => preset.key === key)
  }

  /**
   * Check if a preset is active
   * @param key
   */
  const isActivePreset = (key: string) => computed((): boolean => {
    const preset: PresetDateRange | undefined = findPresetsByKey(key)
    if (!preset)
      return false

    return preset.start.getTime() === start.value.getTime() && preset.end.getTime() === end.value.getTime()
  })

  /**
   * Apply a preset date range
   * @param preset
   */
  const applyPreset = (preset: PresetDateRange): void => {
    start.value = preset.start
    end.value = preset.end
  }

  return {
    applyPreset,
    end,
    findPresetsByKey,
    isActivePreset,
    presets,
    setEnd,
    setStart,
    start,
  }
}
