<template>
  <div class="map-canvas">
    <div ref="mapContainer" class="map-container"></div>

    <div class="map-overlay">
      <div class="map-legend">
        <!-- <div class="legend-title">图例</div> -->
        <div class="legend-items">
          <div class="legend-item" :class="{ active: activeType === 'shared-car' || activeType === 'all' }"
            @click="handleLegendClick('shared-car')">
            <img class="legend-icon" src="../assets/images/bike.png" alt="换电柜" />
            <span>共享车</span>
          </div>
          <div class="legend-item" :class="{ active: activeType === 'swap-cabinet' || activeType === 'all' }"
            @click="handleLegendClick('swap-cabinet')">
            <img class="legend-icon" src="../assets/images/locker.png" alt="换电柜" />
            <span>换电柜</span>
          </div>
          <div class="legend-item" :class="{ active: activeType === 'battery' || activeType === 'all' }"
            @click="handleLegendClick('battery')">
            <img class="legend-icon" src="../assets/images/battery.png" alt="换电柜" />
            <span>电池</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

interface Marker {
  id: number
  x: number
  y: number
  type: 'shared-car' | 'swap-cabinet' | 'battery'
  name: string
  status: string
  statusText: string
  location: string
  count: number
  batteryLevel?: number
}

const props = defineProps<{
  activeType: string
}>()

const emit = defineEmits<{
  (e: 'update-type', type: string): void
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
const selectedMarker = ref<Marker | null>(null)
let map: AMap.Map | null = null
let mapMarkers: AMap.Marker[] = []
let infoWindow: AMap.InfoWindow | null = null

const markers = ref<Marker[]>([
  // 五华区
  { id: 1, x: 102.7187, y: 25.0441, type: 'shared-car', name: 'CAR-001', region: '五华区', station: '正义路站', status: 'online', statusText: '正常', location: '五华区-正义路', count: 15, batteryLevel: 78 },
  { id: 2, x: 102.7227, y: 25.0411, type: 'shared-car', name: 'CAR-002', region: '五华区', station: '正义路站', status: 'available', statusText: '使用中', location: '五华区-正义路', count: 12, batteryLevel: 45 },
  { id: 3, x: 102.7457, y: 25.0141, type: 'swap-cabinet', name: 'CAB-001', region: '五华区', station: '高新区站', status: 'online', statusText: '运行中', location: '五华区-高新区', count: 20, fullBattery: 8, chargingBattery: 8, emptyBattery: 4, managerName: '李主管', managerPhone: '13900139002' },
  { id: 4, x: 102.7157, y: 25.0351, type: 'battery', name: 'BAT-001', region: '五华区', station: '翠湖站', status: 'charging', statusText: '充电中', location: '五华区-翠湖', count: 40, batteryLevel: 60 },

  // 盘龙区
  { id: 5, x: 102.7387, y: 25.0391, type: 'shared-car', name: 'CAR-003', region: '盘龙区', station: '北京路站', status: 'available', statusText: '使用中', location: '盘龙区-北京路', count: 12, batteryLevel: 45 },
  { id: 6, x: 102.7427, y: 25.0421, type: 'shared-car', name: 'CAR-004', region: '盘龙区', station: '北辰站', status: 'offline', statusText: '故障', location: '盘龙区-北辰', count: 10, batteryLevel: 85 },
  { id: 7, x: 102.7357, y: 25.0321, type: 'swap-cabinet', name: 'CAB-002', region: '盘龙区', station: '火车北站', status: 'online', statusText: '运行中', location: '盘龙区-火车北站', count: 24, fullBattery: 10, chargingBattery: 8, emptyBattery: 6, managerName: '王经理', managerPhone: '13700137003' },
  { id: 8, x: 102.7087, y: 25.0241, type: 'battery', name: 'BAT-002', region: '盘龙区', station: '世博园站', status: 'charging', statusText: '充电中', location: '盘龙区-世博园', count: 50, batteryLevel: 65 },

  // 官渡区
  { id: 9, x: 102.7287, y: 25.0291, type: 'shared-car', name: 'CAR-005', region: '官渡区', station: '世纪城站', status: 'offline', statusText: '故障', location: '官渡区-世纪城', count: 8, batteryLevel: 23 },
  { id: 10, x: 102.7407, y: 25.0251, type: 'shared-car', name: 'CAR-006', region: '官渡区', station: '新螺蛳湾站', status: 'online', statusText: '正常', location: '官渡区-新螺蛳湾', count: 18, batteryLevel: 72 },
  { id: 11, x: 102.7327, y: 25.0181, type: 'swap-cabinet', name: 'CAB-003', region: '官渡区', station: '国贸中心站', status: 'maintenance', statusText: '维护中', location: '官渡区-国贸中心', count: 18, fullBattery: 6, chargingBattery: 6, emptyBattery: 6, managerName: '赵主管', managerPhone: '13600136004' },
  { id: 12, x: 102.7407, y: 25.0211, type: 'battery', name: 'BAT-003', region: '官渡区', station: '新螺蛳湾站', status: 'available', statusText: '可用', location: '官渡区-新螺蛳湾', count: 38, batteryLevel: 92 },

  // 西山区
  { id: 13, x: 102.7107, y: 25.0281, type: 'shared-car', name: 'CAR-007', region: '西山区', station: '滇池路站', status: 'online', statusText: '正常', location: '西山区-滇池路', count: 14, batteryLevel: 68 },
  { id: 14, x: 102.7057, y: 25.0181, type: 'shared-car', name: 'CAR-008', region: '西山区', station: '万达广场站', status: 'available', statusText: '使用中', location: '西山区-万达广场', count: 9, batteryLevel: 55 },
  { id: 15, x: 102.7157, y: 25.0191, type: 'swap-cabinet', name: 'CAB-004', region: '西山区', station: '滇池路站', status: 'online', statusText: '运行中', location: '西山区-滇池路', count: 24, fullBattery: 12, chargingBattery: 6, emptyBattery: 6, managerName: '张经理', managerPhone: '13800138001' },
  { id: 16, x: 102.7127, y: 25.0111, type: 'battery', name: 'BAT-004', region: '西山区', station: '万达广场站', status: 'charging', statusText: '充电中', location: '西山区-万达广场', count: 45, batteryLevel: 45 },

  // 呈贡区
  { id: 17, x: 102.8207, y: 24.9051, type: 'shared-car', name: 'CAR-009', region: '呈贡区', station: '大学城站', status: 'online', statusText: '正常', location: '呈贡区-大学城', count: 16, batteryLevel: 80 },
  { id: 18, x: 102.8157, y: 24.9101, type: 'shared-car', name: 'CAR-010', region: '呈贡区', station: '市政府站', status: 'available', statusText: '使用中', location: '呈贡区-市政府', count: 7, batteryLevel: 35 },
  { id: 19, x: 102.8257, y: 24.9081, type: 'swap-cabinet', name: 'CAB-005', region: '呈贡区', station: '大学城站', status: 'offline', statusText: '故障', location: '呈贡区-大学城', count: 16, fullBattery: 10, chargingBattery: 4, emptyBattery: 2, managerName: '孙主管', managerPhone: '13500135005' },
  { id: 20, x: 102.8187, y: 24.9021, type: 'battery', name: 'BAT-005', region: '呈贡区', station: '春融街站', status: 'available', statusText: '可用', location: '呈贡区-春融街', count: 32, batteryLevel: 88 },

  // 高新区
  { id: 21, x: 102.7007, y: 25.0401, type: 'shared-car', name: 'CAR-011', region: '高新区', station: '海源中路站', status: 'online', statusText: '正常', location: '高新区-海源中路', count: 11, batteryLevel: 75 },
  { id: 22, x: 102.6957, y: 25.0351, type: 'shared-car', name: 'CAR-012', region: '高新区', station: '科高路站', status: 'offline', statusText: '故障', location: '高新区-科高路', count: 5, batteryLevel: 15 },
  { id: 23, x: 102.7027, y: 25.0381, type: 'swap-cabinet', name: 'CAB-006', region: '高新区', station: '海源中路站', status: 'offline', statusText: '故障', location: '高新区-海源中路', count: 12, fullBattery: 4, chargingBattery: 2, emptyBattery: 6, managerName: '周经理', managerPhone: '13400134006' },
  { id: 24, x: 102.6987, y: 25.0321, type: 'battery', name: 'BAT-006', region: '高新区', station: '科高路站', status: 'charging', statusText: '充电中', location: '高新区-科高路', count: 28, batteryLevel: 55 }
])

const getTypeName = (type: string) => {
  const types: Record<string, string> = {
    'shared-car': '共享车',
    'swap-cabinet': '换电柜',
    'battery': '电池仓'
  }
  return types[type] || type
}

const getMarkerColor = (type: string) => {
  const colors: Record<string, string> = {
    'shared-car': '#00bcd4',
    'swap-cabinet': '#4caf50',
    'battery': '#ff9800'
  }
  return colors[type] || colors['shared-car']
}

const initMap = async () => {
  if (!mapContainer.value) return

  try {
    const AMap = await AMapLoader.load({
      key: '3d8df0b39e331c787b7cb8f8afdede34',
      version: '2.0',
      plugins: ['AMap.Marker', 'AMap.InfoWindow']
    })

    map = new AMap.Map(mapContainer.value, {
      zoom: 12,
      center: [102.7267, 25.0281],
      mapStyle: 'amap://styles/dark'
    })

    infoWindow = new AMap.InfoWindow({
      offset: new AMap.Pixel(0, -20),
      closeWhenClickMap: true,
      content: ''
    })

    setTimeout(async () => {
      await addMarkers()
    }, 500)

    map.on('complete', async () => {
      await addMarkers()
    })
  } catch (error) {
    console.error('地图加载失败:', error)
  }
}

const createCustomIcon = async (type: string, batteryLevel?: number, isSelected = false): Promise<string> => {
  // 根据类型获取对应的本地图片
  const imgUrlMap: Record<string, string> = {
    'shared-car': '../assets/images/bike.png',
    'swap-cabinet': '../assets/images/locker.png',
    'battery': '../assets/images/battery.png'
  }

  const imgUrl = new URL(imgUrlMap[type] || imgUrlMap['shared-car'], import.meta.url).href

  // 加载图片
  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }

  try {
    const img = await loadImage(imgUrl)

    // 使用更高分辨率（2倍）
    const displaySize = 44
    const scale = 2
    const size = displaySize * scale
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    if (!ctx) return ''

    const centerX = size / 2
    const centerY = size / 2
    const ringWidth = 3 * scale
    const outerRadius = size / 2 - 2 * scale
    const innerRadius = outerRadius - ringWidth - 2 * scale
    const level = batteryLevel || 50

    // 根据电量值设置颜色，与详情弹窗保持一致
    const getBatteryColor = (level: number) => {
      if (level > 60) return '#4caf50'
      if (level > 30) return '#ff9800'
      return '#f44336'
    }

    // 根据类型设置颜色
    const colorMap: Record<string, string> = {
      'shared-car': getBatteryColor(level),
      'swap-cabinet': '#00bcd4',
      'battery': getBatteryColor(level)
    }
    const progressColor = colorMap[type] || '#4caf50'

    // 绘制白色60%透明度背景圆
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.fill()

    // 共享车和电池需要绘制电量进度条，换电柜绘制完整边框
    if (type === 'shared-car' || type === 'battery') {
      // 绘制电量进度圆弧（从顶部开始，顺时针）
      const startAngle = -Math.PI / 2
      const endAngle = startAngle + (Math.PI * 2 * (level / 100))

      ctx.beginPath()
      ctx.arc(centerX, centerY, outerRadius - ringWidth / 2, startAngle, endAngle)
      ctx.strokeStyle = progressColor
      ctx.lineWidth = ringWidth
      ctx.lineCap = 'round'
      ctx.stroke()

      // 绘制剩余的灰色圆弧（表示未充电部分）
      ctx.beginPath()
      ctx.arc(centerX, centerY, outerRadius - ringWidth / 2, endAngle, startAngle + Math.PI * 2)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.lineWidth = ringWidth
      ctx.lineCap = 'round'
      ctx.stroke()
    } else {
      // 换电柜和电池绘制完整边框
      ctx.beginPath()
      ctx.arc(centerX, centerY, outerRadius - ringWidth / 2, 0, Math.PI * 2)
      ctx.strokeStyle = progressColor
      ctx.lineWidth = ringWidth
      ctx.lineCap = 'round'
      ctx.stroke()
    }

    // 创建圆形裁剪区域
    ctx.save()
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
    ctx.clip()

    // 绘制图片（保持比例）
    const imgSize = innerRadius * 2 - 4 * scale
    const imgX = centerX - imgSize / 2
    const imgY = centerY - imgSize / 2
    ctx.drawImage(img, imgX, imgY, imgSize, imgSize)

    ctx.restore()

    return canvas.toDataURL('image/png', 1.0)
  } catch (e) {
    console.error('图片加载失败:', e)
    // 返回默认图标
    return createDefaultIcon(type, batteryLevel)
  }
}

// 创建默认图标（用于图片加载失败时）
const createDefaultIcon = (type: string, batteryLevel?: number): string => {
  const size = 44
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2 - 2

  if (ctx) {
    // 根据类型设置颜色
    const colorMap: Record<string, string> = {
      'shared-car': '#4caf50',   // 绿色
      'swap-cabinet': '#00bcd4', // 青色
      'battery': '#ff9800'        // 橙色
    }
    const progressColor = colorMap[type] || '#4caf50'
    const emojiMap: Record<string, string> = {
      'shared-car': '🚲',
      'swap-cabinet': '🗄️',
      'battery': '🔋'
    }
    const emoji = emojiMap[type] || '📍'

    // 绘制白色60%透明度背景圆
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.fill()

    // 绘制边框圆环
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius - 2, 0, Math.PI * 2)
    ctx.strokeStyle = progressColor
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.stroke()

    // 绘制表情图标
    ctx.fillStyle = progressColor
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(emoji, centerX, centerY)

    return canvas.toDataURL()
  }

  return ''
}

const addMarkers = async () => {
  if (!map) return

  removeMarkers()

  const filtered = props.activeType === 'all'
    ? markers.value
    : markers.value.filter(m => m.type === props.activeType)

  // 使用 Promise.all 并行加载所有图标
  const markerPromises = filtered.map(async (marker) => {
    const isSelected = selectedMarker.value?.id === marker.id
    const iconUrl = await createCustomIcon(marker.type, marker.batteryLevel, isSelected)

    // 创建图标对象
    const icon = new (window as any).AMap.Icon({
      image: iconUrl,
      size: new (window as any).AMap.Size(44, 44),
      imageSize: new (window as any).AMap.Size(44, 44)
    })

    const mapMarker = new (window as any).AMap.Marker({
      position: [marker.x, marker.y],
      icon: icon,
      title: marker.name,
      offset: new (window as any).AMap.Pixel(-22, -22)
    })

    mapMarker.on('click', () => {
      handleMarkerClick(marker)
    })

    return mapMarker
  })

  // 等待所有图标加载完成
  const loadedMarkers = await Promise.all(markerPromises)

  // 批量添加到地图
  loadedMarkers.forEach(mapMarker => {
    map.add(mapMarker)
    mapMarkers.push(mapMarker)
  })
}

const removeMarkers = () => {
  if (!map) return
  mapMarkers.forEach(marker => {
    map?.remove(marker)
  })
  mapMarkers = []
}

const handleMarkerClick = (marker: Marker) => {
  if (selectedMarker.value?.id === marker.id) {
    selectedMarker.value = null
    infoWindow?.close()
  } else {
    selectedMarker.value = marker

    if (map && infoWindow) {
      const content = buildInfoWindowContent(marker)
      infoWindow.setContent(content)
      infoWindow.open(map, [marker.x, marker.y])
    }
  }
  nextTick(async () => {
    await addMarkers()
  })
}

const buildInfoWindowContent = (marker: Marker): string => {
  let statusStyle = ''
  switch (marker.status) {
    case 'online':
      statusStyle = 'color:#4caf50;background:rgba(76,175,80,0.2)'
      break
    case 'offline':
      statusStyle = 'color:#f44336;background:rgba(244,67,54,0.2)'
      break
    case 'charging':
      statusStyle = 'color:#00bcd4;background:rgba(0,188,212,0.2)'
      break
    case 'available':
      statusStyle = 'color:#ff9800;background:rgba(255,152,0,0.2)'
      break
    default:
      statusStyle = 'color:#fff'
  }

  let extraInfo = ''
  if (marker.type === 'swap-cabinet') {
    extraInfo = `
      <div style="display:flex;flex-wrap:wrap;align-items:center;font-size:.65vw;color:#fff;padding:8px 10px;border-radius:6px;background:rgba(255,255,255,0.02)">
        <span style="color:rgba(255,255,255,0.6);min-width:65px;font-size:.65vw;margin-right:8px">电池库存：</span>
        <div style="display:flex;gap:12px;">
          <span style="display:flex;align-items:center;gap:4px;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4caf50;"></span>
            <span style="color:#4caf50;font-weight:500;">满格: ${marker.fullBattery || 0}</span>
          </span>
          <span style="display:flex;align-items:center;gap:4px;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#00bcd4;"></span>
            <span style="color:#00bcd4;font-weight:500">充电中: ${marker.chargingBattery || 0}</span>
          </span>
          <span style="display:flex;align-items:center;gap:4px;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f44336;"></span>
            <span style="color:#f44336;font-weight:500">空格: ${marker.emptyBattery || 0}</span>
          </span>
        </div>
      </div>
      <div style="display:flex;align-items:center;font-size:.7vw;color:#fff;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,0.02)">
        <span style="color:rgba(255,255,255,0.6);min-width:65px;font-size:.65vw">归属人员：</span>
        <div style="display:flex;flex-direction:column;gap:2px;">
          <span style="color:#00bcd4;font-size:.65vw">${marker.managerName || ''}</span>
          <span style="color:rgba(255,255,255,0.7);font-size:.55vw">${marker.managerPhone || ''}</span>
        </div>
      </div>
    `
  }

  return `
    <div style="background:#0a1628;border-radius:14px;padding:4px;">
      <div style="background:linear-gradient(135deg,rgba(10,22,40,0.98) 0%,rgba(30,41,59,0.98) 100%);border:1px solid rgba(0,188,212,0.5);border-radius:12px;padding:16px;min-width:220px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;box-shadow:0 0 20px rgba(0,188,212,0.3),0 4px 20px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.1);backdrop-filter:blur(10px);">
        <div style="font-size:.8vw;font-weight:600;color:#00bcd4;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid rgba(0,188,212,0.3);display:flex;align-items:center;gap:8px;">
          <span style="display:inline-block;width:3px;height:16px;background:linear-gradient(180deg,#00bcd4,#00838f);border-radius:2px;"></span>
          ${marker.name}
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:center;font-size:.7vw;color:#fff;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,0.02)">
            <span style="color:rgba(255,255,255,0.6);min-width:65px;font-size:.65vw">区域：</span>
            <span style="color:#fff;font-weight:500">${marker.region}</span>
          </div>
          <div style="display:flex;align-items:center;font-size:.7vw;color:#fff;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,0.02)">
            <span style="color:rgba(255,255,255,0.6);min-width:65px;font-size:.65vw">站点：</span>
            <span style="color:#fff;font-weight:500">${marker.station}</span>
          </div>
          <div style="display:flex;align-items:center;font-size:.7vw;color:#fff;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,0.02)">
            <span style="color:rgba(255,255,255,0.6);min-width:65px;font-size:.65vw">状态：</span>
            <span style="${statusStyle};padding:2px 8px;border-radius:4px;font-size:.55vw;">${marker.statusText}</span>
          </div>
          ${extraInfo}
          ${marker.batteryLevel !== undefined ? `<div style="display:flex;align-items:center;font-size:.7vw;color:#fff;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,0.02)">
            <span style="color:rgba(255,255,255,0.6);min-width:65px;font-size:.65vw">电量：</span>
            <div style="flex:2;display:flex;align-items:center;gap:8px;">
              <div style="flex:1;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;">
                <div style="height:100%;border-radius:3px;transition:width 0.3s ease;width:${marker.batteryLevel}%;${marker.batteryLevel > 60 ? 'background:linear-gradient(90deg,#4caf50,#81c784)' : marker.batteryLevel > 30 ? 'background:linear-gradient(90deg,#ff9800,#ffb74d)' : 'background:linear-gradient(90deg,#f44336,#ef5350)'}"></div>
              </div>
              <span style="color:#fff;font-weight:500;font-size:.65vw;min-width:40px;text-align:right;">${marker.batteryLevel}%</span>
            </div>
          </div>` : ''}
        </div>
      </div>
    </div>
  `
}

const closeDetail = () => {
  selectedMarker.value = null
  infoWindow?.close()
  nextTick(async () => {
    await addMarkers()
  })
}

const handleLegendClick = (type: string) => {
  infoWindow?.close()
  emit('update-type', type)
}

const focusOnType = (type: string) => {
  if (type === 'all') {
    map?.setCenter([102.7267, 25.0281])
    map?.setZoom(12)
  } else {
    const typeMarkers = markers.value.filter(m => m.type === type)
    if (typeMarkers.length > 0 && map) {
      const firstMarker = typeMarkers[0]
      map.setCenter([firstMarker.x, firstMarker.y])
      map.setZoom(14)
    }
  }
}

const focusOnRegion = (regionName: string) => {
  const regionMarkers = markers.value.filter(m => m.region === regionName)
  if (regionMarkers.length > 0 && map) {
    const firstMarker = regionMarkers[0]
    map.setCenter([firstMarker.x, firstMarker.y])
    map.setZoom(14)
  }
}

const focusOnStation = (stationName: string) => {
  const stationMarkers = markers.value.filter(m => m.station === stationName)
  if (stationMarkers.length > 0 && map) {
    const firstMarker = stationMarkers[0]
    map.setCenter([firstMarker.x, firstMarker.y])
    map.setZoom(15)
  }
}

const searchDevice = (deviceId: string) => {
  const marker = markers.value.find(m => m.name.toLowerCase() === deviceId.toLowerCase())
  if (marker && map) {
    map.setCenter([marker.x, marker.y])
    map.setZoom(16)

    setTimeout(() => {
      handleMarkerClick(marker)
    }, 200)
  } else {
    alert('未找到设备：' + deviceId)
  }
}

watch(() => props.activeType, () => {
  selectedMarker.value = null
  if (map) {
    map.setCenter([102.7267, 25.0281])
    map.setZoom(12)
  }
  nextTick(async () => {
    await addMarkers()
  })
})

defineExpose({
  searchDevice,
  focusOnType,
  focusOnRegion,
  focusOnStation,
  clearSearch: closeDetail
})

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  removeMarkers()
  if (map) {
    map.destroy()
    map = null
  }
})
</script>

<style scoped>
.map-canvas {
  width: 80%;
  height: 100%;
  background: #0a1628;
  position: relative;
}

.map-container {
  width: 100%;
  height: 100%;
}

.info-wrapper {
  background: #0a1628;
  border-radius: 14px;
  padding: 4px;
}

.info-window {
  background: linear-gradient(135deg, rgba(10, 22, 40, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%);
  border: 1px solid rgba(0, 188, 212, 0.5);
  border-radius: 12px;
  padding: 16px;
  min-width: 220px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 0 20px rgba(0, 188, 212, 0.3), 0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.info-header {
  font-size: 16px;
  font-weight: 600;
  color: #00bcd4;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 188, 212, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-header::before {
  content: '';
  width: 3px;
  height: 16px;
  background: linear-gradient(180deg, #00bcd4, #00838f);
  border-radius: 2px;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-row {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #fff;
  padding: 6px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.02);
  transition: background 0.2s ease;
}

.info-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.info-label {
  color: rgba(255, 255, 255, 0.6);
  min-width: 65px;
  font-size: 13px;
}

.info-value {
  color: #ffffff;
  font-weight: 500;
}

.status-online {
  color: #4caf50;
  padding: 2px 8px;
  background: rgba(76, 175, 80, 0.2);
  border-radius: 4px;
  font-size: 12px;
}

.status-offline {
  color: #f44336;
  padding: 2px 8px;
  background: rgba(244, 67, 54, 0.2);
  border-radius: 4px;
  font-size: 12px;
}

.status-charging {
  color: #00bcd4;
  padding: 2px 8px;
  background: rgba(0, 188, 212, 0.2);
  border-radius: 4px;
  font-size: 12px;
}

.status-available {
  color: #ff9800;
  padding: 2px 8px;
  background: rgba(255, 152, 0, 0.2);
  border-radius: 4px;
  font-size: 12px;
}

.map-overlay {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.map-legend {
  background: rgba(10, 22, 40, 0.9);
  border: 1px solid #00bcd4;
  border-radius: 8px;
  padding: 15px;
  backdrop-filter: blur(10px);
}

.legend-title {
  font-size: 14px;
  font-weight: bold;
  color: #00bcd4;
  margin-bottom: 10px;
  text-align: center;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: .65vw;
  color: rgba(255, 255, 255, 0.7);
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.legend-item:hover {
  background: rgba(0, 188, 212, 0.2);
}

.legend-item.active {
  background: rgba(0, 188, 212, 0.3);
  color: #00bcd4;
}

.legend-item.active:hover {
  background: rgba(0, 188, 212, 0.4);
}

.legend-icon {
  width: 20px;
  height: 20px;
}
</style>