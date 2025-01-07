<template>
  <div >
    <div  class="text-white text-center mt-2" style="height: 30px;background: var(--bs-yellow);">
       <div class="d-flex justify-content-between print-hide">
          <div> </div>
          <div>MANAGER </div>
     
          <div class="d-flex print-hide">
              <div v-if="accountStore.user">{{ accountStore.user ? accountStore.user.NAME : '' }}</div>
              <!-- <div v-if="accountStore.user">{{ accountStore.user ? accountStore.user.NAME : '' }} {{ accountStore.user ? accountStore.user.EMAIL : '' }}</div> -->
              <div @click="login" v-else class="mx-2">Login</div>
              <div @click="logout"  v-if="accountStore.user"  class="mx-2">Logout</div>
              
          </div>
       </div>
       
      </div>
  
    <div>
      <div class="">
        <div class="d-flex flex-column flex-lg-row print-hide " >
          <!--  -->
          <!-- <div class="col-12 col-lg-2 gx-0 " style="--bs-success: #1cc88a;--bs-success-rgb: 28,200,138;background: #16b2bc;" > -->
          <div class="col-12 col-lg-2 gx-0 " style="--bs-success: #1cc88a;--bs-success-rgb: 28,200,138;background: #16b2bc;" >
          <!-- 토글 -->
            <div class="ms-4 position-relative">
              <p class="text-white py-2"   >MANAGER MOBILE</p>
              <div class="menu-icon btn d-lg-none" @click="toggleMenu">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
              </div>
            </div>
            <!--  -->
            <div class="ms-4  d-lg-block vh-100" :style="{ display: isMenuOpen ? 'none' : 'block' }" >
              <ul class="nav nav-tabs flex-column" style="color: var(--bs-body-bg);">
                <li class="nav-item">
                  <!-- <NuxtLink v-slot="{ navigate }" custom to="/production">
                            <a class="nav-link" href="/barcode/createBarcode" style="color: var(--bs-body-bg);">바코드  출력+ </a>
                          </NuxtLink> -->
                          <NuxtLink v-slot="{ navigate }" custom to="/workOrder">
                            <a class="nav-link" href="/workOrder/workRegister" style="color: var(--bs-body-bg);">공정등록 +</a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/pdinventory/stock">
                            <NuxtLink v-slot="{ navigate }" custom to="/defective">
                            <a class="nav-link" href="/jaedan" style="color: var(--bs-body-bg);">재단물 리스트 + </a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/production">
                            <a class="nav-link" href="/production" style="color: var(--bs-body-bg);">생산 + </a>
                          </NuxtLink>
                            <a class="nav-link" href="/inventory/stock" style="color: var(--bs-body-bg);">생산 등록+ </a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/production">
                            <a class="nav-link" href="/production/barcode" style="color: var(--bs-body-bg);">생산 바코드+ </a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/production">
                            <a class="nav-link" href="/production/barcodeRegister" style="color: var(--bs-body-bg);">생산 바코드 등록+ </a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/production">
                            <a class="nav-link" href="/barcode/barcodeRegister" style="color: var(--bs-body-bg);">생산 바코드 등록+ </a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/pdinventory/delivery">
                            <a class="nav-link" href="/inventory/delivery" style="color: var(--bs-body-bg);">출하 등록+ </a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/pdinventory">
                            <a class="nav-link" href="/inventory" style="color: var(--bs-body-bg);">재고 현항</a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/wondan">
                            <a class="nav-link" href="/wondan/wondanRegister" style="color: var(--bs-body-bg);">원단등록 +</a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/wondan">
                            <a class="nav-link" href="/wondan" style="color: var(--bs-body-bg);">원단조회</a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/worker">
                            <a class="nav-link" href="/worker" style="color: var(--bs-body-bg);">작업자 관리 </a>
                          </NuxtLink>
                          <!-- <NuxtLink v-slot="{ navigate }" custom to="/defective">
                            <a class="nav-link" href="/workOrder/create" style="color: var(--bs-body-bg);">작업등록</a>
                          </NuxtLink> -->
                          <!-- <NuxtLink v-slot="{ navigate }" custom to="/wondan">
                            <a class="nav-link" href="/wondan/wondanRegister" style="color: var(--bs-body-bg);">원단등록 +</a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/wondan">
                            <a class="nav-link" href="/wondan" style="color: var(--bs-body-bg);">원단조회</a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/workOrder">
                            <a class="nav-link" href="/workOrder/workRegister" style="color: var(--bs-body-bg);">공정등록 +</a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/workOrder">
                            <a class="nav-link" href="/workOrder/workOrderAll" style="color: var(--bs-body-bg);">공정 리스트 보기</a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/workOrder">
                            <a class="nav-link" href="/workOrder" style="color: var(--bs-body-bg);">재단등록+</a>
                          </NuxtLink>
                          
                          <NuxtLink v-slot="{ navigate }" custom to="/defective">
                            <a class="nav-link" href="/jaedan/register" style="color: var(--bs-body-bg);">재단 작업 등록 +</a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/defective">
                            <a class="nav-link" href="/jaedan" style="color: var(--bs-body-bg);">재단물 리스트 + </a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/production">
                            <a class="nav-link" href="/production" style="color: var(--bs-body-bg);">생산 + </a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/production">
                            <a class="nav-link" href="/production/barcode" style="color: var(--bs-body-bg);">생산 바코드+ </a>
                          </NuxtLink>
                          
                          <NuxtLink v-slot="{ navigate }" custom to="/production">
                            <a class="nav-link" href="/production/barcodeRegister" style="color: var(--bs-body-bg);">생산 바코드 등록+ </a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/production">
                            <a class="nav-link" href="/barcode/barcodeRegister" style="color: var(--bs-body-bg);">생산 바코드 등록+ </a>
                          </NuxtLink>
                          <hr>
                          <NuxtLink v-slot="{ navigate }" custom to="/pdinventory/stock">
                            <a class="nav-link" href="/pdinventory/stock" style="color: var(--bs-body-bg);">생산 등록+ </a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/pdinventory/delivery">
                            <a class="nav-link" href="/pdinventory/delivery" style="color: var(--bs-body-bg);">출하 등록+ </a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/pdinventory">
                            <a class="nav-link" href="/pdinventory" style="color: var(--bs-body-bg);">재고 현항</a>
                          </NuxtLink>
                          <NuxtLink v-slot="{ navigate }" custom to="/defective/create">
                            <a class="nav-link" href="/defective/create" style="color: var(--bs-body-bg);">불량 등록 + </a>
                          </NuxtLink> -->
                </li>
              </ul>
            </div>

          </div>
          <!--  -->
          <div class="col gx-0">
            <div class="container-fluid ">
                <slot></slot>
            </div>
          
          </div>
          <!--  -->
        </div>

      </div>
    </div>
   
  </div>
</template>

<script lang="ts" setup>
import { useAccount } from '~/composables/account';
// const accountStore = useAccountStore();
import { useAccountStore } from '~/stores/account';
import VueCookies from 'vue-cookies';
import { useCookies } from '@vueuse/integrations/useCookies'
const { user, getUser,refreshToken } = useAccount();
const accountStore = useAccountStore();


//클라이언트 쿠키삭제
// const logout = () => {
  // accountStore.clearUser();
  // VueCookies.remove('jwtToken'); //클라이언트 쿠키삭제

// }

//서버 쿠키삭제
import Cookies from "js-cookie";
import { useRouter } from 'vue-router';
const router = useRouter();
const login = () => { 
  router.push('/account/login2');
  // router.push('/');
}
const logout = () => {
  fetch("/api/account/logout", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    
  })
    .then((response) => {
      if (response.ok) {
        const { remove } = useCookies();
        remove('fineerpToken');
        accountStore.clearUser();
        Cookies.remove("fineerpToken");
        console.log("로그아웃 성공");
          router.push('/');
      } else {
        console.error("로그아웃 실패");
      }
    })
    .catch((error) => {
      console.error("네트워크 오류:", error);
    });
};


const isMenuOpen = ref(true);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const parseJwt = (token: any) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error parsing JWT', e);
    return null;
  }
};

onBeforeMount(() => {
  getUser();
  // refreshToken()
});
</script>

<style>
.menu-icon{
  position: absolute;
  right: 10px;
  top: 0;
}
.sm-font{
  font-size: .7rem; /* Adjust the font size as needed */
}
@media (min-width: 1200px) { /* Adjust the breakpoint as per your requirement for sm size */
  .sm-font{
  font-size: 1rem; /* Adjust the font size as needed */
}
    }

</style>