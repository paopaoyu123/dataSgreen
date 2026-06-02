<template>
    <!-- GIS地图页面--右侧内容 -->
    <div class="data-panel">
        <BorderBox8 :dur="5" :color="['#4facfe', '#00f2fe']">
            <div class="panel-section">
                <div class="panel-header">
                    <h3 class="panel-title">区域</h3>
                </div>
                <div class="panel-content">
                    <div class="region-list">
                        <div v-for="item in regionData" :key="item.name" class="region-item"
                            @click="handleRegionClick(item)">
                            <span class="region-name">{{ item.name }}</span>
                            <span class="region-count">{{ getCurrentTypeCount(item) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel-section">
                <div class="panel-header">
                    <h3 class="panel-title">站点数量</h3>
                </div>
                <div class="panel-content">
                    <div class="region-list">
                        <div v-for="item in stationData" :key="item.name" class="region-item"
                            @click="handleStationClick(item)">
                            <span class="region-name">{{ item.name }}</span>
                            <span class="region-count">{{ item.count }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel-section">
                <div class="panel-header">
                    <h3 class="panel-title">{{ getCurrentTypeTitle }}</h3>
                </div>
                <div class="panel-content">
                    <div class="region-list">
                        <div v-for="item in getPaginatedDeviceList" :key="item.id" class="region-item"
                            @click="handleDeviceClick(item)">
                            <span class="region-name">{{ item.name }}</span>
                            <span :class="['status-tag', getStatusClass(item.statusText)]">{{ item.statusText }}</span>
                        </div>
                    </div>
                    <div class="pagination" v-if="getDeviceTotalPages > 1">
                        <span class="pagination-info">{{ deviceCurrentPage }}/{{ getDeviceTotalPages }}</span>
                        <div class="pagination-buttons">
                            <button class="pagination-btn" @click="devicePrevPage"
                                :disabled="deviceCurrentPage <= 1">‹</button>
                            <button class="pagination-btn" @click="deviceNextPage"
                                :disabled="deviceCurrentPage >= getDeviceTotalPages">›</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel-section">
                <div class="panel-header">
                    <h3 class="panel-title">{{ getCurrentFaultTypeTitle }}</h3>
                </div>
                <div class="panel-content">
                    <div class="region-list">
                        <div v-for="item in getPaginatedFaultList" :key="item.id" class="region-item"
                            @click="handleDeviceClick(item)">
                            <span class="region-name">{{ item.name }}</span>
                            <span :class="['status-tag', getStatusClass(item.statusText)]">{{ item.statusText }}</span>
                        </div>
                    </div>
                    <div class="pagination" v-if="getTotalPages > 1">
                        <span class="pagination-info">{{ faultCurrentPage }}/{{ getTotalPages }}</span>
                        <div class="pagination-buttons">
                            <button class="pagination-btn" @click="faultPrevPage"
                                :disabled="faultCurrentPage <= 1">‹</button>
                            <button class="pagination-btn" @click="faultNextPage"
                                :disabled="faultCurrentPage >= getTotalPages">›</button>
                        </div>
                    </div>
                </div>
            </div>
        </BorderBox8>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { BorderBox8 } from '@kjgl77/datav-vue3'

const props = defineProps<{
    activeType: string
}>()

const emit = defineEmits<{
    (e: 'region-click', regionName: string): void
    (e: 'station-click', stationName: string): void
    (e: 'device-click', deviceName: string): void
}>()

const faultCurrentPage = ref(1)
const faultPageSize = 4

const deviceCurrentPage = ref(1)
const devicePageSize = 5

watch(() => props.activeType, () => {
    faultCurrentPage.value = 1
    deviceCurrentPage.value = 1
})

const regionData = ref([
    { name: '五华区', vehicles: 230, cabinets: 45, batteries: 320 },
    { name: '盘龙区', vehicles: 195, cabinets: 38, batteries: 285 },
    { name: '官渡区', vehicles: 145, cabinets: 28, batteries: 210 },
    { name: '西山区', vehicles: 110, cabinets: 22, batteries: 165 },
    { name: '呈贡区', vehicles: 85, cabinets: 18, batteries: 130 },
    { name: '高新区', vehicles: 65, cabinets: 15, batteries: 100 }
])

const stationData = ref([
    { name: '正义路站', count: 15 },
    { name: '北京路站', count: 12 },
    { name: '世纪城站', count: 8 },
    { name: '滇池路站', count: 18 },
    { name: '高新区站', count: 14 },
    { name: '世博园站', count: 10 }
])

const vehicleData = ref([
    { id: 1, name: 'CAR-001', statusText: '正常' },
    { id: 2, name: 'CAR-002', statusText: '使用中' },
    { id: 3, name: 'CAR-003', statusText: '正常' },
    { id: 4, name: 'CAR-004', statusText: '故障' },
    { id: 5, name: 'CAR-005', statusText: '正常' },
    { id: 6, name: 'CAR-006', statusText: '使用中' }
])

const cabinetData = ref([
    { id: 1, name: 'CAB-001', statusText: '运行中' },
    { id: 2, name: 'CAB-002', statusText: '运行中' },
    { id: 3, name: 'CAB-003', statusText: '维护中' },
    { id: 4, name: 'CAB-004', statusText: '运行中' },
    { id: 5, name: 'CAB-005', statusText: '故障' },
    { id: 6, name: 'CAB-006', statusText: '运行中' }
])

const batteryData = ref([
    { id: 1, name: 'BAT-001', statusText: '充电中' },
    { id: 2, name: 'BAT-002', statusText: '可用' },
    { id: 3, name: 'BAT-003', statusText: '可用' },
    { id: 4, name: 'BAT-004', statusText: '充电中' },
    { id: 5, name: 'BAT-005', statusText: '可用' },
    { id: 6, name: 'BAT-006', statusText: '充电中' }
])

const faultVehicleData = ref([
    { id: 101, name: 'CAR-004', statusText: '故障' },
    { id: 102, name: 'CAR-015', statusText: '故障' },
    { id: 103, name: 'CAR-023', statusText: '故障' },
    { id: 104, name: 'CAR-037', statusText: '故障' }
])

const faultCabinetData = ref([
    { id: 201, name: 'CAB-005', statusText: '故障' },
    { id: 202, name: 'CAB-012', statusText: '故障' },
    { id: 203, name: 'CAB-018', statusText: '故障' }
])

const faultBatteryData = ref([
    { id: 301, name: 'BAT-012', statusText: '故障' },
    { id: 302, name: 'BAT-025', statusText: '故障' },
    { id: 303, name: 'BAT-031', statusText: '故障' },
    { id: 304, name: 'BAT-042', statusText: '故障' },
    { id: 305, name: 'BAT-056', statusText: '故障' }
])

const totalVehicles = computed(() => {
    return regionData.value.reduce((sum, item) => sum + item.vehicles, 0)
})

const totalCabinets = computed(() => {
    return regionData.value.reduce((sum, item) => sum + item.cabinets, 0)
})

const totalBatteries = computed(() => {
    return regionData.value.reduce((sum, item) => sum + item.batteries, 0)
})

const onlineCount = ref(426)
const offlineCount = ref(28)

const getCurrentTypeCount = (item: { name: string; vehicles: number; cabinets: number; batteries: number }) => {
    switch (props.activeType) {
        case 'shared-car':
            return item.vehicles
        case 'cabinet':
            return item.cabinets
        case 'battery':
            return item.batteries
        default:
            return item.vehicles + item.cabinets + item.batteries
    }
}

const getCurrentTypeTitle = computed(() => {
    switch (props.activeType) {
        case 'shared-car':
            return '共享车列表'
        case 'swap-cabinet':
            return '换电柜列表'
        case 'battery':
            return '电池列表'
        default:
            return '共享车列表'
    }
})

const getCurrentDeviceList = computed(() => {
    switch (props.activeType) {
        case 'shared-car':
            return vehicleData.value
        case 'swap-cabinet':
            return cabinetData.value
        case 'battery':
            return batteryData.value
        default:
            return vehicleData.value
    }
})

const getCurrentFaultTypeTitle = computed(() => {
    switch (props.activeType) {
        case 'shared-car':
            return '故障共享车'
        case 'swap-cabinet':
            return '故障换电柜'
        case 'battery':
            return '故障电池'
        default:
            return '故障共享车'
    }
})

const getCurrentFaultDeviceList = computed(() => {
    switch (props.activeType) {
        case 'shared-car':
            return faultVehicleData.value
        case 'swap-cabinet':
            return faultCabinetData.value
        case 'battery':
            return faultBatteryData.value
        default:
            return faultVehicleData.value
    }
})

const handleRegionClick = (item: { name: string }) => {
    emit('region-click', item.name)
}

const handleStationClick = (item: { name: string }) => {
    emit('station-click', item.name)
}

const handleDeviceClick = (item: { id: number; name: string; statusText: string }) => {
    emit('device-click', item.name)
}

const getStatusClass = (statusText: string): string => {
    const statusMap: Record<string, string> = {
        '正常': 'status-normal',
        '使用中': 'status-using',
        '运行中': 'status-running',
        '维护中': 'status-maintenance',
        '充电中': 'status-charging',
        '可用': 'status-available',
        '故障': 'status-error'
    }
    return statusMap[statusText] || 'status-default'
}

const getTotalPages = computed(() => {
    return Math.ceil(getCurrentFaultDeviceList.value.length / faultPageSize)
})

const getPaginatedFaultList = computed(() => {
    const start = (faultCurrentPage.value - 1) * faultPageSize
    const end = start + faultPageSize
    return getCurrentFaultDeviceList.value.slice(start, end)
})

const faultPrevPage = () => {
    if (faultCurrentPage.value > 1) {
        faultCurrentPage.value--
    }
}

const faultNextPage = () => {
    if (faultCurrentPage.value < getTotalPages.value) {
        faultCurrentPage.value++
    }
}

const getDeviceTotalPages = computed(() => {
    return Math.ceil(getCurrentDeviceList.value.length / devicePageSize)
})

const getPaginatedDeviceList = computed(() => {
    const start = (deviceCurrentPage.value - 1) * devicePageSize
    const end = start + devicePageSize
    return getCurrentDeviceList.value.slice(start, end)
})

const devicePrevPage = () => {
    if (deviceCurrentPage.value > 1) {
        deviceCurrentPage.value--
    }
}

const deviceNextPage = () => {
    if (deviceCurrentPage.value < getDeviceTotalPages.value) {
        deviceCurrentPage.value++
    }
}
</script>

<style scoped>
.data-panel {
    width: 20%;
    height: 100%;
    background: rgba(10, 22, 40, 0.95);
    /* border-left: 2px solid rgba(0, 188, 212, 0.5); */
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.panel-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(0, 188, 212, 0.2);
    min-height: 0;
}

.panel-header {
    padding: 5px 12px;
    background: rgba(0, 188, 212, 0.1);
    border-bottom: 1px solid rgba(0, 188, 212, 0.3);
}

.panel-title {
    font-size: .7vw;
    font-weight: 600;
    color: #00bcd4;
    margin: 0;
    padding-left: 10px;
    position: relative;
}

.panel-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 12px;
    background: #00bcd4;
}

.panel-content {
    flex: 1;
    padding: 5px 12px;
    overflow-y: auto;
}

.region-list {
    display: flex;
    flex-direction: column;
    min-height: clamp(100px, 25vh, 18vh);
}

.region-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: color 0.2s ease;
}

.region-item:last-child {
    border-bottom: none;
}

.region-item:hover {

    .region-name,
    .region-count {
        color: #00bcd4;
    }
}

.region-name {
    font-size: .7vw;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 400;
    transition: color 0.2s ease;
}

.region-count {
    font-size: .7vw;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.2s ease;
}

.status-tag {
    font-size: .6vw;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 500;
}

.status-normal {
    background: rgba(76, 175, 80, 0.2);
    color: #4caf50;
}

.status-using {
    background: rgba(255, 152, 0, 0.2);
    color: #ff9800;
}

.status-running {
    background: rgba(0, 188, 212, 0.2);
    color: #00bcd4;
}

.status-maintenance {
    background: rgba(156, 39, 176, 0.2);
    color: #9c27b0;
}

.status-charging {
    background: rgba(33, 150, 243, 0.2);
    color: #2196f3;
}

.status-available {
    background: rgba(76, 175, 80, 0.2);
    color: #4caf50;
}

.status-error {
    background: rgba(244, 67, 54, 0.2);
    color: #f44336;
}

.status-default {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
}

.stats-overview {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.overview-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(0, 188, 212, 0.15);
}

.overview-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.status-stats {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.status-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
}

.status-circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.status-circle.online {
    background: #4caf50;
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
}

.status-circle.offline {
    background: #f44336;
    box-shadow: 0 0 8px rgba(244, 67, 54, 0.6);
}

.status-text {
    flex: 1;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
}

.status-count {
    font-size: 16px;
    font-weight: bold;
    color: #00bcd4;
}



.data-panel::-webkit-scrollbar,
.panel-content::-webkit-scrollbar {
    width: 6px;
}

.data-panel::-webkit-scrollbar-track,
.panel-content::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
}

.data-panel::-webkit-scrollbar-thumb,
.panel-content::-webkit-scrollbar-thumb {
    background: rgba(0, 188, 212, 0.3);
    border-radius: 3px;
}

.data-panel::-webkit-scrollbar-thumb:hover,
.panel-content::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 188, 212, 0.5);
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px 0 5px;
    border-top: 1px solid rgba(0, 188, 212, 0.2);
    /* margin-top: 10px; */
}

.pagination-info {
    font-size: .7vw;
    color: rgba(255, 255, 255, 0.7);
}

.pagination-buttons {
    display: flex;
    gap: 6px;
}

.pagination-btn {
    width: 24px;
    height: 24px;
    border: 1px solid rgba(0, 188, 212, 0.5);
    background: rgba(0, 188, 212, 0.1);
    color: #00bcd4;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
    background: rgba(0, 188, 212, 0.3);
}

.pagination-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}
</style>