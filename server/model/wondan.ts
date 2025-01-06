import { sql } from '~/server/db/index';


export type WondanModel = {
  NO: any;
  REG_DATE: any;
  WONDAN_NAME: any;
  LOT_NO: any;
  LENGTH: any;
  REAL_LENGTH: any;
  SUPPLIER: any;
  REG_ACCOUNT: any;
  DEFECTIVE_LENGTH: any;
  STATE: any;
  STATE_DATE: any;
  ETC: any;
  UPDATE_ACCOUNT: any;

 
};

export const getWondanCode = async () => {
    const result = await sql({
      query: `SELECT * FROM  WONDAN`,
      values: [] // or values: null, depending on the sql function's requirements
    });
  
    return result as WondanModel[];
  };
  export const getUseable = async () => {
    const result = await sql({
      // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
      query: `
      SELECT NO, WONDAN_NAME, DATE_FORMAT(REG_DATE, '%Y-%m-%d') AS REG_DATE, LOT_NO, LENGTH, REAL_LENGTH, SUPPLIER, REG_ACCOUNT, DEFECTIVE_LENGTH, STATE, STATE_DATE, ETC  FROM WONDAN_STORE WHERE STATE = 0
      `
    });
    return result as WondanModel[];
  };
  export const updateState = async (NO: string, STATE: number,UPDATE_ACCOUNT: number) => {
    const result = (await sql({
      query: 'UPDATE WONDAN_STORE SET STATE = ?, UPDATE_ACCOUNT = ? WHERE NO = ?',
      values: [STATE, UPDATE_ACCOUNT,NO]
    })) as any;
  
    return result.affectedRows === 1 ? { success: true } : { success: false };
  };
  export const remove = async (NO: string) => {
    console.log("remove",NO)
    await sql({
      query: 'DELETE FROM WONDAN_STORE WHERE NO = ?',
      values: [NO]
    });
  
    return true;
  };
  //====================================================
  
  export const getRecord = async () => {
    const result = await sql({
      query: `SELECT ws.*, a.NAME as REG_ACCOUNT 
      FROM WONDAN_STORE ws
      JOIN ACCOUNT a ON ws.REG_ACCOUNT = a.NO ORDER BY ws.NO DESC LIMIT 50`,
    });
  
    return result as WondanModel[];
  };
  export const getPagedRecord = async (page: number, itemsPerPage: number) => {
    const offset = (page - 1) * itemsPerPage;
    const result = await sql({
      query: `SELECT ws.*, a.NAME as REG_ACCOUNT 
      FROM WONDAN_STORE ws
      JOIN ACCOUNT a ON ws.REG_ACCOUNT = a.NO   
      
      LIMIT ? OFFSET ?`,
      values: [itemsPerPage, offset]
    });
    console.log(result)
    return result as WondanModel[];
};
export const getTotalRecords = async () => {
  const result = await sql({
    query: `SELECT COUNT(*) as total FROM WONDAN_STORE`
  });
  return result[0].total; // Assuming the result is an array with a single object
};
export const searchDateRange = async ( startDate: string, endDate: string) => {
  console.log(startDate, endDate)
  const result = await sql({
    query: `SELECT ws.*, a.NAME as REG_ACCOUNT 
      FROM WONDAN_STORE ws
      JOIN ACCOUNT a ON ws.REG_ACCOUNT = a.NO   
      WHERE ws.REG_DATE BETWEEN ? AND ?`,
    values: [ startDate, endDate]
  });
  console.log(result)
  return result as WondanModel[]
};
export const searchRecordsByTerm1 = async (searchTerm) => {
  console.log("Searching records with term:", searchTerm);

  const result = await sql`
    SELECT ws.*, a.NAME as REG_ACCOUNT 
    FROM WONDAN_STORE ws
    JOIN ACCOUNT a ON ws.REG_ACCOUNT = a.NO
    WHERE ws.LOT_NO LIKE ${`%${searchTerm}%`} OR ws.STATE_DATE LIKE ${`%${searchTerm}%`}
  `;

  return result as WondanModel[];
};
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
export const getPagedRecord2 = async (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  console.log(offset)
  const result = await sql({
    query: `SELECT ws.*, a.NAME as REG_ACCOUNT 
            FROM WONDAN_STORE ws
            JOIN ACCOUNT a ON ws.REG_ACCOUNT = a.NO
            ORDER BY ws.REG_DATE DESC
            LIMIT ? OFFSET ? `,
    values: [pageSize, offset],
  });
console.log(result)
  return result as WondanModel[];
};
export const getRecordsByDate_백업 = async (startDate, endDate, page, limit) => {
  console.log("model startDate, endDate, page, limit:", startDate, endDate, page, limit);
  
  // 페이지와 리미트가 숫자인지 확인
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const offset = (pageNumber - 1) * limitNumber; // OFFSET 계산

  const result = await sql({
    query: `
      SELECT ws.*, a.NAME as REG_ACCOUNT 
      FROM WONDAN_STORE ws
      JOIN ACCOUNT a ON ws.REG_ACCOUNT = a.NO
      WHERE ws.REG_DATE >= ? AND ws.REG_DATE <= ?
      LIMIT ? OFFSET ?
    `,
    params: [startDate, endDate, limitNumber, offset], // LIMIT과 OFFSET 순서 수정
  });

  return result as WondanModel[];
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
FROM WONDAN_STORE ws
WHERE ws.REG_DATE >= ? AND ws.REG_DATE <= ?
`;
const countParams = [startDate, endDate];

const countResult = await sql({ query: countQuery, values: countParams });
const totalCount = countResult[0]?.totalCount || 0; // 전체 레코드 수
console.log("Total count:", totalCount);
console.log("countResult :", countResult);

// 총 페이지 수 계산
const totalPages = Math.ceil(totalCount / limitNumber);
    const query = `
      SELECT ws.*, a.NAME as REG_ACCOUNT
      FROM WONDAN_STORE ws
      JOIN ACCOUNT a ON ws.REG_ACCOUNT = a.NO
      WHERE ws.REG_DATE >= ? AND ws.REG_DATE <= ?
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
    return { records: result as WondanModel[], totalPages };
  } catch (error) {
    console.error("Error in getRecordsByDate:", error);
    throw error;
  }
};




export const getTotalRecords2 = async () => {
  const result = await sql({
    query: `SELECT COUNT(*) as total FROM WONDAN_STORE`,
    values: [],
  });
console.log(result)
  return result[0].total; // 총 레코드 수 반환
};


//  pagedRecord 
export const searchRecords2 = async (searchQuery: string) => {
  const result = await sql({
    query: `SELECT ws.*, a.NAME as REG_ACCOUNT 
      FROM WONDAN_STORE ws
      JOIN ACCOUNT a ON ws.REG_ACCOUNT = a.NO
    WHERE 
    wo.STATE = 0 AND (ws.LOT_NO LIKE ? OR ws.REG_DATE LIKE ?)`,
    values: [`%${searchQuery}%`, `%${searchQuery}%`]
  });
  return result as WondanModel[];
};

  export const update = async (NO: number, data: Pick<WondanModel, 'REG_DATE' | 'WONDAN_NAME' | 'LOT_NO' | 'LENGTH' | 'REAL_LENGTH' | 'SUPPLIER' | 'DEFECTIVE_LENGTH' |'STATE'>) => {
    try {
      
      await sql({
        query: `
          UPDATE WONDAN_STORE
          SET
          REG_DATE = ?,
          WONDAN_NAME = ?,
          LOT_NO = ?,
          LENGTH = ?,
          REAL_LENGTH = ?,
          SUPPLIER = ?,
          DEFECTIVE_LENGTH = ?,
          STATE = ?
          WHERE NO = ?
        `,
        values: [data.REG_DATE, data.WONDAN_NAME, data.LOT_NO, data.LENGTH, data.REAL_LENGTH, data.SUPPLIER, data.DEFECTIVE_LENGTH, data.STATE, NO]
      });
  
      console.log('Update successful');
      return await detail(NO);
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  };
  
  
  
  
  
  export const register = async (data:any) => {
    try {
      const existingRecord = await sql({
        query: `
          SELECT * FROM WONDAN_STORE WHERE LOT_NO = ?
        `,
        values: [data.LOT_NO]
      });
  
      if (existingRecord.length > 0) {
        return {
          statusCode: 400,
          statusMessage: 'LOT_NO already exists'
        };
      }
  
      const result = await sql({
        query: `
          INSERT INTO WONDAN_STORE (
            REG_DATE,
            WONDAN_NAME,
            LOT_NO,
            LENGTH,
            REAL_LENGTH,
            SUPPLIER,
            REG_ACCOUNT,
            DEFECTIVE_LENGTH,
            UPDATE_ACCOUNT
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        values: [
          data.REG_DATE,
          data.WONDAN_NAME,
          data.LOT_NO,
          data.LENGTH,
          data.REAL_LENGTH,
          data.SUPPLIER,
          data.REG_ACCOUNT,
          data.DEFECTIVE_LENGTH,
          data.UPDATE_ACCOUNT
        ]
      });
  
      console.log("result============", result);
      return result.affectedRows === 1 ? data : null;
    } catch (error) {
      console.error("Wondan 게시물 생성 중 오류 발생", error);
      throw error;
    }
  };
  // export const updateState = async (NO: string, STATE: number,UPDATE_ACCOUNT: number) => {
  //   const result = (await sql({
  //     query: 'UPDATE WONDAN_STORE SET STATE = ?, UPDATE_ACCOUNT = ? WHERE NO = ?',
  //     values: [STATE, UPDATE_ACCOUNT,NO]
  //   })) as any;
  
  //   return result.affectedRows === 1 ? { success: true } : { success: false };
  // };
  // export const remove = async (NO: string) => {
  //   console.log("remove",NO)
  //   await sql({
  //     query: 'DELETE FROM WONDAN_STORE WHERE NO = ?',
  //     values: [NO]
  //   });
  
  //   return true;
  // };
  
  
  
  //사용안하는것
  
  export const detail = async (NO: number) => {
    const result = (await sql({
      query: 'SELECT * FROM WONDAN_STORE WHERE NO = ?',
      values: [NO]
    })) as any;
  
    return result.length === 1 ? (result[0] as WondanModel) : null;
  };
  