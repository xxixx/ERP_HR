import { sql,transaction } from '~~/server/db';
export type ScannedBarcodeModel = {
    NO: any;
    BARCODE: any;
    CREATE_DATE: any;
    PROCESS_CODE: any;
    PROCESSCODE: any;
    LOT: any;
    BOX_NO: Number;
    boxNumber: Number;
  };
   
    
  

  // export const saveScannedBarcode = async (data: Pick<ScannedBarcodeModel, 'BARCODE' | 'CREATE_DATE' | 'PROCESS_CODE'>) => {
  //   try {
  //     await sql.transaction(async (tx) => {
  //       const insertResult = await tx.query('INSERT INTO SCANNED_BARCODE (BARCODE, CREATE_DATE, PROCESS_CODE) VALUES (?, ?, ?)', [data.BARCODE, data.CREATE_DATE, data.PROCESS_CODE]);
  
  //       if (insertResult.affectedRows === 0) {
  //         throw new Error('바코드 등록에 실패했습니다.');
  //       }
  
  //       const updateResult = await tx.query('INSERT INTO PROCESS_BARCODE_COUNT (PROCESS_CODE, BARCODE_COUNT) VALUES (?, 1) ON DUPLICATE KEY UPDATE BARCODE_COUNT = BARCODE_COUNT + 1', [data.PROCESS_CODE]);
  
  //       if (updateResult.affectedRows === 0) {
  //         throw new Error('PROCESS_BARCODE_COUNT 업데이트에 실패했습니다.');
  //       }
  //     });
  
  //     return { success: true };
  //   } catch (err) {
  //     console.error('Error saving scanned barcode:', err);
  //     return { error: err.message };
  //   }
  // };
  export const saveScannedBarcode1 = async (data: Pick<ScannedBarcodeModel, 'BARCODE' | 'CREATE_DATE' | 'PROCESS_CODE'| 'LOT'| 'BOX_NO'>) => {
    try {
      const result = await transaction(async (connection) => {
        const insertResult = await connection.query('INSERT INTO SCANNED_BARCODE (BARCODE, CREATE_DATE, PROCESS_CODE, LOT, BOX_NO) VALUES (?, ?, ? ,?, ?)', [data.BARCODE, data.CREATE_DATE, data.PROCESS_CODE, data.LOT, data.BOX_NO]);
  
        if (insertResult[0].affectedRows === 0) {
          throw new Error('바코드 등록에 실패했습니다.');
        }
  
        const updateResult = await connection.query('INSERT INTO BARCODE_COUNT (PROCESS_CODE, BARCODE_COUNT) VALUES (?, 1) ON DUPLICATE KEY UPDATE BARCODE_COUNT = BARCODE_COUNT + 1', [data.PROCESS_CODE]);
  
        if (updateResult[0].affectedRows === 0) {
          throw new Error('PROCESS_BARCODE_COUNT 업데이트에 실패했습니다.');
        }
  
        return { success: true };
      });
  
      return result;
    } catch (err) {
      console.error('Error saving scanned barcode:', err);
      return { error: err.message };
    }
  };
  
  export const saveScannedBarcodes_1 = async (evt: H3Event) => {
    try {
      const body = await readBody(evt);
      console.log('body', body);
      const result = await sql.transaction(async (tx) => {
        const queries = body.barcodes.map(barcode => {
          return tx.query('INSERT INTO SCANNED_BARCODE (BARCODE, CREATE_DATE, PROCESS_CODE) VALUES (?, ?, ?)', [barcode, body.date, body.processCode]);
        });
  
        const insertResults = await Promise.all(queries);
        const failedInserts = insertResults.filter(result => result.affectedRows === 0);
  
        if (failedInserts.length > 0) {
          return { error: '일부 바코드 등록에 실패했습니다.' };
        }
  
        const updateResult = await tx.query('INSERT INTO BARCODE_COUNT (PROCESS_CODE, BARCODE_COUNT) VALUES (?, ?) ON DUPLICATE KEY UPDATE BARCODE_COUNT = BARCODE_COUNT + ?', [body.processCode, body.barcodes.length, body.barcodes.length]);
  
        if (updateResult.affectedRows === 0) {
          return { error: 'PROCESS_BARCODE_COUNT 업데이트에 실패했습니다.' };
        }
  
        return { success: true };
      });
  
      return result;
    } catch (err) {
      console.error('Error creating saveScannedBarcodes posts', err);
      throw createError({
        statusCode: 500,
        statusMessage: 'Something went wrong'
      });
    }
  };
// 단일 바코드 저장
export const saveScannedBarcode = async (data: Pick<ScannedBarcodeModel, 'BARCODE' | 'CREATE_DATE' | 'PROCESS_CODE' | 'LOT'| 'BOX_NO'>) => {
  try {
    
    const result = await transaction(async (connection) => {
      const insertResult = await connection.query(
        'INSERT INTO SCANNED_BARCODE (BARCODE, CREATE_DATE, PROCESS_CODE, LOT, BOX_NO) VALUES (?, ?, ?, ?, ?)',
        [data.BARCODE, data.CREATE_DATE, data.PROCESS_CODE, data.LOT, data.BOX_NO]
      );

      if (insertResult[0].affectedRows === 0) {
        throw new Error('바코드 등록에 실패했습니다.');
      }

      const updateResult = await connection.query(
        'INSERT INTO BARCODE_COUNT (PROCESS_CODE, BARCODE_COUNT) VALUES (?, 1) ON DUPLICATE KEY UPDATE BARCODE_COUNT = BARCODE_COUNT + 1',
        [data.PROCESS_CODE]
      );

      if (updateResult[0].affectedRows === 0) {
        throw new Error('BARCODE_COUNT 업데이트에 실패했습니다.');
      }

      return { success: true };
    });

    return result;
  } catch (err) {
    console.error('Error saving scanned barcode:', err);
    return { error: err.message };
  }
};
export const duplicateBarcode = async (data: Pick<ScannedBarcodeModel, 'BARCODE' | 'CREATE_DATE' | 'PROCESS_CODE' | 'LOT'| 'BOX_NO'>) => {
  try {
    
    const result = await transaction(async (connection) => {
      const insertResult = await connection.query(
        'INSERT INTO SCANNED_BARCODE (BARCODE, CREATE_DATE, PROCESS_CODE, LOT, BOX_NO) VALUES (?, ?, ?, ?, ?)',
        [data.BARCODE, data.CREATE_DATE, data.PROCESS_CODE, data.LOT, data.BOX_NO]
      );

      if (insertResult[0].affectedRows === 0) {
        throw new Error('바코드 등록에 실패했습니다.');
      }

      const updateResult = await connection.query(
        'INSERT INTO BARCODE_COUNT (PROCESS_CODE, BARCODE_COUNT) VALUES (?, 1) ON DUPLICATE KEY UPDATE BARCODE_COUNT = BARCODE_COUNT + 1',
        [data.PROCESS_CODE]
      );

      if (updateResult[0].affectedRows === 0) {
        throw new Error('BARCODE_COUNT 업데이트에 실패했습니다.');
      }

      return { success: true };
    });

    return result;
  } catch (err) {
    console.error('Error saving scanned barcode:', err);
    return { error: err.message };
  }
};
  // 여러 바코드 저장
  // 여러 바코드 저장 로직을 모델로 이동
export const saveScannedBarcodes = async (data: { barcodes: string[], date: string, processCode: string, lotNumber: string, boxNumber: number }) => {
  try {
    const result = await transaction(async (tx) => {
      // 여러 바코드 저장 쿼리
      const queries = data.barcodes.map((barcode) =>
        tx.query(
          `INSERT INTO SCANNED_BARCODE (BARCODE, CREATE_DATE, PROCESS_CODE, LOT, BOX_NO) 
           VALUES (?, ?, ?, ?, ?) 
           ON DUPLICATE KEY UPDATE CREATE_DATE = VALUES(CREATE_DATE), PROCESS_CODE = VALUES(PROCESS_CODE)`,
          [barcode, data.date, data.processCode, data.lotNumber, data.boxNumber]
        )
      );

      const insertResults = await Promise.all(queries);

      // 삽입 실패한 바코드 확인
      const failedInserts = insertResults.filter(
        (result) => result[0].affectedRows === 0
      );

      if (failedInserts.length > 0) {
        return { error: '일부 바코드가 이미 존재합니다.' };
      }

      // BARCODE_COUNT 업데이트
      const updateResult = await tx.query(
        `INSERT INTO BARCODE_COUNT (PROCESS_CODE, BARCODE_COUNT) 
         VALUES (?, ?) 
         ON DUPLICATE KEY UPDATE BARCODE_COUNT = BARCODE_COUNT + VALUES(BARCODE_COUNT)`,
        [data.processCode, data.barcodes.length]
      );

      if (updateResult[0].affectedRows === 0) {
        return { error: 'BARCODE_COUNT 업데이트에 실패했습니다.' };
      }

      return { success: true };
    });

    return result;
  } catch (err) {
    console.error('Error saving multiple scanned barcodes:', err);
    return { error: '데이터 저장 중 오류가 발생했습니다.' };
  }
};
export const getLatestBoxNumber1 = async (processCode : string) => {
  try {
    // 데이터베이스에서 해당 PROCESS_CODE의 가장 최신 BOX_NO 가져오기
    
    const result = await sql({
      query :`SELECT MAX(BOX_NO) AS boxNumber FROM SCANNED_BARCODE WHERE PROCESS_CODE = ?`, 
      values: [processCode]
    });
    console.log(result);
    // 만약 결과가 있으면 boxNumber 반환, 없으면 0 반환
    return result.boxNumber ? result.boxNumber : 0;
  } catch (error) {
    console.error('DB에서 박스 번호 가져오기 오류:', error);
    throw new Error('DB에서 박스 번호를 가져오는 중 오류가 발생했습니다.');
  }
};
export const checkBarcodeDuplicate = async (barcode: string) => {
  
    const result = await sql({
      query :`SELECT COUNT(*) as count FROM SCANNED_BARCODE WHERE BARCODE = ?`, 
      values:[barcode]
    });
    
    // 바코드가 존재하면 true, 존재하지 않으면 false 반환
    return result[0].count > 0; 
  } 

  export const getLatestBoxNumber2 = async (processCode: string) => {
    try {
      const result = await sql<{ boxNumber: number }>({
        query: `SELECT MAX(BOX_NO) AS boxNumber FROM SCANNED_BARCODE WHERE PROCESS_CODE = ?`,
        values: [processCode],
      });
  console.log(result);
      if (result.rows && result.rows.length > 0) {
        return result.rows[0].boxNumber || 0;
      } else {
        return 0;
      }
    } catch (error) {
      console.error('DB에서 박스 번호 가져오기 오류:', error);
      throw new Error('DB에서 박스 번호를 가져오는 중 오류가 발생했습니다.');
    }
  };
  export const getLatestBoxNumber3 = async (processCode: string) => {
    console.log('processCode:', processCode);
    try {
      const result = await sql<{ boxNumber: number }>({
        query: `SELECT MAX(BOX_NO) AS boxNumber FROM SCANNED_BARCODE WHERE PROCESS_CODE = ?`,
        values: [processCode],
      });
      console.log("result:",result);
      if (result.rows && result.rows.length > 0) {
        return { boxNumber: result.rows[0].boxNumber };
      } else {
        return { boxNumber: 0 };
      }
    } catch (error) {
      console.error('DB에서 박스 번호 가져오기 오류:', error);
      throw new Error('DB에서 박스 번호를 가져오는 중 오류가 발생했습니다.');
    }
  };
  export const getLatestBoxNumber = async (processCode: string) => {
    try {
     
      const result = await sql({
        query: `SELECT MAX(BOX_NO) AS boxNumber FROM SCANNED_BARCODE WHERE PROCESS_CODE = ?`,
        values: [processCode],
      });
      console.log("result:", result[0]);
  
      if (result) {
        return { boxNumber: result[0].boxNumber };
      } else {
        return { boxNumber: 0 };
      }
    } catch (error) {
      console.error('DB에서 박스 번호 가져오기 오류:', error);
      throw new Error('DB에서 박스 번호를 가져오는 중 오류가 발생했습니다.');
    }
  };