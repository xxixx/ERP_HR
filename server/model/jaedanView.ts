import { sql } from '~~/server/db';



// 뷰에서 데이터 조회

export const getJaedanWondanView = async () => {
  const result = await sql({
    query: `SELECT * FROM JAEDAN_WONDAN_VIEW`
  });

  return result ;
};
