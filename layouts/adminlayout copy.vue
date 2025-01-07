<template>
    <div class="d-flex flex-column flex-lg-row">
      <!-- 사이드바 (큰 화면에서만 보임) -->
      <nav class="d-none d-lg-block  p-3" style="width: 250px; min-height: 100vh;--bs-success: #1cc88a;--bs-success-rgb: 28,200,138;background: #16b2bc;">
        <h4 class="text-white">Admin Panel</h4>
        <ul class="navbar-nav flex-column text-white">
          <li class="nav-item mb-2">
            <a class="nav-link text-white" @click="toggleMenu('settings')" href="#">Settings</a>
            <ul v-if="menuState.settings" class="navbar-nav flex-column ms-3">
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/admin/settings/profile">Profile Settings</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/admin/settings/account">Account Settings</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/admin/settings/security">Security Settings</NuxtLink>
              </li>
            </ul>
          </li>
          <li class="nav-item mb-2">
            <a class="nav-link text-white" @click="toggleMenu('users')" href="#">Users</a>
            <ul v-if="menuState.users" class="navbar-nav flex-column ms-3">
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/admin/users/list">User List</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/admin/users/roles">Manage Roles</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
  
      <!-- 작은 화면에서 상단 햄버거 메뉴 -->
      <nav class="navbar navbar-expand-lg navbar-dark p-3 d-lg-none" style="--bs-success: #1cc88a;--bs-success-rgb: 28,200,138;background: #16b2bc;">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Admin Panel</a>
          <button
            class="navbar-toggler"
            type="button"
            @click="toggleSidebar"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
  
          <div :class="['collapse', 'navbar-collapse', { 'show': sidebarOpen }]" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" @click="toggleMenu('settings')" href="#">Settings</a>
                <ul v-if="menuState.settings" class="navbar-nav flex-column ms-3">
                  <li class="nav-item">
                    <NuxtLink class="nav-link" to="/admin/settings/profile">Profile Settings</NuxtLink>
                  </li>
                  <li class="nav-item">
                    <NuxtLink class="nav-link" to="/admin/settings/account">Account Settings</NuxtLink>
                  </li>
                  <li class="nav-item">
                    <NuxtLink class="nav-link" to="/admin/settings/security">Security Settings</NuxtLink>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="toggleMenu('users')" href="#">Users</a>
                <ul v-if="menuState.users" class="navbar-nav flex-column ms-3">
                  <li class="nav-item">
                    <NuxtLink class="nav-link" to="/admin/users/list">User List</NuxtLink>
                  </li>
                  <li class="nav-item">
                    <NuxtLink class="nav-link" to="/admin/users/roles">Manage Roles</NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <!-- 페이지 콘텐츠 -->
      <div class="flex-grow-1 p-4">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 메뉴 상태 관리
  const menuState = ref({
    settings: false,
    users: false,
  });
  
  // 작은 화면에서 사이드바 상태 관리
  const sidebarOpen = ref(false);
  
  // 메뉴 토글
  const toggleMenu = (menu) => {
    menuState.value[menu] = !menuState.value[menu];
  };
  
  // 작은 화면에서 사이드바 토글
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };
  </script>
  
  <style scoped>
  /* 큰 화면에서는 사이드바가 항상 보이도록 설정 */
  @media (min-width: 992px) {
    .navbar-nav {
      flex-direction: column;
    }
  }
  </style>