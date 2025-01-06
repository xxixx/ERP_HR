<template>
  <div class="layout">
    <aside class="sidebar " :class="{ active: isSidebarActive }">
    <!-- <aside class="sidebar" :class="{ 'sidebar-active': isSidebarActive }"> -->
      <div class="logo">
       
        <h5 class=""><a class="text-white  link-underline link-underline-opacity-0" href="/dashboard">ALKOSC</a></h5>
      </div>
      <nav>
        <ul>
          <li class="borderbox">
            <a class="nav-link text-white" @click="toggleMenu('menu1')" href="#">원단관리</a>
            <ul class="menu" v-show="isMenuVisible('menu1')"> <!-- 대메뉴1 하위 메뉴 보이기 -->
              <li><NuxtLink to="/wondan/wondanRegister">원단등록</NuxtLink></li>
              <li><NuxtLink to="/wondan">원단조회</NuxtLink></li>
              <li><NuxtLink to="/wondan/record">전체원단 조회</NuxtLink></li>
            </ul>
          </li>
          <li class="borderbox">
            <a class="nav-link text-white" @click="toggleMenu('menu2')" href="#">공정관리</a>
            <ul class="menu" v-show="isMenuVisible('menu2')"> <!-- 대메뉴2 하위 메뉴 보이기 -->
              <li><NuxtLink to="/workOrder/workRegister">메인공정등록</NuxtLink></li>
              <li><NuxtLink to="/workOrder/workJaedanPartRegister">재단공정등록</NuxtLink></li>
              <li><NuxtLink to="/workOrder/workOrderAll">공정조회</NuxtLink></li>
            
            </ul>
          </li>
          <li class="borderbox">
            <a class="nav-link text-white" @click="toggleMenu('menu3')" href="#">재단관리</a>
            <ul class="menu" v-show="isMenuVisible('menu3')"> <!-- 대메뉴2 하위 메뉴 보이기 -->
              <li><NuxtLink to="/jaedan/register">메인재단등록</NuxtLink></li>
              <li><NuxtLink to="/jaedan/partregister">파트재단등록</NuxtLink></li>
              <li><NuxtLink to="/jaedan/listpage">재단기록</NuxtLink></li>
              <li><NuxtLink to="/jaedan">재단재고</NuxtLink></li>
              <li><NuxtLink to="/jaedan/processList">공정진행표리스트</NuxtLink></li>
            </ul>
          </li>
          <li class="borderbox">
            <a class="nav-link text-white" @click="toggleMenu('menu4')" href="#">생산관리</a>
            <ul class="menu" v-show="isMenuVisible('menu4')"> <!-- 대메뉴2 하위 메뉴 보이기 -->
              <li><NuxtLink to="/production">생산입고</NuxtLink></li>
              <li><NuxtLink to="/production/stockRegisterCushion">일쿠션생산등록</NuxtLink></li>
              <li><NuxtLink to="/production/stockRegisterFolding">일폴딩생산등록</NuxtLink></li>
              <li><NuxtLink to="/production/stockRegister">작업자관리</NuxtLink></li>
            </ul>
          </li>
         
          <li class="borderbox">
            <a class="nav-link text-white" @click="toggleMenu('menu5')" href="#">바 코 드</a>
            <ul class="menu" v-show="isMenuVisible('menu5')"> <!-- 대메뉴2 하위 메뉴 보이기 -->
              <li><NuxtLink to="/production/barcode">바코드출력</NuxtLink></li>
              <li><NuxtLink to="/production/barcodeRegister">바코드등록</NuxtLink></li>
              <li><NuxtLink to="/production/barcodeRegister">공정마감</NuxtLink></li>
              <li><NuxtLink to="/barcode/barcodeRegister">제품바코드출력</NuxtLink></li>
            </ul>
          </li>
          <li class="borderbox">
            <a class="nav-link text-white" @click="toggleMenu('menu6')" href="#">입출관리</a>
            <ul class="menu" v-show="isMenuVisible('menu6')"> <!-- 대메뉴2 하위 메뉴 보이기 -->
              <li><NuxtLink to="/inventory">재고현황</NuxtLink></li>
              <!-- <li><NuxtLink to="/inventory/production_stock">생산현황</NuxtLink></li> -->
              <li><NuxtLink to="/inventory/stock">입고등록</NuxtLink></li>
              <li><NuxtLink to="/inventory/stcokFromdelivery">출고등록</NuxtLink></li>
            </ul>
          </li>
          
          <li class="borderbox">
            <a class="nav-link text-white" @click="toggleMenu('menu7')" href="#">품질관리</a>
            <ul class="menu" v-show="isMenuVisible('menu7')"> <!-- 대메뉴2 하위 메뉴 보이기 -->
              <li><NuxtLink to="/scm/register">SCM 등록</NuxtLink></li>
              <li><NuxtLink to="/scm/list">SCM 등록 조회</NuxtLink></li>
              <li><NuxtLink to="/defective">불량현황</NuxtLink></li>
              <li><NuxtLink to="/defective/register">불량등록</NuxtLink></li>
              <li><NuxtLink to="/defective/list">불량리스트</NuxtLink></li>
              
            </ul>
          </li>
          <li class="borderbox">
            <a class="nav-link text-white" @click="toggleMenu('menu8')" href="#">제품관리</a>
            <ul class="menu" v-show="isMenuVisible('menu8')"> <!-- 대메뉴2 하위 메뉴 보이기 -->
              <li><NuxtLink to="/products">제품리스트</NuxtLink></li>
              
            </ul>
          </li>
          <li class="borderbox">
            <a class="nav-link text-white" @click="toggleMenu('menu9')" href="#">게 시 판</a>
            <ul class="menu" v-show="isMenuVisible('menu9')"> <!-- 대메뉴2 하위 메뉴 보이기 -->
              <li><NuxtLink to="/board/type/notice">공지사항</NuxtLink></li>
              
            </ul>
          </li>
          <li class="borderbox">
            <a class="nav-link text-white" @click="toggleMenu('menu9')" href="#">사원관리</a>
            <ul class="menu" v-show="isMenuVisible('menu9')"> <!-- 대메뉴2 하위 메뉴 보이기 -->
              <li><NuxtLink to="/hr/employees/">사원관리</NuxtLink></li>
              <li><NuxtLink to="/hr/leave/management/">연차관리</NuxtLink></li>
              
            </ul>
          </li>
          <li v-if="isAdmin" class="borderbox">
            <a class="nav-link text-white" @click="toggleMenu('menu10')" href="#">ADMIN</a>
            <ul class="menu" v-show="isMenuVisible('menu10')"> <!-- 대메뉴2 하위 메뉴 보이기 -->
              <!-- <li><NuxtLink to="/admin/account">회원관리</NuxtLink></li> -->
              <li><NuxtLink to="/admin/accounts">Accounts</NuxtLink></li>
              <li><NuxtLink to="/board">게시판관리</NuxtLink></li>
            </ul>
          </li>
          
        </ul>
      </nav>
    </aside>
    <div class="content" :class="{ 'sidebar-active': isSidebarActive }">
      <header class="main-header">
        <div class="header-content d-flex justify-content-between align-items-center">
          <div class="flex-grow-1"></div>
          <div class="text-end flex-grow-2 ms-5">
            <h5 class="m-0">{{ pageStore.title }}</h5>
          </div>
          <div class="user-info flex-grow-1 text-end">
            <template v-if="authStore.isAuthenticated">
            <span>{{authStore.getUser.name}} 님 환영합니다 </span>
              <button class="btn btn-sm btn-primary-outline btn-login" @click="logout">
                로그아웃
              </button>
            </template>
            <nuxt-link v-else to="/auth/login">
              <button class="btn btn-sm btn-primary-outline btn-login">로그인</button>
            </nuxt-link>
          </div>
          <button class="menu-toggle" @click="toggleSidebar">
            <i class="fas fa-bars"></i>
          </button>
        </div>
        <hr>
      </header>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
//페이지 메타데이터 가져오기
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();

//메뉴 컨트롤
const menuVisibility = ref({ menu1: false, menu2: false,menu3: false,menu4: false,menu5: false,menu6: false,menu7: false,menu8: false,menu9: false ,menu10: false}); // 각 메뉴의 가시성 상태 저장

const toggleMenu = (menu) => {
  // 클릭한 메뉴의 가시성을 토글하고 다른 메뉴는 숨김
  for (const key in menuVisibility.value) {
    menuVisibility.value[key] = (key === menu) ? !menuVisibility.value[key] : false;
  }
}

const isMenuVisible = (menu) => {
  return menuVisibility.value[menu]; // 메뉴 가시성 반환
}

const isSidebarActive = ref(false)

const toggleSidebar = () => {
  isSidebarActive.value = !isSidebarActive.value
}

const logout = () => {
  authStore.clearAuth()
  router.push('/auth/login')
}
const isAdmin = computed(() => {
  const hasAdminRole = authStore.user?.ROLE === 'admin';
  console.log('관리자 권한 여부:', hasAdminRole);
  return hasAdminRole;
});
onMounted(() => {
  // 페이지 로드시 토큰 체크
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
    console.log('레이아웃 마운트 - 인증 상태:', authStore.isAuthenticated);
  console.log('현재 사용자 정보:', authStore.getUser);
  
  if (accessToken && refreshToken) {
    authStore.setTokens(accessToken, refreshToken)
    // 토큰 유효성 검증 및 필요시 갱신
    checkAndRefreshToken()
  }
})

const checkAndRefreshToken = async () => {
  // JWT 토큰 디코딩하여 만료 시간 확인
  const token = authStore.getAccessToken
  if (!token) return

  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(window.atob(base64))
    
    // 토큰 만료 10분 전에 갱신
    const TEN_MINUTES = 10 * 60 * 1000
    if (payload.exp * 1000 - Date.now() < TEN_MINUTES) {
      const success = await authStore.refreshAccessToken()
      if (!success) {
        router.push('/auth/login')
      }
    }
  } catch (error) {
    console.error('Token validation failed:', error)
    router.push('/auth/login')
  }
}
</script>

<style>
.layout {
  display: flex;
  min-height: 100vh;
}

li {
  list-style: none;
  
}
.borderbox {
   margin-bottom: 1px!important;
}
ul li a:hover {
  background-color: rgba(255,255,255,0.1);
}
ul li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 1000;
}


.sidebar {
    transform: translateX(-250px);
  }

  .sidebar.active {
    transform: translateX(0px);
  }
.content {
  flex: 1;
  margin-left: 0px;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
}
.content.sidebar-active {
    margin-left: 250px;
  }

.menu-toggle {
  display:  block;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1001;
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .sidebar {
    transform: translateX(-250px);
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .content {
    margin-left: 0;
  }

  .content.sidebar-active {
    margin-left: 250px;
  }
}

.logo {
  text-align: center;
  margin-bottom: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px;
  display: block;
}

.menu {
  list-style: none;
  padding-left: 20px;
}

.menu li {
  margin: 5px 0 0 20px;
}

.menu a {
  color: #ddd;
  text-decoration: none;
  font-size: 0.9em;
}

.menu a:hover {
  color: white;
}

.borderbox {
  border-bottom: 1px solid #ffffff33;
  margin-bottom: 10px;
}

.main-header {
  background-color: white;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
