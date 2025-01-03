import { sql } from '~~/server/db';

export type DefectiveModel =  {
  no: number;
  DATE: string;
  PART: string;
  CATEGORY: string;
  SUB_CATEGORY: string;
  COUNT: number;
  SUM: number;
  ETC: string;
  total_count: number;
  CREATED_DATE: string;
};
export type DefectiveCategoryModel =  {
  
  PART: string;
  DESCRIPTIONS: string;
  CATEGORY: string;
  SUB_CATEGORY: string;
  PATERNER: string;
  PARENT_CAT: string;
  filter: string;
  part_count: number;
  categoryAll_count: number;
};

export const read = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT DATE, SUM(COUNT) as total_count
    FROM DEFECTIVE_DATA
    GROUP BY DATE
    ORDER BY DATE ASC
    LIMIT 30`
  });

  return result as DefectiveModel[];
};
export const getAllData = async () => {
  const result = await sql({
    // query: 'SELECT no, DATE, PART,CATEGORY, SUB_CATEGORY,COUNT FROM DEFECTIVE_DATA'
    query: `
    SELECT DATE, PART, CATEGORY, SUB_CATEGORY,COUNT, ETC, CREATED_DATE  FROM DEFECTIVE_DATA
    
    ORDER BY DATE DESC
    `
  });

  return result as DefectiveModel[];
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

  return result as DefectiveModel[];
};
export const create = async (data: Pick<DefectiveModel, 'DATE' | 'PART' | 'CATEGORY' | 'SUB_CATEGORY' | 'COUNT' | 'SUM' | 'ETC'>) => {
  const result = (await sql({
    query: `
      INSERT INTO DEFECTIVE_DATA (
        DATE,
        PART,
        CATEGORY,
        SUB_CATEGORY,
        COUNT,
        SUM,
        ETC
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      ) 
    
    `,
    values: [data.DATE, data.PART,data.CATEGORY, data.SUB_CATEGORY,data.COUNT,data.SUM,data.ETC]
  })) as any;

  return result.length === 1 ? (result[0] as DefectiveModel) : null;
};

export const detail = async (no: string) => {
  const result = (await sql({
    query: 'SELECT id, date, part, category,sub_category,count FROM DEFECTIVE_DATA WHERE no = ?',
    values: [no]
  })) as any;

  return result.length === 1 ? (result[0] as DefectiveModel) : null;
};

export const update = async (no: number, data: Pick<DefectiveModel, 'DATE' | 'PART' | 'CATEGORY' | 'SUB_CATEGORY' | 'COUNT' | 'ETC'>) => {
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


export const remove = async (no: string) => {
  console.log("remove",no)
  await sql({
    query: 'DELETE FROM DEFECTIVE_DATA WHERE no = ?',
    values: [no]
  });

  return true;
};

export const getDataByDate = async (startDate: string, endDate: string) => {
  console.log('getDataByDate 모델 호출:', startDate, endDate);
  
  const query = `
    SELECT *, DATE_FORMAT(DATE, '%y-%m-%d') as formatted_date 
    FROM DEFECTIVE_DATA 
    WHERE DATE BETWEEN ? AND ?
    ORDER BY DATE DESC
  `;
  
  const result = await sql({
    query,
    values: [startDate, endDate]
  });
  
  console.log('조회된 데이터 수:', result.length);
  return result;
};
