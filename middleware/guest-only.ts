export default defineNuxtRouteMiddleware(() => {
  // const { isAuthenticated } = useAuthUser();
  
  // const isAuthenticated = useAuthUser();
  const {isAuthenticated} = storeToRefs(useAuthStore());
  if (isAuthenticated.value) {
    if(process.server) return navigateTo('/');
    return abortNavigation();
  }
});