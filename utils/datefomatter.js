// export function formatDate(dateString) {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     return new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
//   }

// export function formatDate(dateString) {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
    
//     // 점(.)을 제거하고 공백으로 구분
//     return formattedDate.replace(/\./g, '').trim();
//   }
export function formatDate(dateString) {
  const date = new Date(dateString);
  
  // 날짜의 연도, 월, 일을 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');

  // 원하는 형식으로 반환: 연도 월 일
  return `${year} ${month} ${day}`;
}