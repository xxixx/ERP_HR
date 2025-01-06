// export function formatDate(dateString) {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     return new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
//   }

export function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
    
    // 점(.)을 제거하고 공백으로 구분
    return formattedDate.replace(/\./g, '').trim();
  }
  