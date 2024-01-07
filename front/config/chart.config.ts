import type { ApexOptions } from 'apexcharts'

const { chart, tooltip, grid }: ApexOptions = {
  chart: {
    fontFamily: 'Inter',
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  grid: {
    borderColor: 'rgba(91,7,7,0.1)',
  },
  tooltip: {},
}

export {
  grid,
  chart,
  tooltip,
}
