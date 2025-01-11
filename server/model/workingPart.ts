import { sql } from '~/server/db/index';

export type WorkingPartModel = {
  NO: number;
  ASSY_PART_NAME: string;
  WONDAN_CODE: number;
  WONDAN_NAME: string;
  SUB_WONDAN: string;
  PRODUCT_CODE: number;
  BOX_COUNT: number;
  STATE: number;
};

export const getWORKING_PART = async () => {
  const result = await sql({
    // query: 'SELECT * FROM WORKING_PART'
    query: 'SELECT * FROM WorkingPartProductsWondanViewTable'
  });

  return result as WorkingPartModel[];
};
export const getWORKING_PART_JAEDAN = async () => {
  const result = await sql({
    // query: 'SELECT * FROM WORKING_PART'
    query: 'SELECT * FROM WorkingPartProductsWondanViewTable'
  });

  return result as WorkingPartModel[];
};

export const getWorkingPartList = async () => {
  console.log('[Model] getWorkingPartList - 조회 시작');

  try {
    const data = await sql({
      query: `
        SELECT wp.*, w.WONDAN_NAME 
        FROM WORKING_PART wp
        LEFT JOIN WONDAN w ON wp.WONDAN_CODE = w.NO 
       
      `
    });

    console.log('[Model] getWorkingPartList - 조회 결과:', data.length);
    return { data, total: data.length };
  } catch (error) {
    console.error('[Model] getWorkingPartList - 오류 발생:', error);
    throw error;
  }
};

export const searchWorkingPartByTerm = async (searchTerm: string) => {
  console.log('[Model] searchWorkingPartByTerm - 검색 시작, 검색어:', searchTerm);

  try {
    const data = await sql({
      query: `
        SELECT wp.*, w.WONDAN_NAME 
        FROM WORKING_PART wp
        LEFT JOIN WONDAN w ON wp.WONDAN_CODE = w.NO 
        WHERE wp.ASSY_PART_NAME LIKE ? OR wp.SUB_WONDAN LIKE ? OR w.WONDAN_NAME LIKE ?
        ORDER BY wp.NO DESC
      `,
      values: [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
    });

    console.log('[Model] searchWorkingPartByTerm - 검색 결과:', data.length);
    return { data, total: data.length };
  } catch (error) {
    console.error('[Model] searchWorkingPartByTerm - 오류 발생:', error);
    throw error;
  }
};

export const register = async (data: Partial<WorkingPartModel>) => {
  console.log('[Model] register - 등록 시작');

  try {
    const result = await sql({
      query: `
        INSERT INTO WORKING_PART (
          ASSY_PART_NAME,
          WONDAN_CODE,
          WONDAN_NAME,
          SUB_WONDAN,
          PRODUCT_CODE,
          BOX_COUNT,
          STATE
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      values: [
        data.ASSY_PART_NAME,
        data.WONDAN_CODE,
        data.WONDAN_NAME,
        data.SUB_WONDAN,
        data.PRODUCT_CODE,
        data.BOX_COUNT,
        data.STATE || 1
      ]
    });

    return result.insertId ? { ...data, NO: result.insertId } : null;
  } catch (error) {
    console.error('[Model] register - 오류 발생:', error);
    throw error;
  }
};

export const update = async (NO: number, data: Partial<WorkingPartModel>) => {
  console.log('[Model] update - 수정 시작');

  try {
    const result = await sql({
      query: `
        UPDATE WORKING_PART
        SET
          ASSY_PART_NAME = ?,
          WONDAN_CODE = ?,
          WONDAN_NAME = ?,
          SUB_WONDAN = ?,
          PRODUCT_CODE = ?,
          BOX_COUNT = ?,
          STATE = ?
        WHERE NO = ?
      `,
      values: [
        data.ASSY_PART_NAME,
        data.WONDAN_CODE,
        data.WONDAN_NAME,
        data.SUB_WONDAN,
        data.PRODUCT_CODE,
        data.BOX_COUNT,
        data.STATE,
        NO
      ]
    });

    return result.affectedRows === 1;
  } catch (error) {
    console.error('[Model] update - 오류 발생:', error);
    throw error;
  }
};

export const remove = async (NO: number) => {
  console.log('[Model] remove - 삭제 시작');

  try {
    const result = await sql({
      query: 'DELETE FROM WORKING_PART WHERE NO = ?',
      values: [NO]
    });

    return result.affectedRows === 1;
  } catch (error) {
    console.error('[Model] remove - 오류 발생:', error);
    throw error;
  }
};
