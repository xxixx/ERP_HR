import { sql } from '~~/server/db';


export type ProductionModel = {
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
  PROCESSCODE: any;
  JAEDAN_NO: any;
  PROCESS_CODE: any;
  LAST_SERIAL_NUMBER: any;
  PROCESS_BARCODE_COUNT: any;
  PD_ACCOUNT: any;
  PD_DATE: any;
  PD_STATE: any;
  BOX_NO: any;
  QUANTITY: any;
  PROCESS_END_DATE: any;
  PRODUCTION_PART: any;
};
//일생산 등록
export const getProductionParts = async () => {
  const result = await sql({
    query: `SELECT  *  FROM  PRODUCTION_PART`
  });

  return result as ProductionModel[];
};
export const getProductionPartsCushion = async () => {
  const result = await sql({
    query: `SELECT  *  FROM  PRODUCTION_PART WHERE SUB_PART = 'CUSHION'`
  });

  return result as ProductionModel[];
};
export const getProductionPartsFolding = async () => {
  const result = await sql({
    query: `SELECT  *  FROM  PRODUCTION_PART WHERE SUB_PART = 'FOLDING'`
  });

  return result as ProductionModel[];
};
export const getDayProduction = async () => {
  console.log("getDayProduction");
  const result = await sql({
    query: `SELECT dp.*,p_part.PART_NAME, ac.NAME FROM  DAYS_PRODUCTION dp
    join PRODUCTION_PART p_part on dp.PRODUCTION_PART = p_part.NO
    join ACCOUNT ac on dp.REG_ACCOUNT = ac.NO order by dp.REG_DATE desc`
  });

  return result as ProductionModel[];
};
export const getLatestDayProduction = async () => {
  console.log("getDayProduction");
  const result = await sql({
    query: `WITH LatestDate AS (
        SELECT MAX(REG_DATE) as max_date 
        FROM DAYS_PRODUCTION
      )
      SELECT dp.*, p_part.PART_NAME, ac.NAME 
      FROM DAYS_PRODUCTION dp
      JOIN LatestDate ld ON dp.REG_DATE = ld.max_date
      JOIN PRODUCTION_PART p_part ON dp.PRODUCTION_PART = p_part.NO
      JOIN ACCOUNT ac ON dp.REG_ACCOUNT = ac.NO
      ORDER BY dp.NO DESC`
  });

  return result as ProductionModel[];
};
export const getLatestDayProductionCushion = async () => {
  console.log("getDayProduction");
  const result = await sql({
    query: `WITH LatestDate AS (
        SELECT MAX(REG_DATE) as max_date 
        FROM CushionProductionView
      )
      SELECT * 
      FROM CushionProductionView
      WHERE REG_DATE = (SELECT max_date FROM LatestDate)`
  });

  return result as ProductionModel[];
};
export const getLatestDayProductionFolding = async () => {
  console.log("getDayProduction");
  const result = await sql({
    query: `WITH LatestDate AS (
        SELECT MAX(REG_DATE) as max_date 
        FROM FoldingProductionView
      )
      SELECT * 
      FROM FoldingProductionView
      WHERE REG_DATE = (SELECT max_date FROM LatestDate)`
  });

  return result as ProductionModel[];
};
export const getDayProductionNO = async (NO) => {
  console.log(NO);
  const result = await sql({
    query: `SELECT dp.*,p_part.PART_NAME, ac.NAME FROM  DAYS_PRODUCTION dp
    join PRODUCTION_PART p_part on dp.PRODUCTION_PART = p_part.NO
    join ACCOUNT ac on dp.REG_ACCOUNT = ac.NO where dp.NO = ?`,
    values: [NO]
  });

  return result[0] as ProductionModel[];
};

// 일생산 등록 수정 업데이트
export const updateDayProduction = async (data) => {
  const { NO, PRODUCTION_PART, COUNT, WORKERS_COUNT, REG_DATE } = data; // 업데이트할 데이터 추출
  const result = await sql({
    query: `UPDATE DAYS_PRODUCTION SET PRODUCTION_PART = ?, COUNT = ?, WORKERS_COUNT = ?, REG_DATE = ? WHERE NO = ?`, // SQL 쿼리
    values: [PRODUCTION_PART, COUNT, WORKERS_COUNT, REG_DATE, NO] // 쿼리의 값
  });
  return result; // 업데이트 결과 반환
};
//날짜 년월일 변경

// export const getDayProductionNO = async (NO) => {
//   console.log(NO);
//   const result = await sql({
//     query: `SELECT dp.*, p_part.PART_NAME, ac.NAME FROM DAYS_PRODUCTION dp
//             JOIN PRODUCTION_PART p_part ON dp.PRODUCTION_PART = p_part.NO
//             JOIN ACCOUNT ac ON dp.REG_ACCOUNT = ac.NO
//             WHERE dp.NO = ?`,
//     values: [NO]
//   });

//   // 결과를 변환하여 REG_DATE를 원하는 형식으로 변경
//   const formattedResult = result.map(item => {
//     const regDate = new Date(item.REG_DATE); // REG_DATE를 Date 객체로 변환
//     const year = regDate.getUTCFullYear(); // 연도
//     const month = String(regDate.getUTCMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
//     const day = String(regDate.getUTCDate()).padStart(2, '0'); // 일

//     return {
//       ...item,
//       REG_DATE: `${year}-${month}-${day}` // 원하는 형식으로 변환
//     };
//   });

//   return formattedResult as ProductionModel[];
// };

//날짜 등록 변경 

export const dayProductionRegister = async (data: any) => {
  console.log(data);
  
  const result = await sql({
    query: 'INSERT INTO DAYS_PRODUCTION (PRODUCTION_PART, COUNT,WORKERS_COUNT,REG_DATE,REG_ACCOUNT) VALUES (?, ?, ?,?,?)',
    values: [data.PRODUCTION_PART, data.COUNT,data.WORKERS_COUNT, data.REG_DATE,data.REG_ACCOUNT] 
  });
    console.log("result============", result);
  return result;
};

export const dayProductionRegister1 = async (data: any) => {
  console.log(data);

//날짜 등록 변경 

  // REG_DATE를 Date 객체로 변환 후, YYYY-MM-DD 형식으로 포맷팅
  const regDate = new Date(data.REG_DATE);
  const year = regDate.getUTCFullYear();
  const month = String(regDate.getUTCMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
  const day = String(regDate.getUTCDate()).padStart(2, '0'); // 일

  // 포맷팅된 날짜
  const formattedRegDate = `${year}-${month}-${day}`;

  const result = await sql({
    query: 'INSERT INTO DAYS_PRODUCTION (PRODUCTION_PART, COUNT, WORKERS_COUNT, REG_DATE, REG_ACCOUNT) VALUES (?, ?, ?, ?, ?)',
    values: [data.PRODUCTION_PART, data.COUNT, data.WORKERS_COUNT, formattedRegDate, data.REG_ACCOUNT]
  });

  console.log("result============", result);
  return result;
};

export const getProcessStateRecord_backup1 = async () => {
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
       wpp.PRODUCT_FULLNAME,
       wpp.ProductCode ,
       wpp.PRODUCT_BARCODE,
       wpp.PRODUCT_CODE
  FROM
    JAEDAN jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
    where jr.PROCESS_STATE = 1 or jr.PROCESS_STATE = 2`
  });

  return result as ProductionModel[];
};

//
export const getProcessStateRecord_backup = async () => {
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
       wpp.PRODUCT_FULLNAME,
       wpp.ProductCode ,
       wpp.PRODUCT_BARCODE,
       wpp.PRODUCT_CODE
  FROM
    JAEDAN jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
    where jr.PROCESS_STATE = 1 or jr.PROCESS_STATE = 2`
  });

  return result as ProductionModel[];
};

export const getByProcessCode = async (PROCESSCODE) => {
  console.log(PROCESSCODE);
  const result = await sql({
    query: `SELECT
    jr.*,
       wpp.PRODUCT_FULLNAME,
       wpp.ProductCode ,
       wpp.PRODUCT_BARCODE,
       wpp.PRODUCT_CODE
  FROM
    JAEDAN jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
  WHERE jr.PROCESSCODE = ?`,
    values: [PROCESSCODE]
  });

  return result[0] as ProductionModel[];
};
//생산 입고 데이터 조회
export const getProcessStateRecord = async () => {
  const result = await sql({
    query: `
      SELECT
        jr.*,
        ACCOUNT.NAME as REG_ACCOUNT_NAME,
        wpp.PRODUCT_FULLNAME,
        wpp.ProductCode,
        wpp.PRODUCT_BARCODE,
        wpp.PRODUCT_CODE,
        wpp.BOX_COUNT,
        COUNT(DISTINCT sb.NO) as SCANNED_COUNT,
        COALESCE(bc.BARCODE_COUNT, 0) as PRINT_BARCODE_COUNT
      FROM
        JAEDAN jr
      JOIN
        WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
      JOIN
        WORKING_PART wp ON wo.WORKING_PART = wp.NO
      JOIN 
        WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
      JOIN 
        ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
      LEFT JOIN
        SCANNED_BARCODE sb ON jr.PROCESSCODE = sb.PROCESS_CODE
      LEFT JOIN
        BARCODE_COUNT bc ON jr.PROCESSCODE = bc.PROCESS_CODE
      WHERE 
        jr.PROCESS_STATE = 1 OR jr.PROCESS_STATE = 2
      GROUP BY
        jr.NO, jr.PROCESSCODE, ACCOUNT.NAME, wpp.PRODUCT_FULLNAME, 
        wpp.ProductCode, wpp.PRODUCT_BARCODE, wpp.PRODUCT_CODE,
        bc.BARCODE_COUNT
    `
  });

  return result as ProductionModel[];
};
export const getProcessRecord = async () => {
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
       wpp.PRODUCT_FULLNAME,
       wpp.ProductCode ,
       wpp.PRODUCT_BARCODE,
       wpp.PRODUCT_CODE
  FROM
    JAEDAN jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
   order by jr.PROCESS_STATE asc
   `
  });

  return result as ProductionModel[];
};
//생산 대기 데이터 조회
export const getProcessStateStandbyRecord = async () => {
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
       wpp.PRODUCT_FULLNAME,
       wpp.ProductCode ,
       wpp.PRODUCT_BARCODE,
       wpp.PRODUCT_CODE
  FROM
    JAEDAN jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
    where jr.PROCESS_STATE = 1`
  });

  return result as ProductionModel[];
};
//생산 진행 데이터 조회
export const getProcessStateOnRecord = async () => {
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
       wpp.PRODUCT_FULLNAME,
       wpp.ProductCode ,
       wpp.PRODUCT_BARCODE,
       wpp.PRODUCT_CODE
  FROM
    JAEDAN jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.NO
  JOIN WorkingPartProductsWondanViewTable wpp ON wp.NO = wpp.WorkingPartNo
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
    where jr.PROCESS_STATE = 2`
  });

  return result as ProductionModel[];
};
export const updateState = async (NO: string, PD_STATE: number, PD_ACCOUNT: number, PD_DATE: string) => {
  // 날짜 포맷 변환
  const formattedDate = PD_DATE.split('T')[0];
  // 또는
  // const formattedDateTime = PD_DATE.replace('T', ' ').substring(0, 19);

  const result = (await sql({
    query: 'UPDATE JAEDAN SET PD_STATE = ?, PD_ACCOUNT = ?, PD_DATE = ? WHERE NO = ?',
    values: [PD_STATE, PD_ACCOUNT, formattedDate, NO] // 여기에 formattedDate 사용
  })) as any;

  return result.affectedRows === 1 ? { success: true } : { success: false };
};
export const updateStateProcess = async (NO: string, PROCESS_STATE: number,PROCESS_STATE_UP_ACCOUNT: number) => {
  const result = (await sql({
        query: 'UPDATE JAEDAN SET PROCESS_STATE = ?, PROCESS_START_ACCOUNT = ? WHERE NO = ?',
        values: [PROCESS_STATE, PROCESS_STATE_UP_ACCOUNT,  NO],
      })) as any;
 console.log(result)
 console.log("query",sql)
   return result.affectedRows === 1 ? { success: true } : { success: false };
 };
export const processFinish = async (NO: string, PROCESS_STATE: number,PROCESS_STATE_UP_ACCOUNT: number ,PROCESS_END_DATE: string) => {
  const result = (await sql({
        query: 'UPDATE JAEDAN SET PROCESS_STATE = ?, PROCESS_STATE_UP_ACCOUNT = ?, PROCESS_END_DATE = ? WHERE NO = ?',
        values: [PROCESS_STATE, PROCESS_STATE_UP_ACCOUNT,PROCESS_END_DATE, NO],
      })) as any;
 
   return result.affectedRows === 1 ? { success: true } : { success: false };
 };
//사용안하는것
export const getRecord = async () => {
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
    wp.JAEDAN_PART_NAME,  -- 원하는 컬럼 선택
    PRODUCTION_ACCOUNT.NAME as PRODUCTION_ACCOUNT_NAME,wp.*,
    PROCESS_BARCODE_COUNT.*
  FROM
    JAEDAN_REGIST jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.ID
   JOIN 
   ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
   JOIN PROCESS_BARCODE_COUNT  ON jr.PROCESSCODE = PROCESS_BARCODE_COUNT.PROCESS_CODE
   LEFT JOIN
    ACCOUNT PRODUCTION_ACCOUNT ON jr.PRODUCTION_ACCOUNT = PRODUCTION_ACCOUNT.NO 
    where jr.STATE = 2 or jr.STATE = 3`
  });

  return result as ProductionModel[];
};
export const getRecord10 = async () => {
  const result = await sql({
    query: `SELECT
    jr.*,
    ACCOUNT.NAME as REG_ACCOUNT_NAME,
       wp.JAEDAN_PART_NAME  -- 원하는 컬럼 선택
  FROM
    JAEDAN_REGIST jr
  JOIN
    WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
  JOIN
    WORKING_PART wp ON wo.WORKING_PART = wp.ID
   JOIN ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO ;`
  });

  return result as ProductionModel[];
};
// export const getProductionAllData = async () => {
//   const result = await sql({
//     // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
//     query: `
//     SELECT *  FROM PRODUCTION
    
//     ORDER BY DATE DESC
//     `
//   });
//   return result as ProductionModel[];
// };
// export const getProductionAllData = async () => {
//   const result = await sql({
//     query: `SELECT
//       jr.*,
//       ACCOUNT.NAME as REG_ACCOUNT_NAME,
//       wp.JAEDAN_PART_NAME, -- 원하는 컬럼 선택
//       PRODUCTION_ACCOUNT.NAME as PRODUCTION_ACCOUNT_NAME
//     FROM
//       JAEDAN_REGIST jr
//     JOIN
//       WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
//     JOIN
//       WORKING_PART wp ON wo.WORKING_PART = wp.ID
//     JOIN
//       ACCOUNT ON wo.REG_ACCOUNT = ACCOUNT.NO
//     LEFT JOIN
//       ACCOUNT PRODUCTION_ACCOUNT ON jr.PRODUCTION_ACCOUNT = PRODUCTION_ACCOUNT.NO
//     where jr.STATE = 2 or jr.STATE = 3`
//   });

//   return result as ProductionModel[];
// };

export const getProductionByProcessCode = async (processCode: string) => {
  const result = await sql({
    // query: `SELECT * FROM PRODUCTION WHERE PROCESS_CODE = ?`,
    query: `SELECT 
    jr.PROCESSCODE,  
    COUNT(sb.BARCODE) as SCANNED_COUNT,  
    bc.LAST_SERIAL_NUMBER as LAST_SERIAL_NUMBER2
FROM 
    JAEDAN jr
JOIN 
    BARCODE_COUNT bc ON jr.PROCESSCODE = bc.PROCESS_CODE
LEFT JOIN 
    SCANNED_BARCODE sb ON jr.PROCESSCODE = sb.PROCESS_CODE
WHERE 
    jr.PROCESSCODE =  ?`,
    values: [processCode]
  });

  console.log('processCode', processCode);
  console.log('result', result);

  return result[0] as ProductionModel | undefined;
};

export const updateLastSerialNumber = async (processCode: string, lastSerialNumber: number) => {
  await sql({
    query: `UPDATE BARCODE_COUNT SET LAST_SERIAL_NUMBER = ? WHERE PROCESS_CODE = ?`,
    values: [lastSerialNumber, processCode]
  });
  console.log('lastSerialNumber processCode', lastSerialNumber,processCode);

};

export const getBarcodeCount = async (processCode: string) => {
  const result = await sql({
    query: 'SELECT BARCODE_COUNT FROM BARCODE_COUNT WHERE PROCESS_CODE = ?',
    values: [processCode]
  });

  return result;
};



export const productionUpdate = async (data: { PROCESSCODE: string, LOT: string, BOX_NO: number, QUANTITY: number }) => {
  console.log("data============", data); // 데이터를 로그로 출력하여 확인
  if (!data || !data.PROCESSCODE || !data.LOT || !data.BOX_NO || !data.QUANTITY) {
    throw new Error("Invalid data"); // 데이터가 유효하지 않을 때 에러를 발생시킵니다.
  }

  const result = (await sql({
    query: `
      INSERT INTO PRODUCTION (
        PROCESSCODE,
        LOT,
        BOX_NO,
        QUANTITY
      ) VALUES (?, ?, ?, ?)
    `,
    values: [
      data.PROCESSCODE,
      data.LOT,
      data.BOX_NO,
      data.QUANTITY,
    ]
  })) as any;

  console.log("result============", result);
  return result.affectedRows === 1 ? data : null;
};
export const WorkingPartProductsWondanViewTable = async (data: { PROCESSCODE: string; LOT: string; BOX_NO: number; QUANTITY: number }) => {
  console.log("data============", data); // 데이터를 로그로 출력하여 확인
  if (!data || !data.PROCESSCODE || !data.LOT || !data.BOX_NO || !data.QUANTITY) {
    throw new Error("Invalid data"); // 데이터가 유효하지 않을 때 에러를 발생시킵니다.
  }

  // PRODUCTION 테이블에 데이터 삽입
  const insertResult = (await sql({
    query: `
      INSERT INTO PRODUCTION (
        PROCESSCODE,
        LOT,
        BOX_NO,
        QUANTITY
      ) VALUES (?, ?, ?, ?)
    `,
    values: [
      data.PROCESSCODE,
      data.LOT,
      data.BOX_NO,
      data.QUANTITY,
    ]
  })) as any;

  console.log("insertResult============", insertResult);

  if (insertResult.affectedRows === 1) {
    // STOCK 테이블 업데이트
    const updateResult = await sql({
      query: `
        INSERT INTO STOCK (PRODUCT_NO, PRODUCT_CODE, PRODUCT_FULLNAME, COUNT, DATE)
        SELECT 
          wpp.WorkingPartNo AS PRODUCT_NO,            
          wpp.ProductCode AS PRODUCT_CODE,           
          wpp.PRODUCT_FULLNAME AS PRODUCT_FULLNAME, 
          pr.QUANTITY AS COUNT,                     
          pr.CREATE_DATE AS DATE                    
        FROM
          PRODUCTION pr
        JOIN
          JAEDAN jr ON pr.PROCESSCODE = jr.PROCESSCODE
        JOIN
          WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
        JOIN
          WorkingPartProductsWondanViewTable wpp ON wo.WORKING_PART = wpp.WorkingPartNo
        WHERE
          pr.PROCESSCODE = ?
        ON DUPLICATE KEY UPDATE 
          PRODUCT_CODE = VALUES(PRODUCT_CODE),
          PRODUCT_FULLNAME = VALUES(PRODUCT_FULLNAME),
          COUNT = VALUES(COUNT),
          DATE = VALUES(DATE);
      `,
      values: [data.PROCESSCODE]
    }) as any;

    console.log("updateResult============", updateResult);
    
    return updateResult.affectedRows > 0 ? data : null; // 업데이트 결과에 따라 반환
  }

  return null; // INSERT가 실패한 경우 null 반환
};
export const register = async (data: Pick<ProductionModel, 'JAEDAN_NO' | 'PROCESS_CODE' | 'STATE' >) => {
  const result = (await sql({
    query: `
      INSERT INTO PRODUCTION (
        JAEDAN_NO,
        PROCESS_CODE,
        STATE
      ) VALUES (
        ?,
        ?,
        ?
      )
    `,
    values: [
      data.JAEDAN_NO,
      data.PROCESS_CODE,
      data.STATE     
    ]
  })) as any;

  console.log("result============", result);
  return result.affectedRows === 1 ? data : null;  // 수정: 반환된 데이터를 검증 후 반환
};
// export const updateState = async (NO: string, PD_STATE: number,PD_ACCOUNT: number,PD_DATE: string) => {
//   const result = (await sql({
//     query: 'UPDATE JAEDAN_REGIST SET PD_STATE = ?, PD_ACCOUNT = ?,PD_DATE = ? WHERE NO = ?',
//     values: [PD_STATE, PD_ACCOUNT,PD_DATE,NO]
//   })) as any;

//   return result.affectedRows === 1 ? { success: true } : { success: false };
// };


export const partCount = async () => {
  const result = await sql({
    query: `
    SELECT  CATEGORY,SUM(COUNT) as part_count
    FROM DEFECTIVE_DATA
    GROUP BY CATEGORY
    ORDER BY DATE ASC
    LIMIT 30`
  });

  return result as DefectiveCategoryModel[];
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

  return result as DefectiveCategoryModel[];
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

  return result as DefectiveModel[];
};
export const get10 = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT DATE, CATEGORY,SUB_CATEGORY
    FROM DEFECTIVE_DATA LIMIT 10`
  });

  return result as DefectiveModel[];
};
export const getPart = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT PART
    FROM PD_NAME`
  });

  return result as DefectiveCategoryModel[];
};
export const getCategory = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT *
    FROM DEFECTIVE_CAT`
  });

  return result as DefectiveCategoryModel[];
};
export const getSubCategory = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT *
    FROM DEFECTIVE_SUB_CAT`
  });

  return result as DefectiveCategoryModel[];
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

  return result as ProductionModel[];
};

// export const detail = async (PD_NAME: string) => {
//   const result = (await sql({
//     // query: 'SELECT id, date, part, category,sub_category,count FROM DEFECTIVE_DATA WHERE no = ?',
//     query: 'SELECT * FROM JEADAN_ITEM WHERE PRODUCT = ?',
//     values: [PD_NAME]
//   })) as any;

//   return result.length === 1 ? (result[0] as ProductionModel) : null;
// };
export const getDetail = async (NO: string) => {
  const result = (await sql({
    query:
      'SELECT jr.NO, jr.WORK_ORDER_NO, DATE_FORMAT(jr.CREATE_DATE, "%Y-%m-%d") as CREATE_DATE, DATE_FORMAT(jr.WORK_DATE, "%Y-%m-%d") as WORK_DATE, jr.COUNT, jr.LOT, ac.NAME as regAccount, ac2.NAME as updateAccount, wp.PUMBUN,wp.ASSY_PART_NAME,wp.ASSY_SUB_PART_NAME,wp.JAEDAN_PART_NAME,PROCESSCODE FROM JAEDAN_REGIST jr JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO JOIN ACCOUNT ac ON jr.REG_ACCOUNT = ac.NO JOIN ACCOUNT ac2 ON jr.UPDATE_ACCOUNT = ac2.NO JOIN WORKING_PART wp ON wo.WORKING_PART = wp.ID WHERE jr.NO = ?',
    values: [NO],
  })) as any[];

  return result.length === 1 ? (result[0] as ProductionModel) : null;
};

export const update = async (no: number, data: Pick<ProductionModel, 'DATE' | 'PART' | 'CATEGORY' | 'SUB_CATEGORY' | 'COUNT' | 'ETC'>) => {
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


export const remove = async (NO: string) => {
  console.log("remove",NO)
  await sql({
    query: 'DELETE FROM JAEDAN_REGIST WHERE NO = ?',
    values: [NO]
  });

  return true;
};
export const dayProductionremove = async (NO: string) => {
  console.log("remove",NO)
  await sql({
    query: 'DELETE FROM DAYS_PRODUCTION WHERE NO = ?',
    values: [NO]
  });

  return true;
};

// export function updateState(arg0: { WORK_ORDER_NO: any; WONDAN_STORE: any; WONDAN_MANAGER_NO: any; LOT: any; Y_COUNT: any; MARKS: any; COUNT: any; DEFECTIVE: any; CREATE_DATE: any; WORK_DATE: any; REG_ACCOUNT: any; }) {
//   throw new Error('Function not implemented.');
// }
