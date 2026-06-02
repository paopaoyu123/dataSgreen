<template>
  <div class="login-container">
    <div class="bg-animation"></div>
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>
    <div class="login-box">
      <div class="login-header">
        <h2>数据可视化平台</h2>
        <p>欢迎登录</p>
      </div>

      <div class="login-tabs">
        <div class="tab-item" :class="{ active: loginType === 'password' }" @click="loginType = 'password'">
          密码登录
        </div>
        <div class="tab-item" :class="{ active: loginType === 'code' }" @click="loginType = 'code'">
          验证码登录
        </div>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-item">
          <div class="input-wrapper">
            <span class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </span>
            <input v-model="form.phone" type="tel" placeholder="请输入手机号" maxlength="11" @blur="validatePhone" />
          </div>
          <span class="error-msg" v-if="errors.phone">{{ errors.phone }}</span>
        </div>

        <div class="form-item" v-if="loginType === 'password'">
          <div class="input-wrapper">
            <span class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor"
                  d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </span>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="请输入密码"
              @blur="validatePassword" />
            <span class="toggle-password" @click="showPassword = !showPassword">
              <svg v-if="showPassword" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor"
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor"
                  d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
              </svg>
            </span>
          </div>
          <span class="error-msg" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div class="form-item" v-else>
          <div class="input-wrapper">
            <span class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor"
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </span>
            <input v-model="form.code" type="text" placeholder="请输入验证码" maxlength="6" @blur="validateCode" />
            <button type="button" class="send-code-btn" :disabled="countdown > 0 || !isPhoneValid" @click="sendCode">
              {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
            </button>
          </div>
          <span class="error-msg" v-if="errors.code">{{ errors.code }}</span>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="form.remember" />
            <span>记住我</span>
          </label>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="isLoading" class="loading-spinner"></span>
          <span v-else>登 录</span>
        </button>
      </form>

      <div class="login-footer">
        <p>还没有账号？<a href="#">立即注册</a></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginType = ref<'password' | 'code'>('password')
const showPassword = ref(false)
const isLoading = ref(false)
const countdown = ref(0)

const form = reactive({
  phone: '18206840445',
  password: '123456',
  code: '',
  remember: false
})

const errors = reactive({
  phone: '',
  password: '',
  code: ''
})

const isPhoneValid = computed(() => {
  return /^1[3-9]\d{9}$/.test(form.phone)
})

const validatePhone = () => {
  if (!form.phone) {
    errors.phone = '请输入手机号'
    return false
  }
  if (!isPhoneValid.value) {
    errors.phone = '请输入正确的手机号'
    return false
  }
  errors.phone = ''
  return true
}

const validatePassword = () => {
  if (loginType.value !== 'password') return true
  if (!form.password) {
    errors.password = '请输入密码'
    return false
  }
  if (form.password.length < 6) {
    errors.password = '密码长度不能少于6位'
    return false
  }
  errors.password = ''
  return true
}

const validateCode = () => {
  if (loginType.value !== 'code') return true
  if (!form.code) {
    errors.code = '请输入验证码'
    return false
  }
  if (form.code.length !== 6) {
    errors.code = '验证码为6位数字'
    return false
  }
  errors.code = ''
  return true
}

const sendCode = async () => {
  if (!validatePhone()) return

  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)

  console.log('发送验证码到:', form.phone)
}

const handleLogin = async () => {
  const isValid = validatePhone() &&
    (loginType.value === 'password' ? validatePassword() : validateCode())

  if (!isValid) return

  isLoading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1500))

    const mockToken = 'mock_token_' + Date.now()
    localStorage.setItem('token', mockToken)
    localStorage.setItem('userInfo', JSON.stringify({
      phone: form.phone,
      loginType: loginType.value
    }))

    if (form.remember) {
      localStorage.setItem('rememberPhone', form.phone)
    } else {
      localStorage.removeItem('rememberPhone')
    }

    router.push('/')
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    isLoading.value = false
  }
}

const initRememberPhone = () => {
  const rememberedPhone = localStorage.getItem('rememberPhone')
  if (rememberedPhone) {
    form.phone = rememberedPhone
    form.remember = true
  }
}

initRememberPhone()
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0e1a 0%, #0f172a 30%, #1e293b 50%, #0f172a 70%, #0a0e1a 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(4px 4px at 30px 40px, rgba(0, 188, 212, 0.6), transparent),
    radial-gradient(3px 3px at 60px 100px, rgba(0, 229, 255, 0.5), transparent),
    radial-gradient(5px 5px at 100px 60px, rgba(0, 188, 212, 0.4), transparent),
    radial-gradient(4px 4px at 150px 120px, rgba(0, 229, 255, 0.5), transparent),
    radial-gradient(3px 3px at 200px 80px, rgba(0, 188, 212, 0.6), transparent),
    radial-gradient(5px 5px at 250px 160px, rgba(0, 229, 255, 0.4), transparent),
    radial-gradient(4px 4px at 320px 100px, rgba(0, 188, 212, 0.5), transparent),
    radial-gradient(3px 3px at 380px 180px, rgba(0, 229, 255, 0.6), transparent),
    radial-gradient(6px 6px at 450px 70px, rgba(0, 188, 212, 0.3), transparent),
    radial-gradient(4px 4px at 500px 140px, rgba(0, 229, 255, 0.4), transparent),
    radial-gradient(3px 3px at 550px 90px, rgba(0, 188, 212, 0.5), transparent),
    radial-gradient(5px 5px at 600px 170px, rgba(0, 229, 255, 0.5), transparent);
  background-repeat: repeat;
  background-size: 650px 200px;
  animation: bgMove 25s linear infinite;
  opacity: 0.8;
}

@keyframes bgMove {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 450px 200px;
  }
}

.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(0, 188, 212, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 188, 212, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(0, 188, 212, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 188, 212, 0.15) 1px, transparent 1px);
  background-size: 50px 50px, 50px 50px, 250px 250px, 250px 250px;
  animation: gridPulse 3s ease-in-out infinite;
}

@keyframes gridPulse {

  0%,
  100% {
    opacity: 0.4;
  }

  50% {
    opacity: 0.9;
  }
}

.bg-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 1000px;
  background:
    radial-gradient(circle, rgba(0, 188, 212, 0.25) 0%, rgba(0, 188, 212, 0.1) 30%, transparent 60%),
    radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 40%);
  filter: blur(80px);
  animation: glowPulse 5s ease-in-out infinite;
}

.bg-glow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(0, 188, 212, 0.3) 0%, rgba(0, 188, 212, 0.1) 40%, transparent 70%);
  filter: blur(40px);
  animation: innerGlow 4s ease-in-out infinite;
}

@keyframes glowPulse {

  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }

  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 1;
  }
}

@keyframes innerGlow {

  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }

  50% {
    transform: translate(-50%, -50%) scale(1.4);
    opacity: 0.8;
  }
}

.login-box {
  width: 100%;
  max-width: 420px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(30px);
  border-radius: 24px;
  padding: 48px;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 0 60px rgba(0, 188, 212, 0.25),
    0 0 100px rgba(0, 229, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  position: relative;
  z-index: 10;
  border: 1px solid rgba(0, 188, 212, 0.3);
  overflow: hidden;
}

.login-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 188, 212, 0.1), transparent);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h2 {
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(90deg, #00bcd4, #00e5ff, #00bcd4);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  animation: titleGlow 3s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(0, 188, 212, 0.5);
}

@keyframes titleGlow {

  0%,
  100% {
    filter: drop-shadow(0 0 10px rgba(0, 188, 212, 0.3));
  }

  50% {
    filter: drop-shadow(0 0 20px rgba(0, 188, 212, 0.6));
    background-position: 200% 0;
  }
}

.login-header p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.login-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 28px;
  background: rgba(15, 23, 42, 0.5);
  padding: 4px;
  border-radius: 10px;
}

.tab-item {
  flex: 1;
  padding: 12px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tab-item.active {
  background: linear-gradient(135deg, #00bcd4, #00e5ff);
  color: #0f172a;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(0, 188, 212, 0.2);
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.input-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00bcd4, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.input-wrapper:focus-within {
  border-color: #00bcd4;
  box-shadow:
    0 0 0 3px rgba(0, 188, 212, 0.2),
    0 0 20px rgba(0, 188, 212, 0.15),
    inset 0 0 20px rgba(0, 188, 212, 0.05);
}

.input-wrapper:focus-within::before {
  opacity: 1;
}

.input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  color: rgba(255, 255, 255, 0.4);
}

.input-wrapper input {
  flex: 1;
  padding: 14px 0;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 15px;
  outline: none;
}

.input-wrapper input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.toggle-password {
  padding: 0 14px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.3s;
}

.toggle-password:hover {
  color: rgba(255, 255, 255, 0.7);
}

.send-code-btn {
  margin: 4px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #00bcd4, #00e5ff);
  border: none;
  border-radius: 8px;
  color: #0f172a;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.send-code-btn:disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
  cursor: not-allowed;
}

.error-msg {
  font-size: 12px;
  color: #ff4757;
  padding-left: 4px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #00bcd4;
  cursor: pointer;
}

.forgot-password {
  color: #00bcd4;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #00e5ff;
}

.login-btn {
  padding: 16px;
  background: linear-gradient(135deg, #00bcd4, #00e5ff, #00bcd4);
  background-size: 200% 100%;
  border: none;
  border-radius: 12px;
  color: #0f172a;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  animation: btnShimmer 3s ease-in-out infinite;
  position: relative;
  overflow: hidden;
}

.login-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow:
    0 15px 30px rgba(0, 188, 212, 0.4),
    0 0 40px rgba(0, 188, 212, 0.2);
  animation: none;
}

.login-btn:hover:not(:disabled)::before {
  left: 100%;
}

@keyframes btnShimmer {

  0%,
  100% {
    background-position: 0% 0;
  }

  50% {
    background-position: 200% 0;
  }
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(15, 23, 42, 0.3);
  border-top-color: #0f172a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.login-footer {
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.login-footer p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.login-footer a {
  color: #00bcd4;
  text-decoration: none;
  font-weight: 500;
}

.login-footer a:hover {
  color: #00e5ff;
}
</style>
