import { defineNuxtPlugin } from '#app'
import { useUserStore } from '~/store/user'

export default defineNuxtPlugin(() => {
const userStore = useUserStore()

// 페이지 로드 시 세션 스토리지에서 사용자 정보 복구
if (process.client) {
const storedUser = sessionStorage.getItem('userInfo')
if (storedUser) {
userStore.setUserInfo(JSON.parse(storedUser))
}
}
})