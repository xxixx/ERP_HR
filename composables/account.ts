import { useCookies } from '@vueuse/integrations/useCookies';
import { useAccountStore } from '~/stores/account';
import Cookies from 'js-cookie';
const accountStore = useAccountStore();

export const useAccount = () => {
  const user = ref(null);

  const getUser = async () => {
    try {
      const response = await fetch("/api/account/getUser");
      if (response.ok) {
        const userData = await response.json();
        console.log("사용자 정보:", userData);
        user.value = userData;
        accountStore.setUser(userData);
        // 여기서 userData를 이용하여 필요한 작업을 수행할 수 있습니다.


      } else {
        if (response.status === 401) {
          console.log("사용자 정보를 가져오는 데 실패했습니다.", response.status);
          const { remove } = useCookies();
          remove('fineerpToken');
          console.log("로그아웃 성공");
          console.error("토큰이 만료되어 삭제되었습니다.");

          
        } else {
          console.error("사용자 정보를 가져오는데 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는 도중 오류 발생:", error);
    }
  };
  const refreshToken = async () => {
   
    try {
      const newTokenResponse = await fetch("/api/account/refreshToken");
      console.log("newTokenResponse", newTokenResponse);
      const userData = await newTokenResponse.json();
      if (newTokenResponse.ok) {
        console.log("사용자 정보:", userData);
        const user = userData;
        // user.value = userData;
        accountStore.setUser(userData.data);
        // 여기서 userData를 이용하여 필요한 작업을 수행할 수 있습니다.


      } else {
        if (newTokenResponse.status === 401) {
          console.log("사용자 정보를 가져오는 데 실패했습니다.", newTokenResponse.status);
          const { remove } = useCookies();
          remove('fineerpToken');
          console.log("refreshToken 로그아웃 성공");
          console.error("refreshToken 토큰이 만료되어 삭제되었습니다.");

          
        } else {
          const { remove } = useCookies();
          remove('fineerpToken');
          console.error("사용자 정보를 가져오는데 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는 도중 오류 발생:", error);
    }
  };
  

  return {
    user,
    getUser,
    refreshToken
  };
};


// 토큰 갱신 로직 추가

// const cookies = useCookies();
// const token = cookies.get("fineerpToken");
// console.log("토큰:", token);
// const token = Cookies.get('fineerpToken');
// console.log("토큰:", token);

// const token2 = document.cookie.split(';').find(cookie => cookie.trim().startsWith('fineerpToken='));
// const fineerpToken = token2 ? token2.split('=')[1] : null;
// console.log("토큰2:", token2);

// console.log("토큰:", fineerpToken);
// // const token = getCookie('fineerpToken'); // 쿠키에서 토큰을 가져오는 함수(getCookie 함수는 쿠키에서 토큰을 가져오는 로직을 구현해야 함)

// const newTokenResponse = await fetch("/api/account/refreshToken", {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ refreshToken: token }) // 쿠키에서 가져온 토큰을 refreshToken으로 전송
// });

// if (newTokenResponse.ok) {
//   const newTokenData = await newTokenResponse.json();
//   console.log("새로운 토큰:", newTokenData.token);
//   // 새로운 토큰을 저장하고 사용자 정보를 다시 가져올 수 있도록 구현
// } else {
//   const { remove } = useCookies();
//   remove('fineerpToken');
//   console.error("토큰 갱신에 실패했습니다.");
// }