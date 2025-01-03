import { sql } from '~~/server/db';


export type JaedanModel = {
  NO: any;
  WORK_ORDER_NO: any;
  WONDAN_STORE: any;
  WONDAN_MANAGER_NO: any;
  LOT: any;
  LENGTH: any;
  Y_COUNT: any;
  MARKS: any;
  COUNT: any;
  DEFECTIVE: any;
  CREATE_DATE: any;
  REG_ACCOUNT: any;
  WORK_DATE: any;
  STATE: any;
  UPDATE_ACCOUNT: any;
  PRODUCTION_ACCOUNT: any;
  // PROCESSCODE: any;
};


// export const getRecord = async () => {
//   const result = await sql({
//     query: `SELECT
//     jr.*,
//     ACCOUNT.NAME as REG_ACCOUNT_NAME,
//     wp.JAEDAN_PART_NAME,  -- 원하는 컬럼 선택
//     PRODUCTION_ACCOUNT.NAME as PRODUCTION_ACCOUNT_NAME
//   FROM
//     JAEDAN_REGIST jr
//   JOIN
//     WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
//   JOIN
//     WORKING_PART wp ON wo.WORKING_PART = wp.ID
//    JOIN 
//    ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
//    LEFT JOIN
//     ACCOUNT PRODUCTION_ACCOUNT ON jr.PRODUCTION_ACCOUNT = PRODUCTION_ACCOUNT.NO 
//     where jr.STATE = 1 or jr.STATE = 2`
//   });

//   return result as JaedanModel[];
// };
export const getRecord10 = async () => {
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
       wpp.PRODUCT_FULLNAME,
       wpp.ProductCode 
  FROM
    JAEDAN jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
   where jr.STATE = 0 or jr.STATE = 1`
  });
// console.log(result);
  return result as JaedanModel[];
};
export const getRecord = async () => {
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
       wpp.PRODUCT_FULLNAME,
       wpp.ProductCode 
  FROM
    JAEDAN jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
    where jr.STATE = 1 or jr.STATE = 2`
  });

  return result as JaedanModel[];
};
export const remove = async (NO: string) => {
  console.log("remove",NO)
  await sql({
    query: 'DELETE FROM JAEDAN WHERE NO = ?',
    values: [NO]
  });

  return true;
};
export const getHistory = async () => {
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
       wpp.PRODUCT_FULLNAME,
       wpp.ProductCode 
  FROM
    JAEDAN jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
    where jr.STATE = 0 or jr.STATE = 1 or jr.STATE = 2`
  });

  return result as JaedanModel[];
};
//페이지별 데이터 가져오기
export const searchRecordsByTerm = async (searchTerm, page: string, limit: string) => {
  const pageNumber = parseInt(page, 10);
  const limitNumber = isNaN(parseInt(limit)) ? 10 : parseInt(limit);

  if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
    throw new Error("Invalid page or limit value");
  }

  const offset = (pageNumber - 1) * limitNumber;

  if (!searchTerm) {
    throw new Error("Search term cannot be empty or undefined.");
  }

  console.log("Received searchTerm:", searchTerm);
  console.log("Searching records with term:", searchTerm);

  const searchPattern = `%${searchTerm}%`;

  try {
    const countQuery = `
      SELECT COUNT(*) as totalCount 
      FROM WONDAN_STORE ws 
      JOIN ACCOUNT a ON ws.REG_ACCOUNT = a.NO 
      WHERE ws.LOT_NO LIKE ? OR ws.WONDAN_NAME LIKE ?
    `;
    const countParams = [searchPattern, searchPattern];
    const countResult = await sql({ query: countQuery, values: countParams });
    const totalCount = countResult[0]?.totalCount || 0;

    console.log("Total count:", totalCount);
    console.log("countResult:", countResult);

    const resultQuery = `
      SELECT ws.*, a.NAME as REG_ACCOUNT 
      FROM WONDAN_STORE ws 
      JOIN ACCOUNT a ON ws.REG_ACCOUNT = a.NO 
      WHERE ws.LOT_NO LIKE ? OR ws.WONDAN_NAME LIKE ?
      LIMIT ? OFFSET ?
    `;
    const resultParams = [searchPattern, searchPattern, limitNumber, offset];
    const result = await sql({ query: resultQuery, values: resultParams });

    console.log("Query result:", result);
    
    const totalPages = Math.ceil(totalCount / limitNumber); // 총 페이지 수 계산

    return {
      totalCount,
      records: result as WondanModel[],
      pageNumber,
      limitNumber,
      totalPages // totalPages 추가
    };
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw new Error("An error occurred while executing the query."); // 에러 메시지 수정
  }
};




//  pagedRecord 
export const getPagedRecord = async (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  console.log(offset)
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
       wpp.PRODUCT_FULLNAME,
       wpp.ProductCode 
  FROM
    JAEDAN jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
    where jr.STATE = 1 or jr.STATE = 2
            LIMIT ? OFFSET ?`,
    values: [pageSize, offset],
  });
console.log(result)
  return result as JaedanModel[];
};


export const getRecordsByDate = async (startDate: string, endDate: string, page: string, limit: string): Promise<JaedanModel[]> => {
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
FROM JAEDAN jr
 JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
WHERE jr.CREATE_DATE >= ? AND jr.CREATE_DATE <= ?
`;
const countParams = [startDate, endDate];

const countResult = await sql({ query: countQuery, values: countParams });
const totalCount = countResult[0]?.totalCount || 0; // 전체 레코드 수
console.log("Total count:", totalCount);
console.log("countResult :", countResult);

// 총 페이지 수 계산
const totalPages = Math.ceil(totalCount / limitNumber);
    const query = `
      SELECT jr.*, ACCOUNT.NAME as REG_ACCOUNT
      FROM JAEDAN jr
      JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
      WHERE jr.CREATE_DATE >= ? AND jr.CREATE_DATE <= ?
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
    return { records: result as JaedanModel[], totalPages };
  } catch (error) {
    console.error("Error in getRecordsByDate:", error);
    throw error;
  }
};




export const getTotalRecords = async () => {
  const result = await sql({
    query: `SELECT COUNT(*) as total FROM JAEDAN`,
    values: [],
  });
console.log(result)
  return result[0].total; // 총 레코드 수 반환
};


// export const getPagedRecord = async (page: number, itemsPerPage: number) => {
//   const offset = (page - 1) * itemsPerPage;
//   const result = await sql({
//     query: `SELECT
//     jr.*,
//     ACCOUNT.NAME as REG_ACCOUNT_NAME,
//        wpp.PRODUCT_FULLNAME,
//        wpp.ProductCode 
//   FROM
//     JAEDAN jr
//   JOIN
//     WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
//   JOIN
//     WORKING_PART wp ON wo.WORKING_PART = wp.NO
//   JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
//    JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
//     where jr.STATE = 0 or jr.STATE = 1 or jr.STATE = 2
//             LIMIT ? OFFSET ?`,
//     values: [itemsPerPage, offset]
//   });
//   return result as JaedanModel[];
// };

// export const getTotalRecords = async () => {
//   const result = await sql({
//     query: `SELECT COUNT(*) as total FROM JAEDAN`
//   });
//   return result[0].total; // Assuming the result is an array with a single object
// };
export const getProcessStateRecord = async () => {
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
       wpp.PRODUCT_FULLNAME,
       wpp.ProductCode 
  FROM
    JAEDAN jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
    where jr.PROCESS_STATE = 0`
  });

  return result as JaedanModel[];
};
export const register = async (data: Pick<JaedanModel, 'WORK_ORDER_NO' | 'WONDAN_STORE' | 'WONDAN_MANAGER_NO' | 'LOT' | 'Y_COUNT' | 'MARKS' | 'COUNT' | 'DEFECTIVE' | 'CREATE_DATE' | 'WORK_DATE' | 'REG_ACCOUNT'>) => {
  const result = (await sql({
    query: `
      INSERT INTO JAEDAN (
        WORK_ORDER_NO,
        WONDAN_STORE,
        WONDAN_MANAGER_NO,
        LOT,
        Y_COUNT,
        MARKS,
        COUNT,
        DEFECTIVE,
        CREATE_DATE,
        WORK_DATE,
        REG_ACCOUNT
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `,
    values: [
      data.WORK_ORDER_NO,
      data.WONDAN_STORE,
      data.WONDAN_MANAGER_NO,
      data.LOT,
      data.Y_COUNT,
      data.MARKS,
      data.COUNT,
      data.DEFECTIVE,
      data.CREATE_DATE,
      data.WORK_DATE,
      data.REG_ACCOUNT
    ]  })) as any;

  // console.log("result============", result);
  return result.affectedRows === 1 ? data : null;  // 수정: 반환된 데이터를 검증 후 반환
};
export const updateState = async (
  NO: string, 
  STATE: number, 
  UPDATE_ACCOUNT: number, 
  PROCESSCODE?: number  // PROCESSCODE는 선택적 매개변수로 설정
) => {
  // 쿼리와 값 배열을 초기화
  let query = 'UPDATE JAEDAN SET STATE = ?, UPDATE_ACCOUNT = ?';
  const values = [STATE, UPDATE_ACCOUNT];

  // PROCESSCODE가 있을 경우 쿼리와 값 배열에 추가
  if (PROCESSCODE !== undefined) {
    query += ', PROCESSCODE = ?';
    values.push(PROCESSCODE);
  }

  // WHERE 절 추가
  query += ' WHERE NO = ?';
  values.push(NO);

  // SQL 실행
  const result = (await sql({
    query: query,
    values: values,
  })) as any;

  // 결과 반환
  return result.affectedRows === 1 ? { success: true } : { success: false };
};
export const updateStateProcess = async (NO: string, PROCESS_STATE: number,PROCESS_STATE_UP_ACCOUNT: number) => {
 const result = (await sql({
       query: 'UPDATE JAEDAN SET PROCESS_STATE = ?, PROCESS_STATE_UP_ACCOUNT = ? WHERE NO = ?',
       values: [PROCESS_STATE, PROCESS_STATE_UP_ACCOUNT,  NO],
     })) as any;
console.log(result)
console.log("query",sql)
  return result.affectedRows === 1 ? { success: true } : { success: false };
};
export const getDetail = async (NO: string) => {
  const result = (await sql({
    query:
      'SELECT jr.*,ACCOUNT.NAME as REG_ACCOUNT_NAME, wpp.PRODUCT_FULLNAME,wpp.ProductCode FROM JAEDAN jr JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO  JOIN  WORKING_PART wp ON wo.WORKING_PART = wp.NO  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO WHERE jr.NO = ?',
    values: [NO],
  })) as any[];

  return result.length === 1 ? (result[0] as JaedanModel) : null;
};
// export const updateState = async (
//   NO: string,
//   STATE: number,
//   UPDATE_ACCOUNT: number,
 
// ) => {
//   try {
//     console.log('Executing updateState with params:', {
//       NO,
//       STATE,
//       UPDATE_ACCOUNT,
     
//     });

//     const result = (await sql({
//       query: 'UPDATE JAEDAN SET STATE = ?, UPDATE_ACCOUNT = ? WHERE NO = ?',
//       values: [STATE, UPDATE_ACCOUNT,  NO],
//     })) as any;

//     console.log('SQL Query Result:', result);

//     return result.affectedRows === 1 ? { success: true } : { success: false };
//   } catch (error) {
//     console.error('Error executing updateState:', error);
//     return { success: false, error: error.message };
//   }
// };
//파트재단
export const partJaedanRegister = async (data: Pick<JaedanModel, 'WORK_ORDER_NO' | 'WONDAN_STORE' | 'WONDAN_MANAGER_NO' | 'LOT' | 'Y_COUNT' | 'MARKS' | 'COUNT' | 'DEFECTIVE' | 'CREATE_DATE' | 'WORK_DATE' | 'REG_ACCOUNT'>) => {
  const result = (await sql({
    query: `
      INSERT INTO PART_JAEDAN (
        WORK_ORDER_NO,
        WONDAN_STORE,
        WONDAN_MANAGER_NO,
        LOT,
        Y_COUNT,
        MARKS,
        COUNT,
        DEFECTIVE,
        CREATE_DATE,
        WORK_DATE,
        REG_ACCOUNT
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `,
    values: [
      data.WORK_ORDER_NO,
      data.WONDAN_STORE,
      data.WONDAN_MANAGER_NO,
      data.LOT,
      data.Y_COUNT,
      data.MARKS,
      data.COUNT,
      data.DEFECTIVE,
      data.CREATE_DATE,
      data.WORK_DATE,
      data.REG_ACCOUNT
    ]  })) as any;

  // console.log("result============", result);
  return result.affectedRows === 1 ? data : null;  // 수정: 반환된 데이터를 검증 후 반환
};
export const getPartJaedanRecord10 = async () => {
  const result = await sql({
    query: `SELECT
     pj.NO as JNO, pj.*,
     jwv.*,ACCOUNT.NO,ACCOUNT.NAME     
  FROM
    PART_JAEDAN pj
  JOIN
    JAEDAN_PRODUCT_PART jpp ON pj.WORK_ORDER_NO = jpp.NO
  JOIN JAEDAN_WONDAN_VIEW jwv ON jpp.JAEDAN_PRODUCT_PART = jwv.JAEDAN_NO
  JOIN ACCOUNT ON pj.REG_ACCOUNT = ACCOUNT.NO
  where pj.JR_STATE = 0 or pj.JR_STATE = 1`
  });
console.log(result); 
  return result as JaedanModel[];
};
export const partJaedaupdateState = async (
  JNO: string, 
  JR_STATE: number,
  PROCESS_STATE: number, 
  UPDATE_ACCOUNT: number, 
  PROCESSCODE?: string  
) => {
  const query = 'UPDATE PART_JAEDAN SET JR_STATE = ?, PROCESS_STATE = ?, UPDATE_ACCOUNT = ?, PROCESSCODE = ? WHERE NO = ?';
  const values = [JR_STATE,PROCESS_STATE, UPDATE_ACCOUNT, PROCESSCODE, JNO];

  // SQL 실행
  const result = (await sql({
    query: query,
    values: values,
  })) as any;

  // 결과 반환
  return result.affectedRows === 1 ? { success: true } : { success: false };
};