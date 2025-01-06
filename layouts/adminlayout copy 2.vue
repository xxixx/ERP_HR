<template>
  <div class="d-flex flex-column flex-lg-row">
    <!-- 사이드바 (큰 화면에서만 보임) -->
    <nav
      class="d-none d-lg-block p-3"
      style="width: 250px; min-height: 100vh; background: #16b2bc;"
    >
      <p class="text-white border-bottom "></p>
      <ul class="navbar-nav flex-column text-white">
        <!-- 메뉴 항목들 -->
        <li
          class="nav-item menu-item mb-2"
          :class="{ 'active-menu': activeMenu === 'wondan' }"
        >
          <a
            class="nav-link text-white"
            @click="toggleMenu('wondan'); setActiveMenu('wondan')"
            href="#"
            >원단관리</a
          >
          <transition name="menu-slide">
            <ul v-show="menuState.wondan" class="navbar-nav flex-column ms-3">
              <li class="nav-item">
                <NuxtLink v-slot="{ navigate }" custom to="/wondan">
                  <a
                    class="nav-link"
                    href="/wondan/wondanRegister"
                    style="color: var(--bs-body-bg);"
                    >원단등록 +</a
                  >
                </NuxtLink>
              </li>
            </ul>
          </transition>
        </li>

        <!-- 다른 메뉴 항목들... -->
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 메뉴 상태 관리
const menuState = ref({
  wondan: false,
  workOrder: false,
  jaedan: false,
  production: false,
  barcode: false,
  inventory: false,
  worker: false,
  settings: false,
  users: false,
});

// 클릭된 메뉴 항목 상태 관리
const activeMenu = ref(null); // 현재 활성화된 메뉴 항목

// 메뉴 토글
const toggleMenu = (menu) => {
  menuState.value[menu] = !menuState.value[menu];
};

// 활성화된 메뉴를 설정하는 함수
const setActiveMenu = (menu) => {
  activeMenu.value = menu;
};
</script>

<style scoped>
/* 메뉴 슬라이드 애니메이션 */
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: max-height 0.3s ease;
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  max-height: 0;
}
.menu-slide-enter-to,
.menu-slide-leave-from {
  max-height: 500px; /* 적절한 최대 높이 설정 */
}

/* 기본 링크 스타일 */
li a {
  background-color: transparent;
  transition: background-color 0.3s ease;
}

/* 마우스 호버 시 배경색 변경 */
li a:hover {
  background-color: rgba(255, 255, 0, 0.298);
  padding: 10px;
  border-bottom: 1px solid yellow;
}

/* 클릭된 메뉴의 배경색을 노란색으로 변경 */
/* 클릭된 메뉴의 배경색을 노란색으로 변경 */
.active-menu a {
  background-color: yellow;
}
</style>
