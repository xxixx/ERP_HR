import { defineStore } from 'pinia';


export const useWondanStore = defineStore('wondan', {
    state: () => ({
        selectedWondan: null as any,  // user의 타입을 정의
      }),
      actions: {
        setWondan(selectedWondan: any) {  // user의 타입을 정의
          this.selectedWondan = selectedWondan;
          console.log('selectedWondan state updated in store:', this.selectedWondan); // 콘솔 로그 추가
        },
        clearWondan() {
          this.selectedWondan = null;
          console.log('selectedWondan state cleared'); // 콘솔 로그 추가
        }
      },
      // persist: true, // 상태를 로컬 스토리지에 저장
    });
// 애플리케이션의 모든 라우터 네비게이션 이벤트를 감지하여 세션 타임아웃을 확인합니다.
// 이 코드는 Nuxt.js에서 사용하는 경우 미들웨어로 등록할 수 있습니다.
// Nuxt.js가 아닌 경우 애플리케이션의 전역 네비게이션 가드 또는 라우터 이벤트를 활용할 수 있습니다.
