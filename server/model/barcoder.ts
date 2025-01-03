import { sql } from '~~/server/db';


export type BarcodeCountModel = {
  NO: any;
  PRODUCT_CODE: any;
  PRODUCT_CODE_REV: any;
  CREATE_DATA: any;
  LAST_SERIAL_NUMBER: any;
  BARCODE_COUNT: any;
};


export const BarcodecountRegister = async (data: Pick<BarcodeCountModel, 'PRODUCT_CODE' | 'CREATE_DATA' | 'LAST_SERIAL_NUMBER' >) => {
  const result = (await sql({
    query: `
      INSERT INTO BARCODE_COUNT (
        PRODUCT_CODE,
        CREATE_DATA,
        LAST_SERIAL_NUMBER
      ) VALUES (
        ?,
        ?,
        ?
      )
    `,
    values: [
      data.PRODUCT_CODE,
      data.CREATE_DATA,
      data.LAST_SERIAL_NUMBER     
    ]
  })) as any;

  console.log("result============", result);
  return result.affectedRows === 1 ? data : null;  // 수정: 반환된 데이터
};
export const getBarcodecount = async (PRODUCT_CODE: string) => {
  const result = await sql({
    query: 'SELECT BARCODE_COUNT, LAST_SERIAL_NUMBER FROM BARCODE_COUNT WHERE PRODUCT_CODE = ?',
    values: [PRODUCT_CODE]
  });

  return result;
};
// export const updateLastSerialNumber = async (productCode: string, lastSerialNumber: number) => {
//   await sql({
//     query: `UPDATE BARCODE_COUNT SET LAST_SERIAL_NUMBER = ? WHERE PRODUCT_CODE = ?`,
//     values: [lastSerialNumber, productCode]
//   });
//   console.log('lastSerialNumber PRODUCT_CODE', lastSerialNumber,productCode);

// };
export const updateLastSerialNumber = async (productCode: string, PROCESS_CODE: string, lastSerialNumber: number) => {
  // 먼저 해당 PRODUCT_CODE가 존재하는지 확인
  const result = await sql({
    query: `SELECT COUNT(*) as count FROM BARCODE_COUNT WHERE PRODUCT_CODE = ?`,
    values: [productCode],
  });

  // 결과 확인
  const count = result[0].count;

  if (count > 0) {
    // PRODUCT_CODE가 존재하면 UPDATE
    await sql({
      query: `UPDATE BARCODE_COUNT SET LAST_SERIAL_NUMBER = ?, PROCESS_CODE = ? WHERE PRODUCT_CODE = ?`,
      values: [lastSerialNumber, PROCESS_CODE, productCode],  // 매개변수 순서 수정
    });
    console.log('UPDATE lastSerialNumber PRODUCT_CODE', lastSerialNumber, productCode);
  } else {
    // PRODUCT_CODE가 없으면 INSERT
    await sql({
      query: `INSERT INTO BARCODE_COUNT (PRODUCT_CODE, PROCESS_CODE, LAST_SERIAL_NUMBER) VALUES (?, ?, ?)`,
      values: [productCode, PROCESS_CODE, lastSerialNumber],  // 매개변수 순서 확인
    });
    console.log('INSERT new PRODUCT_CODE', lastSerialNumber, PROCESS_CODE, productCode);
  }
};
export const BarcodeScanRegister = async (barcode: string, processCode: string, boxNo: number, createDate: string) => {
  // 바코드 중복 확인
  const result = await sql({
    query: `SELECT COUNT(*) as count FROM SCANNED_BARCODE WHERE BARCODE = ?`,
    values: [barcode],
  })

  if (result[0].count > 0) {
    throw new Error('이미 등록된 바코드입니다.')
  }

  // 바코드 등록
  await sql({
    query: `INSERT INTO SCANNED_BARCODE (BARCODE, PROCESS_CODE, BOX_NO, CREATE_DATE) VALUES (?, ?, ?, ?)`,
    values: [barcode, processCode, boxNo, createDate],
  })
}
export const getLatestBoxNumber = async (processCode) => {
  try {
    // 데이터베이스에서 해당 PROCESS_CODE의 가장 최신 BOX_NO 가져오기
    const [result] = await query(
      'SELECT MAX(BOX_NO) AS boxNumber FROM SCANNED_BARCODE WHERE PROCESS_CODE = ?',
      [processCode]
    );

    // 만약 결과가 있으면 boxNumber 반환, 없으면 0 반환
    return result.boxNumber ? result.boxNumber : 0;
  } catch (error) {
    console.error('DB에서 박스 번호 가져오기 오류:', error);
    throw new Error('DB에서 박스 번호를 가져오는 중 오류가 발생했습니다.');
  }
};