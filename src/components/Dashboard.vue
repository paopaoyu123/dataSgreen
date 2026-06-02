<template>
  <!-- 数据看板内容 -->
  <div class="dashboard">
    <div class="dashboard-section section-overview">
      <div class="section-title">数据概览</div>
      <div class="stats-grid">
        <div class="stat-card car-card">
          <div class="stat-info">
            <div class="stat-label">共享车总数</div>
            <div class="stat-value">1,256</div>
            <div class="stat-status">
              <span class="status-item">使用中 1,120</span>
              <span class="status-divider">·</span>
              <span class="status-item fault">故障 12</span>
            </div>
          </div>
          <div class="stat-icon">
            <svg viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ff6b9d" />
                  <stop offset="100%" stop-color="#c44569" />
                </linearGradient>
                <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#333" />
                  <stop offset="50%" stop-color="#555" />
                  <stop offset="100%" stop-color="#333" />
                </linearGradient>
              </defs>
              <circle cx="10" cy="38" r="7" fill="url(#wheelGradient)" />
              <circle cx="38" cy="38" r="7" fill="url(#wheelGradient)" />
              <circle cx="10" cy="38" r="3" fill="#fff" />
              <circle cx="38" cy="38" r="3" fill="#fff" />
              <path d="M12 28 Q24 14 36 28" stroke="url(#carGradient)" stroke-width="4" fill="none"
                stroke-linecap="round" />
              <path d="M14 26 Q24 18 34 26" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" />
              <rect x="18" y="24" width="12" height="10" rx="3" fill="url(#carGradient)" />
              <rect x="19" y="25" width="10" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
              <circle cx="28" cy="20" r="4" fill="url(#carGradient)" />
              <path d="M28 16 L28 10" stroke="url(#carGradient)" stroke-width="2" stroke-linecap="round" />
              <circle cx="28" cy="8" r="3" fill="#fff" />
              <path d="M26 6 L30 6" stroke="#333" stroke-width="1.5" stroke-linecap="round" />
              <rect x="14" y="32" width="6" height="4" rx="1" fill="#666" />
            </svg>
          </div>
        </div>
        <div class="stat-card cabinet-card">
          <div class="stat-info">
            <div class="stat-label">换电柜总数</div>
            <div class="stat-value">89</div>
            <div class="stat-status">
              <span class="status-item">使用中 82</span>
              <span class="status-divider">·</span>
              <span class="status-item fault">故障 3</span>
            </div>
          </div>
          <div class="stat-icon">
            <svg viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="cabinetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#4facfe" />
                  <stop offset="100%" stop-color="#00f2fe" />
                </linearGradient>
                <linearGradient id="cabinetBody" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#6bb8ff" />
                  <stop offset="50%" stop-color="#4facfe" />
                  <stop offset="100%" stop-color="#2d8cf0" />
                </linearGradient>
              </defs>
              <rect x="8" y="6" width="32" height="36" rx="4" fill="url(#cabinetBody)" />
              <rect x="10" y="8" width="28" height="32" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="12" y="10" width="24" height="28" rx="1" fill="rgba(0,0,0,0.1)" />
              <rect x="22" y="18" width="4" height="16" fill="rgba(255,255,255,0.2)" />
              <rect x="14" y="12" width="6" height="4" rx="1" fill="#00ff88" />
              <rect x="28" y="12" width="6" height="4" rx="1" fill="#ffaa00" />
              <rect x="14" y="18" width="6" height="4" rx="1" fill="#00ff88" />
              <rect x="28" y="18" width="6" height="4" rx="1" fill="#ff4444" />
              <rect x="14" y="24" width="6" height="4" rx="1" fill="#ffaa00" />
              <rect x="28" y="24" width="6" height="4" rx="1" fill="#00ff88" />
              <rect x="14" y="30" width="6" height="4" rx="1" fill="#ff4444" />
              <rect x="28" y="30" width="6" height="4" rx="1" fill="#ff4444" />
              <rect x="16" y="36" width="2" height="2" rx="0.5" fill="#333" />
              <rect x="30" y="36" width="2" height="2" rx="0.5" fill="#333" />
              <rect x="10" y="2" width="28" height="4" rx="1" fill="#333" />
              <circle cx="24" cy="38" r="2" fill="#555" />
            </svg>
          </div>
        </div>
        <div class="stat-card battery-card">
          <div class="stat-info">
            <div class="stat-label">电池总数</div>
            <div class="stat-value">3,420</div>
            <div class="stat-status">
              <span class="status-item">使用中 2,890</span>
              <span class="status-divider">·</span>
              <span class="status-item fault">故障 14</span>
            </div>
          </div>
          <div class="stat-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <defs>
                <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#00f2fe" />
                  <stop offset="100%" stop-color="#4facfe" />
                </linearGradient>
              </defs>
              <rect x="10" y="8" width="20" height="24" rx="2" fill="rgba(255,255,255,0.2)" />
              <rect x="20" y="4" width="4" height="6" rx="1" fill="rgba(255,255,255,0.3)" />
              <rect x="12" y="10" width="16" height="20" rx="1" fill="url(#batteryGradient)" />
              <rect x="14" y="12" width="12" height="16" rx="1" fill="rgba(255,255,255,0.2)" />
              <line x1="16" y1="16" x2="24" y2="16" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" />
              <line x1="16" y1="20" x2="24" y2="20" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" />
              <line x1="16" y1="24" x2="24" y2="24" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" />
            </svg>
          </div>
        </div>
        <div class="stat-card order-card">
          <div class="stat-info">
            <div class="stat-label">今日总订单</div>
            <div class="stat-value">2,341</div>
            <div class="stat-status">
              <span class="status-item">较昨日</span>
              <span class="change-positive">+6%</span>
            </div>
          </div>
          <div class="stat-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <defs>
                <linearGradient id="orderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#43e97b" />
                  <stop offset="100%" stop-color="#38f9d7" />
                </linearGradient>
              </defs>
              <path d="M6 20h28M6 28h20" stroke="url(#orderGradient)" stroke-width="3" stroke-linecap="round" />
              <rect x="6" y="12" width="12" height="2" fill="url(#orderGradient)" />
              <path d="M18 12L22 8L26 12" stroke="url(#orderGradient)" stroke-width="2" fill="none"
                stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="32" cy="16" r="4" fill="url(#orderGradient)" opacity="0.3" />
              <circle cx="32" cy="16" r="2" fill="url(#orderGradient)" />
            </svg>
          </div>
        </div>
        <div class="stat-card fault-card">
          <div class="stat-info">
            <div class="stat-label">当前故障数</div>
            <div class="stat-value">12</div>
            <div class="stat-status">
              <span class="status-item">共享车 13</span>
              <span class="status-divider">·</span>
              <span class="status-item">换电柜 15</span>
              <span class="status-divider">·</span>
              <span class="status-item">电池 10</span>
            </div>
          </div>
          <div class="stat-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <defs>
                <linearGradient id="faultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ff3860" />
                  <stop offset="100%" stop-color="#ff8c00" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="14" fill="rgba(255,56,96,0.1)" stroke="url(#faultGradient)" stroke-width="2" />
              <path d="M14 20l4-6 4 6 4-6" stroke="url(#faultGradient)" stroke-width="2.5" fill="none"
                stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="20" cy="28" r="3" fill="url(#faultGradient)" />
            </svg>
          </div>
        </div>
        <div class="stat-card online-card">
          <div class="stat-info">
            <div class="stat-label">整体在线率</div>
            <div class="stat-value">98.5%</div>
            <div class="stat-status">
              <span class="status-item">在线 4,720</span>
              <span class="status-divider">·</span>
              <span class="status-item fault">离线 72</span>
            </div>
          </div>
          <div class="stat-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <defs>
                <linearGradient id="onlineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fa729a" />
                  <stop offset="100%" stop-color="#fee140" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
              <circle cx="20" cy="20" r="14" fill="none" stroke="url(#onlineGradient)" stroke-width="2"
                stroke-dasharray="75 20" />
              <circle cx="20" cy="20" r="6" fill="url(#onlineGradient)" />
              <circle cx="20" cy="20" r="3" fill="#ffffff" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-section section-distribution">
      <div class="section-title">设备分布</div>
      <div class="distribution-container">
        <BorderBox1 :dur="5" :color="['#4facfe', '#00f2fe']">
          <div class="distribution-chart">
            <div class="chart-title">各区设备数量分布</div>
            <EChartsWrapper :option="barChartOption" />
          </div>
        </BorderBox1>
        <BorderBox1 :dur="5" :color="['#4facfe', '#00f2fe']">
          <div class="trend-chart">
            <div class="chart-title">今日订单趋势（小时）</div>
            <EChartsWrapper :option="lineChartOption" />
          </div>
        </BorderBox1>
        <BorderBox1 :dur="5" :color="['#4facfe', '#00f2fe']">
          <div class="status-chart">
            <div class="chart-title">设备状态分布</div>
            <EChartsWrapper :option="pieChartOption" />
          </div>
        </BorderBox1>
      </div>
    </div>

    <div class="dashboard-section section-region">
      <div class="section-title">区域详情 · 运维进度</div>
      <div class="region-container">
        <BorderBox10 :dur="5" :color="['#4facfe', '#00f2fe']">
          <div class="region-table">
            <div class="table-title">区域运营数据</div>
            <table class="data-table">
              <thead>
                <tr>
                  <th>区域</th>
                  <th>共享车</th>
                  <th>换电柜</th>
                  <th>电池</th>
                  <th>订单</th>
                  <th>故障占比</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>五华区</td>
                  <td>345</td>
                  <td>25</td>
                  <td>890</td>
                  <td>892</td>
                  <td>
                    <div class="progress-cell">
                      <span class="progress-value">3.2%</span>
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 3.2%"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>盘龙区</td>
                  <td>289</td>
                  <td>22</td>
                  <td>750</td>
                  <td>756</td>
                  <td>
                    <div class="progress-cell">
                      <span class="progress-value">4.1%</span>
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 4.1%"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>官渡区</td>
                  <td>412</td>
                  <td>30</td>
                  <td>920</td>
                  <td>1,102</td>
                  <td>
                    <div class="progress-cell">
                      <span class="progress-value">2.8%</span>
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 2.8%"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>西山区</td>
                  <td>210</td>
                  <td>12</td>
                  <td>850</td>
                  <td>581</td>
                  <td>
                    <div class="progress-cell">
                      <span class="progress-value">5.5%</span>
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 5.5%"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BorderBox10>

        <BorderBox10 :dur="5" :color="['#4facfe', '#00f2fe']">
          <div class="maintenance-progress">
            <div class="list-title">运维完成度</div>
            <div class="progress-list">
              <div class="progress-item">
                <div class="progress-info">
                  <span class="progress-label">共享车维修</span>
                  <span class="progress-text">8/12</span>
                </div>
                <div class="progress-bar-lg">
                  <div class="progress-fill-lg car-progress" style="width: 66.7%"></div>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-info">
                  <span class="progress-label">换电柜维修</span>
                  <span class="progress-text">6/10</span>
                </div>
                <div class="progress-bar-lg">
                  <div class="progress-fill-lg cabinet-progress" style="width: 60%"></div>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-info">
                  <span class="progress-label">电池更换</span>
                  <span class="progress-text">15/20</span>
                </div>
                <div class="progress-bar-lg">
                  <div class="progress-fill-lg battery-progress" style="width: 75%"></div>
                </div>
              </div>
              <div class="progress-item">
                <div class="progress-info">
                  <span class="progress-label">今日巡检</span>
                  <span class="progress-text">45/50</span>
                </div>
                <div class="progress-bar-lg">
                  <div class="progress-fill-lg inspection-progress" style="width: 90%"></div>
                </div>
              </div>
            </div>
          </div>
        </BorderBox10>

        <BorderBox10 :dur="5" :color="['#4facfe', '#00f2fe']">
          <div class="region-radar" style="height: 100%;">
            <div class="table-title">各区综合指数</div>
            <EChartsWrapper :option="radarChartOption" />
          </div>
        </BorderBox10>
      </div>
    </div>

    <!-- 故障列表 · 运维进度模块已注释 -->
    <div v-if="false" class="dashboard-section">
      <div class="section-title">故障列表 · 运维进度</div>
      <div class="fault-container">
        <div class="fault-list">
          <div class="list-title">故障共享车</div>
          <div class="list-content">
            <table class="fault-table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>区域</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CAR-3</td>
                  <td>五华区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAR-12</td>
                  <td>盘龙区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAR-25</td>
                  <td>官渡区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAR-37</td>
                  <td>西山区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAR-48</td>
                  <td>五华区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAR-56</td>
                  <td>盘龙区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAR-67</td>
                  <td>官渡区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAR-78</td>
                  <td>西山区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAR-89</td>
                  <td>五华区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAR-95</td>
                  <td>盘龙区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="fault-list">
          <div class="list-title">故障换电柜</div>
          <div class="list-content">
            <table class="fault-table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>区域</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CAB-2</td>
                  <td>五华区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAB-7</td>
                  <td>盘龙区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAB-15</td>
                  <td>官渡区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAB-23</td>
                  <td>西山区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAB-31</td>
                  <td>五华区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAB-38</td>
                  <td>盘龙区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAB-45</td>
                  <td>官渡区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAB-52</td>
                  <td>西山区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAB-59</td>
                  <td>五华区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>CAB-66</td>
                  <td>盘龙区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="fault-list">
          <div class="list-title">故障电池</div>
          <div class="list-content">
            <table class="fault-table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>区域</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>BAT-8</td>
                  <td>五华区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>BAT-16</td>
                  <td>盘龙区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>BAT-24</td>
                  <td>官渡区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>BAT-32</td>
                  <td>西山区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>BAT-41</td>
                  <td>五华区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>BAT-49</td>
                  <td>盘龙区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>BAT-57</td>
                  <td>官渡区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>BAT-65</td>
                  <td>西山区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>BAT-73</td>
                  <td>五华区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
                <tr>
                  <td>BAT-81</td>
                  <td>盘龙区</td>
                  <td><span class="status-tag fault">故障</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { BorderBox1, BorderBox10 } from '@kjgl77/datav-vue3'
import EChartsWrapper from './EChartsWrapper.vue'

const stats = reactive({
  sharedCarCount: 1256,
  cabinetCount: 89,
  batteryCount: 3420,
  todayOrders: 2341,
  faultCount: 12,
  onlineRate: 98.5
})

const barChartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(26, 26, 46, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    textStyle: { color: '#fff' }
  },
  legend: {
    data: ['共享车', '换电柜', '电池'],
    textStyle: { color: 'rgba(255, 255, 255, 0.7)' },
    bottom: 0
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['五华区', '盘龙区', '官渡区', '西山区'],
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
    axisLabel: { color: 'rgba(255, 255, 255, 0.7)' }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
    axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
  },
  series: [
    {
      name: '共享车',
      type: 'bar',
      data: [345, 289, 412, 210],
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#1d6ef5' }, { offset: 1, color: '#1d6ef5' }] },
        borderRadius: [4, 4, 0, 0]
      }
    },
    {
      name: '换电柜',
      type: 'bar',
      data: [252, 222, 302, 122],
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#00f2fe' }, { offset: 1, color: '#00f2fe' }] },
        borderRadius: [4, 4, 0, 0]
      }
    },
    {
      name: '电池',
      type: 'bar',
      data: [890, 750, 920, 860],
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#f59e0b' }, { offset: 1, color: '#f59e0b' }] },
        borderRadius: [4, 4, 0, 0]
      }
    }
  ]
}))

const lineChartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(26, 26, 46, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    textStyle: { color: '#fff' }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
    axisLabel: { color: 'rgba(255, 255, 255, 0.7)' }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
    axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
  },
  series: [
    {
      name: '订单数',
      type: 'line',
      smooth: true,
      data: [120, 80, 150, 420, 890, 1100, 950, 680, 450],
      lineStyle: { color: '#43e97b', width: 3 },
      itemStyle: { color: '#43e97b' },
      areaStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(67, 233, 123, 0.3)' }, { offset: 1, color: 'rgba(67, 233, 123, 0)' }] }
      }
    }
  ]
}))

const pieChartOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(26, 26, 46, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    textStyle: { color: '#fff' }
  },
  legend: {
    orient: 'vertical',
    right: '5%',
    top: 'center',
    textStyle: { color: 'rgba(255, 255, 255, 0.7)' }
  },
  series: [
    {
      name: '设备状态',
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['40%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 4,
        borderWidth: 3,
        borderColor: 'transparent'
      },
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 16, fontWeight: 'bold', color: '#fff' }
      },
      labelLine: { show: false },
      data: [
        { value: 3326, name: '正常', itemStyle: { color: '#00ff88' } },
        { value: 1188, name: '使用中', itemStyle: { color: '#ffaa00' } },
        { value: 238, name: '故障', itemStyle: { color: '#ff4757' } }
      ]
    }
  ]
}))

const radarChartOption = computed(() => ({
  tooltip: {
    backgroundColor: 'rgba(26, 26, 46, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    textStyle: { color: '#fff' }
  },
  legend: {
    data: ['五华区', '盘龙区', '官渡区', '西山区'],
    bottom: 0,
    textStyle: { color: 'rgba(255, 255, 255, 0.7)' }
  },
  radar: {
    indicator: [
      { name: '使用率', max: 100 },
      { name: '响应速度', max: 100 },
      { name: '订单量', max: 100 },
      { name: '覆盖度', max: 100 }
    ],
    shape: 'polygon',
    splitNumber: 4,
    axisName: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 12 },
    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
    splitArea: { show: false },
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } }
  },
  series: [
    {
      type: 'radar',
      data: [
        { value: [85, 78, 90, 82], name: '五华区', areaStyle: { color: 'rgba(79, 172, 254, 0.3)' }, lineStyle: { color: '#4facfe' } },
        { value: [75, 85, 78, 75], name: '盘龙区', areaStyle: { color: 'rgba(255, 107, 157, 0.3)' }, lineStyle: { color: '#ff6b9d' } },
        { value: [90, 88, 95, 88], name: '官渡区', areaStyle: { color: 'rgba(0, 242, 254, 0.3)' }, lineStyle: { color: '#00f2fe' } },
        { value: [70, 72, 70, 68], name: '西山区', areaStyle: { color: 'rgba(67, 233, 123, 0.3)' }, lineStyle: { color: '#43e97b' } }
      ]
    }
  ]
}))
</script>

<style scoped>
.dashboard {
  padding: 6px 8px;
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  background: #0a1628;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dashboard-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.section-overview {
  flex: 0.5;
}

.section-distribution {
  flex: 1.2;
}

.section-region {
  flex: 1.1;
  padding-bottom: 100px;
}

.section-title {
  font-size: 0.7vw;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 6px;
  margin-top: 20px;
  padding-left: 10px;
  flex-shrink: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.stat-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  border-radius: 12px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top-width: 3px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.car-card {
  border-top-color: #ff6b9d;
}

.cabinet-card {
  border-top-color: #4facfe;
}

.battery-card {
  border-top-color: #00f2fe;
}

.order-card {
  border-top-color: #43e97b;
}

.fault-card {
  border-top-color: #ff3860;
}

.online-card {
  border-top-color: #fa729a;
}

.car-card .stat-value {
  color: #ff6b9d;
}

.cabinet-card .stat-value {
  color: #4facfe;
}

.battery-card .stat-value {
  color: #00f2fe;
}

.order-card .stat-value {
  color: #43e97b;
}

.fault-card .stat-value {
  color: #ff3860;
}

.online-card .stat-value {
  color: #fa729a;
}

.stat-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.46vw;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.65vw;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
}

.stat-status {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 0.63vw;
  white-space: nowrap;
  flex-wrap: nowrap;
}

.status-item {
  color: rgba(255, 255, 255, 0.7);
}

.status-item.fault {
  color: #ff4757;
}

.status-divider {
  color: rgba(255, 255, 255, 0.3);
}

.change-positive {
  color: #00ff88;
  font-weight: 600;
}

.change-negative {
  color: #ff4757;
  font-weight: 600;
}

.distribution-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.distribution-chart,
.trend-chart,
.status-chart {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 12px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}

.chart-title {
  font-size: 0.7vw;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
  font-weight: 500;
  padding-left: 10px;
  position: relative;
}

.chart-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 10px;
  border-radius: 3px;
  background: #00bcd4;
}

.bar-chart {
  height: 200px;
}

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 160px;
  padding-top: 20px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.bar-label {
  font-size: 0.63vw;
  color: rgba(255, 255, 255, 0.6);
}

.bars {
  display: flex;
  gap: 6px;
  height: 130px;
  align-items: flex-end;
}

.bar {
  width: 20px;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}

.bar.car-bar {
  background: linear-gradient(180deg, #ff6b9d, #c44569);
}

.bar.cabinet-bar {
  background: linear-gradient(180deg, #4facfe, #00f2fe);
}

.bar.battery-bar {
  background: linear-gradient(180deg, #00f2fe, #00bcd4);
}

.bar-legend,
.pie-legend {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.67vw;
  color: rgba(255, 255, 255, 0.7);
}

.legend-color {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.legend-color.car {
  background: #ff6b9d;
}

.legend-color.cabinet {
  background: #4facfe;
}

.legend-color.battery {
  background: #00f2fe;
}

.legend-color.normal {
  background: #00ff88;
}

.legend-color.using {
  background: #ffaa00;
}

.legend-color.fault {
  background: #ff4757;
}

.line-chart {
  height: 180px;
}

.chart-svg {
  width: 100%;
  height: 150px;
}

.line-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  margin-top: 8px;
}

.line-labels span {
  font-size: 0.67vw;
  color: rgba(255, 255, 255, 0.5);
}

.pie-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.pie-svg {
  width: 120px;
  height: 120px;
}

.region-container {
  display: grid;
  grid-template-columns: 2.5fr 2fr 1.5fr;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.region-table,
.region-radar,
.maintenance-progress {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  /* border-radius: 12px; */
  padding: 10px;
  /* border: 1px solid rgba(255, 255, 255, 0.1); */
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}

.table-title {
  font-size: 0.7vw;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
  font-weight: 500;
  padding-left: 10px;
  position: relative;
}

.table-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 10px;
  border-radius: 3px;
  background: #00bcd4;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.65vw;
}

.data-table th {
  text-align: left;
  padding: 10px 12px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.data-table td {
  padding: 12px;
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.data-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.05);
}

.progress-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-value {
  font-size: 0.63vw;
  color: rgba(255, 255, 255, 0.8);
  min-width: 40px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.radar-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.radar-svg {
  width: 180px;
  height: 180px;
}

.radar-legend {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.legend-color.wuhua {
  background: #4facfe;
}

.legend-color.panlong {
  background: #ff6b9d;
}

.legend-color.guandu {
  background: #00f2fe;
}

.legend-color.xishan {
  background: #43e97b;
}

.fault-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* .fault-list,
.maintenance-progress {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 12px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
} */

.list-title {
  font-size: 0.7vw;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
  font-weight: 500;
  padding-left: 10px;
  position: relative;
}

.list-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 10px;
  border-radius: 3px;
  background: #00bcd4;
}

.list-content {
  max-height: 280px;
  overflow-y: auto;
}

.fault-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.63vw;
}

.fault-table th {
  text-align: left;
  padding: 8px 10px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  background: rgba(26, 26, 46, 0.95);
}

.fault-table td {
  padding: 10px;
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.fault-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.05);
}

.status-tag {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.67vw;
  font-weight: 500;
}

.status-tag.fault {
  background: rgba(255, 71, 87, 0.2);
  color: #ff4757;
  border: 1px solid rgba(255, 71, 87, 0.3);
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.progress-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-label {
  font-size: 0.65vw;
  color: rgba(255, 255, 255, 0.8);
}

.progress-text {
  font-size: 0.63vw;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}

.progress-bar-lg {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill-lg {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-fill-lg.car-progress {
  background: linear-gradient(90deg, #ff6b9d, #c44569);
}

.progress-fill-lg.cabinet-progress {
  background: linear-gradient(90deg, #4facfe, #00f2fe);
}

.progress-fill-lg.battery-progress {
  background: linear-gradient(90deg, #00f2fe, #00bcd4);
}

.progress-fill-lg.inspection-progress {
  background: linear-gradient(90deg, #43e97b, #38f9d7);
}

.operation-table,
.monitor-panel {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.table-placeholder,
.monitor-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-skeleton,
.monitor-skeleton {
  width: 100%;
  height: 80%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(79, 172, 254, 0.6), rgba(0, 242, 254, 0.6));
  border-radius: 3px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(79, 172, 254, 0.8), rgba(0, 242, 254, 0.8));
}

::-webkit-scrollbar-corner {
  background: transparent;
}

@media screen and (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
