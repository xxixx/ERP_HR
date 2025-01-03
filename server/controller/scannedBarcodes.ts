import { H3Event } from 'h3';
import * as ScannedBarcode from '~~/server/model/ScannedBarcode';
import { transaction } from '~~/server/db'; // 트랜잭션을 위한 DB 모듈
import { readBody } from 'h3'; // Nuxt3의 body 파싱 유틸리티

export const saveScannedBarcode = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await ScannedBarcode.saveScannedBarcode({
      BARCODE: body.barcode,
      CREATE_DATE: body.date,
      PROCESS_CODE: body.processCode,
      LOT: body.lotNumber,
      BOX_NO: body.boxNumber
    });

    if (result.error) {
      evt.res.statusCode = 400;
      evt.res.end(JSON.stringify({ error: result.error }));
    } else {
      evt.res.statusCode = 200;
      evt.res.end(JSON.stringify({ success: true }));
    }
  } catch (err) {
    console.error('Error creating saveScannedBarcode post', err);
    evt.res.statusCode = 500;
    evt.res.end(JSON.stringify({ error: 'Something went wrong' }));
  }
};



export const saveScannedBarcodes = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const { barcodes, date, processCode, lotNumber, boxNumber } = body;

    // 모델 메서드를 호출하여 바코드 저장
    const result = await ScannedBarcode.saveScannedBarcodes({ 
      barcodes, 
      date, 
      processCode, 
      lotNumber, 
      boxNumber 
    });

    if (result.error) {
      evt.res.statusCode = 400;
      evt.res.end(JSON.stringify({ error: result.error }));
    } else {
      evt.res.statusCode = 200;
      evt.res.end(JSON.stringify({ success: true }));
    }
  } catch (err) {
    console.error('Controller Error:', err);
    evt.res.statusCode = 500;
    evt.res.end(JSON.stringify({ error: '서버 오류가 발생했습니다.' }));
  }
};

export const getLatestBoxNumber = async (evt: H3Event) => {
  try {
    const query = getQuery(evt); // 요청에서 query string을 받아옴
    console.log('Received query:', query);
    const processCode = query.processCode; // processCode를 가져옴

    // 모델을 호출하여 최신 박스 번호를 가져옴
    // const result = await ScannedBarcode.getLatestBoxNumber(processCode);
    // const latestBoxNumber = await ScannedBarcode.getLatestBoxNumber(processCode);
    // const latestBoxNumber = (await ScannedBarcode.getLatestBoxNumber(processCode)).boxNumber;
    const { boxNumber: latestBoxNumber } = await ScannedBarcode.getLatestBoxNumber(processCode);
    // const latestBoxNumber = result.boxNumber;

    // 결과를 반환
    // return { boxNumber: latestBoxNumber };
    console.log('latestBoxNumber', latestBoxNumber);
    
    return latestBoxNumber;
    } catch (error) {
    console.error('최신 박스 번호 가져오기 중 오류:', error);
    return { error: '박스 번호를 가져오는 중 오류가 발생했습니다.' };
  }
};

export const checkDuplicate = async (event: H3Event) => {
  const { barcode } = event.context.params; // H3Event에서 파라미터 추출

  if (!barcode) {
    console.error('요청된 바코드가 없습니다.');
    return { error: '바코드 값이 없습니다.', status: 400 };
  }

  console.log(`Request to check duplicate for barcode: ${barcode}`); // 바코드 요청 값 출력

  try {
    const isDuplicate = await ScannedBarcode.checkBarcodeDuplicate(barcode);

    if (isDuplicate) {
      console.log(`Barcode ${barcode} is a duplicate`); // 중복 여부 로그 출력
      return { isDuplicate: true, message: '중복된 바코드입니다.', status: 200 };
    } else {
      console.log(`Barcode ${barcode} is not a duplicate`); // 중복되지 않음 로그 출력
      return { isDuplicate: false, message: '바코드가 중복되지 않았습니다.', status: 200 };
    }
  } catch (error) {
    console.error(`Error checking duplicate barcode: ${error}`);
    return { error: '서버 오류로 바코드 중복 체크에 실패했습니다.', status: 500 };
  }
};


// export const saveScannedBarcodes = async (evt: H3Event) => {
//   try {
//     const body = await readBody(evt);
//     const { barcodes, date, processCode } = body;

//     const result = await transaction(async (tx) => {
//       // 바코드 삽입 쿼리
//       const queries = barcodes.map((barcode) =>
//         tx.query(
//           `INSERT INTO SCANNED_BARCODE (BARCODE, CREATE_DATE, PROCESS_CODE) 
//            VALUES (?, ?, ?) 
//            ON DUPLICATE KEY UPDATE CREATE_DATE = VALUES(CREATE_DATE), PROCESS_CODE = VALUES(PROCESS_CODE)`,
//           [barcode, date, processCode]
//         )
//       );

//       // 모든 쿼리를 병렬로 실행
//       const insertResults = await Promise.all(queries);

//       // 삽입 실패한 경우 확인
//       const failedInserts = insertResults.filter(
//         (result) => result[0].affectedRows === 0
//       );

//       if (failedInserts.length > 0) {
//         return { error: '일부 바코드 등록에 실패했습니다.' };
//       }

//       // BARCODE_COUNT 업데이트
//       const updateResult = await tx.query(
//         `INSERT INTO BARCODE_COUNT (PROCESS_CODE, BARCODE_COUNT) 
//          VALUES (?, ?) 
//          ON DUPLICATE KEY UPDATE BARCODE_COUNT = BARCODE_COUNT + ?`,
//         [processCode, barcodes.length, barcodes.length]
//       );

//       if (updateResult[0].affectedRows === 0) {
//         return { error: 'BARCODE_COUNT 업데이트에 실패했습니다.' };
//       }

//       return { success: true };
//     });

//     return result;
//   } catch (err) {
//     console.error('Controller Error:', err);
//     throw createError({
//       statusCode: 500,
//       statusMessage: 'Something went wrong',
//     });
//   }
// };