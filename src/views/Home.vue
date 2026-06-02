<template>
  <Full-screen-container>
    <div class="app-container">
      <Header @update-type="handleTypeUpdate" @search-device="handleSearchDevice"
        @change-type-focus="handleChangeTypeFocus" @set-type="handleSetType" @clear-search="handleClearSearch"
        @nav-change="handleNavChange" @logout="handleLogout" />
      <div class="content-area">
        <MapCanvas v-if="currentNav === 'gis'" ref="mapCanvasRef" :active-type="activeType"
          @update-type="handleTypeUpdate" />
        <Dashboard v-else />
        <DataPanel v-if="currentNav === 'gis'" :active-type="activeType" @region-click="handleRegionClick"
          @station-click="handleStationClick" @device-click="handleDeviceClick" />
      </div>
    </div>
  </Full-screen-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FullScreenContainer } from '@kjgl77/datav-vue3'
import Header from '../components/Header.vue'
import MapCanvas from '../components/MapCanvas.vue'
import DataPanel from '../components/DataPanel.vue'
import Dashboard from '../components/Dashboard.vue'

const router = useRouter()
const route = useRoute()
const activeType = ref<string>('shared-car')
const currentNav = ref<string>('gis')
const mapCanvasRef = ref<InstanceType<typeof MapCanvas>>()

const handleTypeUpdate = (type: string) => {
  activeType.value = type
  // if (activeType.value === type) {
  //   activeType.value = ''
  // } else {

  // }
}

const handleSearchDevice = (deviceId: string) => {
  mapCanvasRef.value?.searchDevice(deviceId)
}

const handleChangeTypeFocus = (type: string) => {
  mapCanvasRef.value?.focusOnType(type)
}

const handleSetType = (type: string) => {
  activeType.value = type
}

const handleClearSearch = () => {
  mapCanvasRef.value?.clearSearch()
}

const handleRegionClick = (regionName: string) => {
  mapCanvasRef.value?.focusOnRegion(regionName)
}

const handleStationClick = (stationName: string) => {
  mapCanvasRef.value?.focusOnStation(stationName)
}

const handleDeviceClick = (deviceName: string) => {
  mapCanvasRef.value?.searchDevice(deviceName)
}

const handleNavChange = (nav: string) => {
  currentNav.value = nav
  router.push({ query: { view: nav } })
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  router.push('/login')
}

onMounted(() => {
  const view = route.query.view as string
  if (view && (view === 'gis' || view === 'dashboard')) {
    currentNav.value = view
  }
})

watch(() => route.query.view, (newView) => {
  if (newView && (newView === 'gis' || newView === 'dashboard')) {
    currentNav.value = newView
  }
})
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>
