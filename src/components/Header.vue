<template>
  <div class="header">
    <div class="header-left">
      <h1 class="title">换电调度 · GIS控制中心</h1>
      <div class="nav-menu">
        <div class="nav-item" :class="{ active: currentNav === 'gis' }" @click="handleNavChange('gis')">
          GIS地图
        </div>
        <div class="nav-item" :class="{ active: currentNav === 'dashboard' }" @click="handleNavChange('dashboard')">
          数据看板
        </div>
      </div>
      <!-- 搜索框 -->
      <div class="search-box" v-if="currentNav === 'gis'">
        <input v-model="searchText" type="text" placeholder="输入设备ID 如 CAR-1" class="search-input"
          @keyup.enter="handleSearch" />
        <button class="search-btn" @click="handleSearch">搜索</button>
      </div>
      <!-- <div v-if="currentNav === 'gis'" class="sub-nav">
        <div v-for="item in subNavItems" :key="item.id" class="sub-nav-item"
          :class="{ active: activeSubNav === item.id }" @click="handleSubNavChange(item.id)">
          {{ item.label }}
        </div>
      </div> -->
    </div>
    <div class="header-right">

      <div class="user-info" v-if="userInfo">
        <div class="user-avatar">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <span class="user-phone">{{ maskPhone(userInfo.phone) }}</span>
        <button class="logout-btn" @click="handleLogout">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor"
              d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
          </svg>
          退出
        </button>
      </div>
      <div class="time-display">{{ currentTime }}</div>
      <button class="fullscreen-btn" @click="toggleFullscreen" :title="isFullscreen ? '退出全屏' : '全屏'">
        <svg v-if="!isFullscreen" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor"
            d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

type NavType = 'gis' | 'dashboard'

interface UserInfo {
  phone: string
  loginType: string
}

const emit = defineEmits<{
  (e: 'update-type', type: string): void
  (e: 'search-device', deviceId: string): void
  (e: 'change-type-focus', type: string): void
  (e: 'set-type', type: string): void
  (e: 'clear-search'): void
  (e: 'logout'): void
}>()

const route = useRoute()
const currentNav = ref<NavType>('gis')
const activeSubNav = ref<string>('shared-car')
const searchText = ref('')
const currentTime = ref('')
const userInfo = ref<UserInfo | null>(null)
const isFullscreen = ref(false)

const subNavItems = [
  { id: 'shared-car', label: '共享车' },
  { id: 'swap-cabinet', label: '换电柜' },
  { id: 'battery', label: '电池' }
]

const handleNavChange = (nav: NavType) => {
  currentNav.value = nav
  emit('nav-change', nav)
}

const handleSubNavChange = (id: string) => {
  activeSubNav.value = id
  searchText.value = ''
  emit('update-type', id)
  emit('change-type-focus', id)
  emit('clear-search')
}

const handleSearch = () => {
  if (searchText.value.trim()) {
    const deviceId = searchText.value.trim().toUpperCase()
    let targetType = ''
    if (deviceId.startsWith('CAR-')) {
      targetType = 'shared-car'
    } else if (deviceId.startsWith('CAB-')) {
      targetType = 'swap-cabinet'
    } else if (deviceId.startsWith('BAT-')) {
      targetType = 'battery'
    }
    if (targetType) {
      activeSubNav.value = targetType
      emit('set-type', targetType)
    }
    emit('search-device', deviceId)
  }
}

const updateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const maskPhone = (phone: string): string => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

const handleLogout = () => {
  emit('logout')
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      isFullscreen.value = true
    }).catch(err => {
      console.error('全屏切换失败:', err)
    })
  } else {
    document.exitFullscreen().then(() => {
      isFullscreen.value = false
    }).catch(err => {
      console.error('退出全屏失败:', err)
    })
  }
}

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

const loadUserInfo = () => {
  const stored = localStorage.getItem('userInfo')
  if (stored) {
    userInfo.value = JSON.parse(stored)
  }
}

let timeInterval: number

const syncNavFromRoute = () => {
  const view = route.query.view as string
  if (view && (view === 'gis' || view === 'dashboard')) {
    currentNav.value = view as NavType
  }
}

onMounted(() => {
  updateTime()
  timeInterval = window.setInterval(updateTime, 1000)
  loadUserInfo()
  syncNavFromRoute()
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

watch(() => route.query.view, () => {
  syncNavFromRoute()
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
.header {
  width: 100%;
  height: clamp(50px, 8vh, 80px);
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 clamp(15px, 3vw, 30px);
  border-bottom: 2px solid rgba(0, 188, 212, 0.5);
  box-shadow: 0 4px 20px rgba(0, 188, 212, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.title {
  font-size: .9vw;
  font-weight: bold;
  background: linear-gradient(90deg, #00bcd4, #00e5ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  padding-right: 30px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  margin-right: 30px;
}

.nav-menu {
  display: flex;
  gap: 20px;
}

.nav-item {
  padding: 8px 24px;
  font-size: .75vw;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item:hover {
  background: rgba(0, 188, 212, 0.2);
}

.nav-item.active {
  background: rgba(0, 188, 212, 0.3);
  color: #00bcd4;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #00bcd4;
}

.sub-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.sub-nav-item {
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
}

.sub-nav-item:hover {
  background: rgba(0, 188, 212, 0.2);
}

.sub-nav-item.active {
  background: #00bcd4;
  color: #0a0e27;
}

.search-box {
  margin-left: 150px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-input {
  padding: 7px 14px;
  font-size: .65vw;
  border: 1px solid rgba(0, 188, 212, 0.3);
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.6);
  color: #fff;
  outline: none;
  width: 160px;
  transition: all 0.3s ease;
}

.search-input:focus {
  width: 200px;
  border-color: #00bcd4;
  box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.2);
  background: rgba(15, 23, 42, 0.8);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.search-btn {
  padding: 7px 14px;
  font-size: .65vw;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #00bcd4, #00e5ff);
  color: #0f172a;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.search-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.time-display {
  font-size: .7vw;
  color: #00bcd4;
  font-weight: 500;
  letter-spacing: 1px;
  min-width: 180px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(0, 188, 212, 0.2);
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00bcd4, #00e5ff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  flex-shrink: 0;
}

.user-phone {
  font-size: .75vw;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  background: rgba(255, 71, 87, 0.1);
  border: 1px solid rgba(255, 71, 87, 0.3);
  border-radius: 5px;
  color: rgba(255, 71, 87, 0.8);
  font-size: .65vw;
  cursor: pointer;
  transition: all 0.3s;
  margin-left: 8px;
}

.logout-btn:hover {
  background: rgba(255, 71, 87, 0.2);
  border-color: rgba(255, 71, 87, 0.5);
  color: #ff4757;
}

.fullscreen-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.fullscreen-btn:hover {
  background: rgba(0, 188, 212, 0.2);
  border-color: #00bcd4;
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(0, 188, 212, 0.4);
}

.fullscreen-btn:active {
  transform: scale(0.95);
}
</style>