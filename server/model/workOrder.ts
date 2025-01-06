import { sql } from '~~/server/db';

export type WorkOrderModel =  {
  NO: number;
  WORKING_PART: number;
  COUNT: number;
  CREATE_DATE: string;
  STATE: number;
  ORDER_STATE: number;
  REG_ACCOUNT: number;
  ORDER_ACCOUNT: string;
  JAEDAN_PART_NAME: string
  PD_NAME: string
  UPDATE_ACCOUNT: number;
 };

//  export const getOrderWithAccount = async () => {
//     const result = await sql({
//       query: `SELECT wo.*, wp.*, a.NAME, a.EMAIL, a.NO as ACCOUNT_NO
//       FROM WORKING_ORDER wo
//       JOIN WORKING_PART wp ON wo.WORKING_PART = wp.NO
//       JOIN ACCOUNT a ON wo.REG_ACCOUNT = a.NO
//       where wo.STATE = 0;
//       `
//     });
//     return result as WorkOrderModel[];
//   };
 export const getOrderWithAccount = async () => {
    const result = await sql({
      query: `SELECT 
        wo.*, wo.NO as ORDER_NO,wo.STATE as ORDER_STATE,
        wp.*, 
        ac.NAME as ACCOUNT_NAME, 
        ac.EMAIL, 
        ac.NO as ACCOUNT_NO,
         p.PRODUCT_CODE,p.PRODUCT_FULLNAME,
        w.*   -- WONDAN 테이블의 모든 열을 선택
        FROM 
            WORKING_ORDER wo
        JOIN 
            WORKING_PART wp ON wo.WORKING_PART = wp.NO
        JOIN 
            ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
        JOIN 
            PRODUCTS p ON wp.PRODUCT_CODE = p.NO  -- PRODUCTS 테이블을 조인
        JOIN 
            WONDAN w ON wp.WONDAN_NAME = w.NO      -- WONDAN 테이블을 조인
        WHERE 
        wo.STATE = 0 ORDER BY wo.CREATE_DATE DESC LIMIT 20;;
      `
    });
    return result as WorkOrderModel[];
  };
 export const getOrderWithAccountStateUp = async () => {
    const result = await sql({
      query: `SELECT 
        wo.*, wo.NO as ORDER_NO,wo.STATE as ORDER_STATE,
        wp.*, 
        ac.NAME as ACCOUNT_NAME, 
        ac.EMAIL, 
        ac.NO as ACCOUNT_NO,
         p.PRODUCT_CODE,p.PRODUCT_FULLNAME,
        w.*   -- WONDAN 테이블의 모든 열을 선택
        FROM 
            WORKING_ORDER wo
        JOIN 
            WORKING_PART wp ON wo.WORKING_PART = wp.NO
        JOIN 
            ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
        JOIN 
            PRODUCTS p ON wp.PRODUCT_CODE = p.NO  -- PRODUCTS 테이블을 조인
        JOIN 
            WONDAN w ON wp.WONDAN_NAME = w.NO      -- WONDAN 테이블을 조인
        WHERE 
        wo.JAEDAN_STATE = 1 ORDER BY wo.CREATE_DATE DESC LIMIT 20;;
      `
    });
    return result as WorkOrderModel[];
  };
  //페이지별 데이터 가져오기
  export const getPagedRecord2 = async (page: number, itemsPerPage: number) => {
    const offset = (page - 1) * itemsPerPage;
    const result = await sql({
      query: `SELECT 
      wo.*, wo.NO as ORDER_NO,
      wp.*, 
      ac.NAME as ACCOUNT_NAME, 
      ac.EMAIL, 
      ac.NO as ACCOUNT_NO,
      p.*,  -- PRODUCTS 테이블의 모든 열을 선택
      w.*   -- WONDAN 테이블의 모든 열을 선택
      FROM 
          WORKING_ORDER wo
      JOIN 
          WORKING_PART wp ON wo.WORKING_PART = wp.NO
      JOIN 
          ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
      JOIN 
          PRODUCTS p ON wp.PRODUCT_CODE = p.NO  -- PRODUCTS 테이블을 조인
      JOIN 
          WONDAN w ON wp.WONDAN_NAME = w.NO      -- WONDAN 테이블을 조인
      WHERE 
       wo.STATE IN (0, 1, 2)  LIMIT ? OFFSET ?`,
      values: [itemsPerPage, offset]
    });
    return result as WorkOrderModel[];
};
export const getPagedRecord = async (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  console.log(offset)
  const result = await sql({
    query: `SELECT 
    wo.*, wo.NO as ORDER_NO,wo.STATE as ORDER_STATE,
    wp.*, 
    ac.NAME as ACCOUNT_NAME, 
    ac.EMAIL, 
    ac.NO as ACCOUNT_NO,
    p.*,  -- PRODUCTS 테이블의 모든 열을 선택
    w.*   -- WONDAN 테이블의 모든 열을 선택
    FROM 
        WORKING_ORDER wo
    JOIN 
        WORKING_PART wp ON wo.WORKING_PART = wp.NO
    JOIN 
        ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
    JOIN 
        PRODUCTS p ON wp.PRODUCT_CODE = p.NO  -- PRODUCTS 테이블을 조인
    JOIN 
        WONDAN w ON wp.WONDAN_NAME = w.NO      -- WONDAN 테이블을 조인
    WHERE 
    wo.STATE = 0 or wo.STATE = 1 or wo.STATE = 2 ORDER BY 
    wo.CREATE_DATE DESC LIMIT ? OFFSET ?`,
    values: [pageSize, offset],
  });
console.log(result)
  return result as WorkOrderModel[];
};
export const getTotalRecords = async () => {
  const result = await sql({
    query: `SELECT COUNT(*) as total FROM WORKING_ORDER`,
    values: [],
  });
console.log(result)
  return result[0].total; // 총 레코드 수 반환
};

export const getRecordsByDate = async (startDate: string, endDate: string, page: string, limit: string): Promise<WorkOrderModel[]> => {
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
FROM WORKING_ORDER wo
WHERE wo.CREATE_DATE >= ? AND wo.CREATE_DATE <= ?
`;
const countParams = [startDate, endDate];

const countResult = await sql({ query: countQuery, values: countParams });
const totalCount = countResult[0]?.totalCount || 0; // 전체 레코드 수
console.log("Total count:", totalCount);
console.log("countResult :", countResult);

// 총 페이지 수 계산
const totalPages = Math.ceil(totalCount / limitNumber);
    const query = `
     SELECT 
      wo.*, wo.NO as ORDER_NO,
      wp.*, 
      ac.NAME as ACCOUNT_NAME, 
      ac.EMAIL, 
      ac.NO as ACCOUNT_NO,
      p.*,  -- PRODUCTS 테이블의 모든 열을 선택
      w.*   -- WONDAN 테이블의 모든 열을 선택
      FROM 
          WORKING_ORDER wo
      JOIN 
          WORKING_PART wp ON wo.WORKING_PART = wp.NO
      JOIN 
          ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
      JOIN 
          PRODUCTS p ON wp.PRODUCT_CODE = p.NO  -- PRODUCTS 테이블을 조인
      JOIN 
          WONDAN w ON wp.WONDAN_NAME = w.NO      -- WONDAN 테이블을 조인
      WHERE wo.CREATE_DATE >= ? AND wo.CREATE_DATE <= ?
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
    return { records: result as WorkOrderModel[], totalPages };
  } catch (error) {
    console.error("Error in getRecordsByDate:", error);
    throw error;
  }
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
      FROM 
          WORKING_ORDER wo
      JOIN 
          WORKING_PART wp ON wo.WORKING_PART = wp.NO
      JOIN 
          ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
      JOIN 
          PRODUCTS p ON wp.PRODUCT_CODE = p.NO 
      JOIN 
          WONDAN w ON wp.WONDAN_NAME = w.NO   
      WHERE wp.ASSY_PART_NAME LIKE ? OR p.PRODUCT_CODE LIKE ? OR wo.JAEDAN_STATE LIKE ?
    `;
    const countParams = [searchPattern, searchPattern,searchPattern];
    const countResult = await sql({ query: countQuery, values: countParams });
    const totalCount = countResult[0]?.totalCount || 0;

    console.log("Total count:", totalCount);
    console.log("countResult:", countResult);

    const resultQuery = `
      SELECT 
          wo.*, wo.NO as ORDER_NO, wp.*, ac.NAME as ACCOUNT_NAME, ac.EMAIL, ac.NO as ACCOUNT_NO, p.*, w.* 
      FROM 
          WORKING_ORDER wo
      JOIN 
          WORKING_PART wp ON wo.WORKING_PART = wp.NO
      JOIN 
          ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
      JOIN 
          PRODUCTS p ON wp.PRODUCT_CODE = p.NO 
      JOIN 
          WONDAN w ON wp.WONDAN_NAME = w.NO    
      WHERE wp.ASSY_PART_NAME LIKE ? OR p.PRODUCT_CODE LIKE ? OR wo.JAEDAN_STATE LIKE ?
      LIMIT ? OFFSET ?
    `;
    const resultParams = [searchPattern, searchPattern,searchPattern, limitNumber, offset];
    const result = await sql({ query: resultQuery, values: resultParams });

    console.log("Query result:", result);
    
    const totalPages = Math.ceil(totalCount / limitNumber); // 총 페이지 수 계산

    return {
      totalCount,
      records: result as WorkOrderModel[],
      pageNumber,
      limitNumber,
      totalPages // totalPages 추가
    };
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw new Error("An error occurred while executing the query."); // 에러 메시지 수정
  }
};

export const searchDateRange = async ( startDate: string, endDate: string) => {
    const result = await sql({
      query: `SELECT 
      wo.*, wo.NO as ORDER_NO,
      wp.*, 
      ac.NAME as ACCOUNT_NAME, 
      ac.EMAIL, 
      ac.NO as ACCOUNT_NO,
      p.*,  -- PRODUCTS 테이블의 모든 열을 선택
      w.*   -- WONDAN 테이블의 모든 열을 선택
      FROM 
          WORKING_ORDER wo
      JOIN 
          WORKING_PART wp ON wo.WORKING_PART = wp.NO
      JOIN 
          ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
      JOIN 
          PRODUCTS p ON wp.PRODUCT_CODE = p.NO  -- PRODUCTS 테이블을 조인
      JOIN 
          WONDAN w ON wp.WONDAN_NAME = w.NO      -- WONDAN 테이블을 조인
      WHERE 
      wo.STATE = 0 AND wo.CREATE_DATE BETWEEN ? AND ?`,
      values: [ startDate, endDate]
    });
    return result as WorkOrderModel[];
};
export const searchRecords_전부 = async (searchQuery: string, startDate: string, endDate: string) => {
    const result = await sql({
      query: `SELECT 
      wo.*, wo.NO as ORDER_NO,
      wp.*, 
      ac.NAME as ACCOUNT_NAME, 
      ac.EMAIL, 
      ac.NO as ACCOUNT_NO,
      p.*,  -- PRODUCTS 테이블의 모든 열을 선택
      w.*   -- WONDAN 테이블의 모든 열을 선택
      FROM 
          WORKING_ORDER wo
      JOIN 
          WORKING_PART wp ON wo.WORKING_PART = wp.NO
      JOIN 
          ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
      JOIN 
          PRODUCTS p ON wp.PRODUCT_CODE = p.NO  -- PRODUCTS 테이블을 조인
      JOIN 
          WONDAN w ON wp.WONDAN_NAME = w.NO      -- WONDAN 테이블을 조인
      WHERE 
      wo.STATE = 0 AND (wo.LOT_NO LIKE ? OR wo.WONDAN_NAME LIKE ?) AND wo.CREATE_DATE BETWEEN ? AND ?`,
             
      values: [`%${searchQuery}%`, `%${searchQuery}%`, startDate, endDate]
    });
    return result as WorkOrderModel[];
};
export const searchRecords_여러조건 = async (searchQuery: string) => {
    const result = await sql({
      query: `SELECT 
      wo.*, wo.NO as ORDER_NO,
      wp.*, 
      ac.NAME as ACCOUNT_NAME, 
      ac.EMAIL, 
      ac.NO as ACCOUNT_NO,
      p.*,  -- PRODUCTS 테이블의 모든 열을 선택
      w.*   -- WONDAN 테이블의 모든 열을 선택
      FROM 
          WORKING_ORDER wo
      JOIN 
          WORKING_PART wp ON wo.WORKING_PART = wp.NO
      JOIN 
          ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
      JOIN 
          PRODUCTS p ON wp.PRODUCT_CODE = p.NO  -- PRODUCTS 테이블을 조인
      JOIN 
          WONDAN w ON wp.WONDAN_NAME = w.NO      -- WONDAN 테이블을 조인
      WHERE 
      wo.STATE = 0 AND (wp.ASSY_PART_NAME LIKE ? OR wo.WONDAN_NAME LIKE ?)`,
      values: [`%${searchQuery}%`, `%${searchQuery}%`]
    });
    return result as WorkOrderModel[];
};
export const searchRecords = async (searchQuery: string) => {
    const result = await sql({
      query: `SELECT 
      wo.*, wo.NO as ORDER_NO,
      wp.*, 
      ac.NAME as ACCOUNT_NAME, 
      ac.EMAIL, 
      ac.NO as ACCOUNT_NO,
      p.*,  -- PRODUCTS 테이블의 모든 열을 선택
      w.*   -- WONDAN 테이블의 모든 열을 선택
      FROM 
          WORKING_ORDER wo
      JOIN 
          WORKING_PART wp ON wo.WORKING_PART = wp.NO
      JOIN 
          ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
      JOIN 
          PRODUCTS p ON wp.PRODUCT_CODE = p.NO  -- PRODUCTS 테이블을 조인
      JOIN 
          WONDAN w ON wp.WONDAN_NAME = w.NO      -- WONDAN 테이블을 조인
      WHERE 
      wo.STATE = 0 AND (wp.ASSY_PART_NAME LIKE ? OR wo.WONDAN_NAME LIKE ?)`,
      values: [`%${searchQuery}%`, `%${searchQuery}%`]
    });
    return result as WorkOrderModel[];
};
 export const registerOrder = async (data: Pick<WorkOrderModel, 'CREATE_DATE' |'WORKING_PART' |  'COUNT'|'REG_ACCOUNT' >) => {
  const result = (await sql({
    query: `
      INSERT INTO WORKING_ORDER (
        CREATE_DATE,
        WORKING_PART,
        COUNT,
        REG_ACCOUNT
        ) VALUES (
          ?,
          ?,
          ?,
          ?
        )
    `,
    values: [ data.CREATE_DATE,data.WORKING_PART, data.COUNT,data.REG_ACCOUNT]
  })) as any;

  return result.length === 1 ? (result[0] as WorkOrderModel) : null;
};
// export const updateState = async (NO: string) => {
//   const result = (await sql({
//     query: 'UPDATE WORKING_ORDER SET STATE = 1 WHERE NO = ?',
//     values: [NO]
//   })) as any;

//   return result.affectedRows === 1 ? { success: true } : { success: false };
// };
export const updateState = async (NO: string, STATE: number,UPDATE_ACCOUNT: number) => {
  const result = (await sql({
    query: 'UPDATE WORKING_ORDER SET STATE = ?, UPDATE_ACCOUNT = ? WHERE NO = ?',
    values: [STATE, UPDATE_ACCOUNT,NO]
  })) as any;
  console.log(result)
  console.log("query",sql)
  return result.affectedRows === 1 ? { success: true } : { success: false };
};
export const updateStateJadan = async (NO: string, JAEDAN_STATE: number,UPDATE_ACCOUNT: number) => {
  const result = (await sql({
    query: 'UPDATE WORKING_ORDER SET JAEDAN_STATE = ?, UPDATE_ACCOUNT = ? WHERE NO = ?',
    values: [JAEDAN_STATE, UPDATE_ACCOUNT,NO]
  })) as any;
console.log(result)
console.log("query",sql)
  return result.affectedRows === 1 ? { success: true } : { success: false };
};


export const getOrder = async () => {
  const result = await sql({
    query: `SELECT *
    FROM WORKING_ORDER
    JOIN WORKING_PART ON WORKING_ORDER.WORKING_PART = WORKING_PART.NO
    ; 
    `
});


return result as WorkOrderModel[];
};
export const getOrderWithAccount1 = async () => {
  const result = await sql({
    query: `SELECT wo.*, wp.*, a.NAME, a.EMAIL, a.NO as ACCOUNT_NO
    FROM WORKING_ORDER wo
    JOIN WORKING_PART wp ON wo.WORKING_PART = wp.ID
    JOIN ACCOUNT a ON wo.REG_ACCOUNT = a.NO
    where wo.STATE = 0;
    `
  });

  // SELECT *
  //   FROM WORKING_ORDER wo
  //   JOIN PRODUCT pd ON wo.PRODUCT = pd.NO
  //   WHERE wo.PRODUCT = pd.NO;`
  return result as WorkOrderModel[];
};
// export const getOrderWithAccountAll = async () => {
//   const result = await sql({
//     query: `SELECT wo.*, wp.*, a.NAME, a.EMAIL, a.NO as ACCOUNT_NO
//     FROM WORKING_ORDER wo
//     JOIN WORKING_PART wp ON wo.WORKING_PART = wp.ID
//     JOIN ACCOUNT a ON wo.REG_ACCOUNT = a.NO
//    ;
//     `
//   });
export const getOrderWithAccountAll = async () => {
  const result = await sql({
    query: `SELECT 
    wo.*, 
    wp.*, 
    a.NAME, 
    a.EMAIL, 
    a.NO as ACCOUNT_NO,
        p.*  -- PRODUCTS 테이블의 모든 열을 선택
    FROM 
        WORKING_ORDER wo
    JOIN 
        WORKING_PART wp ON wo.WORKING_PART = wp.NO
    JOIN 
        ACCOUNT a ON wo.REG_ACCOUNT = a.NO
    JOIN 
        PRODUCTS p ON wp.PRODUCT_CODE = p.NO  -- PRODUCTS 테이블을 조인
    WHERE 
    wo.STATE = 0;

   ;
    `
  });

  return result as WorkOrderModel[];
};
export const getOrderWithAccountAllPagedRecord = async (page: number, itemsPerPage: number) => {
  const offset = (page - 1) * itemsPerPage;
  const result = await sql({
    query: `SELECT 
    wo.*, 
    wp.*, 
    a.NAME, 
    a.EMAIL, 
    a.NO as ACCOUNT_NO,wo.STATE as ORDER_STATE,
        p.*  -- PRODUCTS 테이블의 모든 열을 선택
    FROM 
        WORKING_ORDER wo
    JOIN 
        WORKING_PART wp ON wo.WORKING_PART = wp.NO
    JOIN 
        ACCOUNT a ON wo.REG_ACCOUNT = a.NO
    JOIN 
        PRODUCTS p ON wp.PRODUCT_CODE = p.NO  -- PRODUCTS 테이블을 조인
    WHERE 
    wo.STATE = 0 AND   LIMIT ? OFFSET ?`,
    values: [itemsPerPage, offset]
     });

  return result as WorkOrderModel[];
};
export const detail = async (NO: string) => {
  const result = (await sql({
    query: 'SELECT wo.*, wp.* FROM WORKING_ORDER wo JOIN WorkingPartProductsWondanViewTable wp ON wo.WORKING_PART = wp.WorkingPartNo WHERE wo.NO = ?',
    values: [NO]
  })) as any;

  return result.length === 1 ? (result[0] as WorkOrderModel) : null;
};
// SELECT wo.*, wp.* FROM WORKING_ORDER wo JOIN WORKING_PART wp ON wo.WORKING_PART = wp.NO WHERE wo.NO = ?',SELECT wo.*, wp.* FROM WORKING_ORDER wo JOIN WORKING_PART wp ON wo.WORKING_PART = wp.NO WHERE wo.NO = ?',
// 'SELECT wo.*, wp.* FROM WORKING_ORDER wo JOIN WorkingPartProductsWondanViewTable wp ON wo.WORKING_PART = wp.WorkingPartNo  WHERE wo.NO = ?',
export const remove = async (NO: string) => {
  console.log("remove",NO)
  await sql({
    query: 'DELETE FROM WORKING_ORDER WHERE NO = ?',
    values: [NO]
  });

  return true;
};

export const getRecord10 = async () => {
  const result = await sql({
    query: `SELECT * FROM WORKING_ORDER ORDER BY CREATE_DATE DESC LIMIT 10;`
  });

  return result as WorkOrderModel[];
};
export const getAllData = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT *  FROM WORKING_ORDER
    
    ORDER BY CREATED_DATE DESC
    `
  });

  return result as WorkOrderModel[];
};



export const partCount = async () => {
  const result = await sql({
    query: `
    SELECT  CATEGORY,SUM(COUNT) as part_count
    FROM DEFECTIVE_DATA
    GROUP BY CATEGORY
    ORDER BY DATE ASC
    LIMIT 30`
  });

  return result as WorkOrderModel[];
};
export const categoryAll = async () => {
  const result = await sql({
    query: `
    SELECT  SUB_CATEGORY,SUM(COUNT) as categoryAll_count
    FROM DEFECTIVE_DATA
    GROUP BY SUB_CATEGORY
    ORDER BY DATE ASC
    LIMIT 30`
  });

  return result as WorkOrderModel[];
};

export const getLastData = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    // query: `
    // SELECT *
    // FROM DEFECTIVE_DATA ORDER BY DATE DESC LIMIT 10
    
    // `
    query: `
    SELECT *
    FROM DEFECTIVE_DATA ORDER BY DATE DESC LIMIT 10
    `
  });

  return result as WorkOrderModel[];
};
export const get10 = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT DATE, CATEGORY,SUB_CATEGORY
    FROM DEFECTIVE_DATA LIMIT 10`
  });

  return result as WorkOrderModel[];
};
export const getPart = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT PART
    FROM PD_NAME`
  });

  return result as WorkOrderModel[];
};
export const getCategory = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT *
    FROM DEFECTIVE_CAT`
  });

  return result as WorkOrderModel[];
};
export const getSubCategory = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT *
    FROM DEFECTIVE_SUB_CAT`
  });

  return result as WorkOrderModel[];
};
// export const insertData = async () => {
//   const result = await sql({
//     // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
//     query: `
//     SELECT DATE, PART,CATEGORY, SUB_CATEGORY,COUNT,ETC,CREATED_DATE
//     FROM DEFECTIVE_DATA
//     WHERE DATE(CREATED_DATE) = CURRENT_DATE LIMIT 10;`
//   });

//   return result as DefectiveModel[];
// };
export const insertData = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT *
    FROM DEFECTIVE_DATA
    WHERE DATE(CREATED_DATE) = CURRENT_DATE LIMIT 10;`
  });

  return result as WorkOrderModel[];
};

// export const detail = async (no: string) => {
//   const result = (await sql({
//     query: 'SELECT id, date, part, category,sub_category,count FROM DEFECTIVE_DATA WHERE no = ?',
//     values: [no]
//   })) as any;

//   return result.length === 1 ? (result[0] as WorkOrderModel) : null;
// };

export const update = async (no: number, data: Pick<WorkOrderModel, 'DATE' | 'PART' | 'CATEGORY' | 'SUB_CATEGORY' | 'COUNT' | 'ETC'>) => {
  await sql({
    query: `
      UPDATE products
      SET
      DATE = ?,
      PART = ?,
      CATEGORY = ?,
      SUB_CATEGORY = ?,
      COUNT = ?,
      ETC = ?
      WHERE no = ?
    `,
    values: [data.DATE, data.PART,data.CATEGORY, data.SUB_CATEGORY,data.COUNT,data.ETC, no]
  });

  return await detail(no);
};


// export const remove = async (NO: string) => {
//   console.log("remove",NO)
//   await sql({
//     query: 'DELETE FROM WORKING_ORDER WHERE NO = ?',
//     values: [NO]
//   });

//   return true;
// };


export const jaedanPartRegisterOrder = async (data: Pick<WorkOrderModel, 'CREATE_DATE' |'JAEDAN_PRODUCT_PART' |  'COUNT'|'REG_ACCOUNT' >) => {
  const result = (await sql({
    query: `
      INSERT INTO JAEDAN_PRODUCT_PART (
        CREATE_DATE,
        JAEDAN_PRODUCT_PART,
        COUNT,
        REG_ACCOUNT
        ) VALUES (
          ?,
          ?,
          ?,
          ?
        )
    `,
    values: [ data.CREATE_DATE,data.JAEDAN_PRODUCT_PART, data.COUNT,data.REG_ACCOUNT]
  })) as any;

  return result.length === 1 ? (result[0] as WorkOrderModel) : null;
};
export const getOrderJaedanPartWithAccount = async () => {
  const result = await sql({
    query: `SELECT 
      wo.*, wp.*, ac.NAME as ACCOUNT_NAME, 
      ac.EMAIL, 
      ac.NO as ACCOUNT_NO     
      FROM 
          JAEDAN_PRODUCT_PART wo
      JOIN 
          JAEDAN_WONDAN_VIEW wp ON wo.JAEDAN_PRODUCT_PART = wp.JAEDAN_NO
      JOIN 
          ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
      WHERE 
      wo.STATE = 0 ORDER BY wo.CREATE_DATE DESC LIMIT 20;
    `
  });
  console.log(result)
  return result as WorkOrderModel[];
};
export const updateStatePartJadan = async (NO: string, STATE: number,UPDATE_ACCOUNT: number) => {
  const result = (await sql({
    query: 'UPDATE JAEDAN_PRODUCT_PART SET STATE = ?, UPDATE_ACCOUNT = ? WHERE NO = ?',
    values: [STATE, UPDATE_ACCOUNT,NO]
  })) as any;
console.log(result)
console.log("query",sql)
  return result.affectedRows === 1 ? { success: true } : { success: false };
};
export const partJadanOrderWithAccountStateUp = async () => {
  const result = await sql({
    query: `SELECT 
      wo.*, wp.*, ac.NAME as ACCOUNT_NAME, 
      ac.EMAIL, 
      ac.NO as ACCOUNT_NO     
      FROM 
          JAEDAN_PRODUCT_PART wo
      JOIN 
          JAEDAN_WONDAN_VIEW wp ON wo.JAEDAN_PRODUCT_PART = wp.JAEDAN_NO
      JOIN 
          ACCOUNT ac ON wo.REG_ACCOUNT = ac.NO
      WHERE 
      wo.STATE = 1 ORDER BY wo.CREATE_DATE DESC LIMIT 20;;
    `
  });
  return result;
};
export const partJaedandetail = async (NO: string) => {
  const result = (await sql({
    query: 'SELECT jp.*, jw.* FROM JAEDAN_PRODUCT_PART jp JOIN JAEDAN_WONDAN_VIEW jw ON jp.JAEDAN_PRODUCT_PART = jw.JAEDAN_NO WHERE jp.NO = ?',
    values: [NO]
  })) as any;

  return result.length === 1 ? (result[0] as WorkOrderModel) : null;
};