<template>
  <div ref="chartRef" :class="[className, { 'chart-auto-height': !height }]" :style="chartStyle"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  option: echarts.EChartsOption
  className?: string
  width?: string | number
  height?: string | number
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const chartStyle = computed(() => {
  const style: Record<string, string> = {
    width: props.width || '100%'
  }
  if (props.height) {
    style.height = String(props.height)
  }
  return style
})

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption(props.option)
}

const handleResize = () => {
  chartInstance?.resize()
}

watch(() => props.option, (newOption) => {
  chartInstance?.setOption(newOption, true)
}, { deep: true })

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<style scoped>
.chart-auto-height {
  flex: 1;
  min-height: 0;
  height: 100%;
}
</style>