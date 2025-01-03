import { sql } from '~~/server/db';

export const register = async (barcode: string) => {
  const result = await sql({
    query: 'INSERT INTO SCM_REGISTER (BARCODE, REG_DATE) VALUES (?, NOW())',
    values: [barcode]
  });
  console.log('Created barcode register:', result);
  return result;
};

export const getRegisters = async () => {
  const result = await sql({
    query: 'SELECT * FROM SCM_REGISTER ORDER BY NO DESC LIMIT 20'
 
  });   return result;
};
export const getPagedRecord = async (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  console.log(offset)
  const result = await sql({
    query: `SELECT * 
            FROM SCM_REGISTER 
            ORDER BY REG_DATE DESC
            LIMIT ? OFFSET ? `,
    values: [pageSize, offset],
  });
console.log(result)
  return result ;
};
export const getTotalRecords = async () => {
  const result = await sql({
    query: `SELECT COUNT(*) as total FROM SCM_REGISTER`,
    values: [],
  });
console.log(result)
  return result[0].total; // 총 레코드 수 반환
};
export const getRecordsByDate = async (startDate: string, endDate: string, page: string, limit: string): Promise<WondanModel[]> => {
  try {
    console.log("Input parameters - startDate:", startDate, "endDate:", endDate, "page:", page, "limit:", limit);

    const pageNumber = parseInt(page, 10);
    // const limitNumber = parseInt(limit, 5);
    const limitNumber = isNaN(parseInt(limit)) ? 10 : parseInt(limit);
    
    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      throw new Error("Invalid page or limit value");
    }

    const offset = (pageNumber - 1) * limitNumber;
// 전체 레코드 수 조회 쿼리
const countQuery = `
SELECT COUNT(*) as totalCount
FROM SCM_REGISTER 
WHERE REG_DATE >= ? AND REG_DATE <= ?
`;
const countParams = [startDate, endDate];

const countResult = await sql({ query: countQuery, values: countParams });
const totalCount = countResult[0]?.totalCount || 0; // 전체 레코드 수
console.log("Total count:", totalCount);
console.log("countResult :", countResult);

// 총 페이지 수 계산
const totalPages = Math.ceil(totalCount / limitNumber);
    const query = `
      SELECT *
      FROM SCM_REGISTER 
      WHERE REG_DATE >= ? AND REG_DATE <= ?
      LIMIT ? OFFSET ?
    `;

    const params = [startDate, endDate, limitNumber, offset];

    console.log("Executing query:", query);
    console.log("With params:", params);

    const result = await sql({ query, values: params });

    console.log("Query result:", result);

    if (!Array.isArray(result)) {
      throw new Error("Unexpected result format");
    }

    // return result as WondanModel[];
    return { records: result , totalPages };
  } catch (error) {
    console.error("Error in getRecordsByDate:", error);
    throw error;
  }
};

export const searchByQuery = async (searchQuery: string, page: number, limit: number) => {
  try {
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const offset = (pageNumber - 1) * limitNumber;
    
    const searchPattern = `%${searchQuery}%`;
    
    // 총 레코드 수 조회
    const countQuery = `
      SELECT COUNT(*) as totalCount 
      FROM SCM_REGISTER 
      WHERE BARCODE LIKE ? 
      OR NO LIKE ?
      OR DATE_FORMAT(REG_DATE, '%Y-%m-%d') LIKE ?`;
    
    const countResult = await sql({
      query: countQuery,
      values: [searchPattern, searchPattern, searchPattern],
    });
    
    const totalCount = countResult[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limitNumber);
    
    // 실제 레코드 조회
    const recordsQuery = `
      SELECT * 
      FROM SCM_REGISTER 
      WHERE BARCODE LIKE ? 
      OR NO LIKE ?
      OR DATE_FORMAT(REG_DATE, '%Y-%m-%d') LIKE ?
      ORDER BY NO DESC
      LIMIT ? OFFSET ?`;
    
    const records = await sql({
      query: recordsQuery,
      values: [searchPattern, searchPattern, searchPattern, limitNumber, offset],
    });
    
    return {
      records,
      totalPages
    };
  } catch (error) {
    console.error("Error in searchByQuery:", error);
    throw error;
  }
};
// export const searchRecordsByTerm = async (searchTerm, page, limit) => {
//   const pageNumber = parseInt(page, 10);
//   const limitNumber = isNaN(parseInt(limit)) ? 10 : parseInt(limit);

//   if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
//     throw new Error("Invalid page or limit value");
//   }

//   const offset = (pageNumber - 1) * limitNumber;

//   if (!searchTerm) {
//     throw new Error("Search term cannot be empty or undefined.");
//   }

//   console.log("Received searchTerm111:", searchTerm);
//   console.log("Searching records with term:", searchTerm);

//   const searchPattern = `%${searchTerm}%`;

//   try {
//     const countQuery = `
//       SELECT COUNT(*) as totalCount FROM SCM_REGISTER WHERE BARCODE LIKE ?`;
//     const countParams = [searchPattern, searchPattern];
//     const countResult = await sql({ query: countQuery, values: countParams });
//     const totalCount = countResult[0]?.totalCount || 0;

//     console.log("Total count:", totalCount);
//     console.log("countResult:", countResult);

//     const resultQuery = `
//       SELECT * FROM SCM_REGISTER WHERE BARCODE LIKE ? LIMIT ? OFFSET ?`;
//     const resultParams = [searchPattern, searchPattern, limitNumber, offset];
//     const result = await sql({ query: resultQuery, values: resultParams });

//     console.log("Query result:", result);
    
//     const totalPages = Math.ceil(totalCount / limitNumber); // 총 페이지 수 계산

//     return {
//       totalCount,
//       records: result,
//       pageNumber,
//       limitNumber,
//       totalPages // totalPages 추가
//     };
//   } catch (error) {
//     console.error("Error executing query:", error.message);
//     throw new Error("An error occurred while executing the query."); // 에러 메시지 수정
//   }
// };