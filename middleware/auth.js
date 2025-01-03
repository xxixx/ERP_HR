import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  
  // 로그인이 필요없는 페이지 목록
  const publicPages = ['/auth/login'];
  const isPublicPage = publicPages.includes(to.path);
  
  // 인증 상태 체크
  const isAuthenticated = authStore.isAuthenticated && 
    localStorage.getItem('accessToken') && 
    localStorage.getItem('refreshToken');
  
  // 현재 페이지가 public이 아니고 인증되지 않은 경우
  if (!isPublicPage && !isAuthenticated) {
    // 토큰 초기화
    authStore.clearAuth();
    // 로그인 페이지로 리다이렉트
    return navigateTo('/auth/login');
  }
});
