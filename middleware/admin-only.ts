export default defineNuxtRouteMiddleware(() => {
  // const { isAdmin, isAuthenticated } = useAuthUser();
  // const isAdmin = useAdmin();
  // const isAuthenticated = useAuthUser();
  const {isAdmin,isAuthenticated} = storeToRefs(useAuthStore());

  if (!isAuthenticated.value) {
    return navigateTo('/auth/login');
  }
  if (!isAdmin.value) {
    return navigateTo('/');
  }
});