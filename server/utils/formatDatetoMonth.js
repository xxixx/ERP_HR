export function formatDateToMonthDay(dateString) {
    const options = { month: '2-digit', day: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
  
    // 점(.)을 제거하고 공백으로 구분된 '월 일' 형식에서 '-'로 연결
    return formattedDate.replace(/\./g, '').replace(/\s/g, '-').trim();
  }