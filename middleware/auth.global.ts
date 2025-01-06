import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  // 클라이언트 사이드에서만 실행
  if (process.client) {
    const authStore = useAuthStore();
    
    // 1. 공개 페이지 정의
    const publicPages = ['/auth/login'];
    const isPublicPage = publicPages.includes(to.path);

    // 2. store 초기화
    if (!authStore.user) {
      authStore.initializeAuth();
    }

    // 3. 관리자 전용 페이지 정의
    const adminPages = ['/admin', '/board/create', '/board/edit'];
    const isAdminPage = adminPages.some(page => to.path.startsWith(page));

    console.log('라우트 체크:', {
      path: to.path,
      isPublicPage,
      isAdminPage,
      userNo: authStore.user?.NO,
      userRole: authStore.user?.ROLE,
      isAuthenticated: authStore.isAuthenticated
    });

    // 4. 로그인 필요한 페이지 체크
    if (!isPublicPage && !authStore.isAuthenticated) {
      console.log('로그인이 필요한 페이지입니다.', authStore);
      console.log('로그인이 필요합니다.');
      return navigateTo('/auth/login');
    }

    // 5. 관리자 권한 체크
    if (isAdminPage && authStore.user?.ROLE !== 'admin') {
      console.log('관리자 권한이 필요한 페이지입니다.');
      return navigateTo(from.path === '/auth/login' ? '/' : from.path);
    }
  }

  return;
});
