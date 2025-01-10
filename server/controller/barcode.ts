import { H3Event } from 'h3';
// import { Context } from 'nuxt';
// import { Context } from '@nuxt/types';
import { sql } from '~~/server/db';
import * as BarcodeModel from '~~/server/model/barcode';

export const BarcodecountRegister = async (evt: H3Event) => {
  try {
    console.log('Creating a new countRegister');
    const body = await readBody(evt);
    console.log('Got request body', body);
    const result = await BarcodeModel.BarcodecountRegister({
      PRODUCT_CODE: body.PRODUCT_CODE,
      CREATE_DATA: body.CREATE_DATA,
      LAST_SERIAL_NUMBER: body.LAST_SERIAL_NUMBER,
      
    });

    console.log('Created countRegister post', result);
    return {
      data: result
    };
  } catch (err) {
    console.error('Error creating countRegister post', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const getBarcodecount = async (event: H3Event) => {
  const PROCESSCODE = event.context.params.processCode;

  try {
    const result = await BarcodeModel.getBarcodecount(PROCESSCODE);

    if (result.length === 0) {
      return { barcodeCount: 0 };
    }

    return { barcodeCount: result[0] };
  } catch (err) {
    console.error('Error fetching barcode count for PRODUCT_CODE code', PROCESSCODE, err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const getScannedBarcodecount = async (event: H3Event) => {
  const PROCESSCODE = event.context.params.processCode;

  try {
    const result = await BarcodeModel.getScannedBarcodecount(PROCESSCODE);

    if (result.length === 0) {
      return { barcodeCount: 0 };
    }

    return { barcodeCount: result[0] };
  } catch (err) {
    console.error('Error fetching barcode count for PRODUCT_CODE code', PROCESSCODE, err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const updateLastSerialNumber = async (event: H3Event) => {
  // const { productCode } = event.context.params;  // URL에서 productCode 받음
  // const { PROCESS_CODE } = event.context.params;  // URL에서 productCode 받음
  // const { PROCESS_CODE } = await readBody(event);  // body에서 lastSerialNumber 받음
  const { PRODUCT_CODE,PROCESS_CODE,lastSerialNumber,BARCODE_COUNT } = await readBody(event);  // body에서 lastSerialNumber 받음
  console.log('Product Code:', PRODUCT_CODE);
  console.log('Last Serial Number:', lastSerialNumber);
  console.log('LPROCESS_CODE:', PROCESS_CODE);
  console.log('BARCODE_COUNT:', BARCODE_COUNT);
  try {
    await BarcodeModel.updateLastSerialNumber(PRODUCT_CODE, PROCESS_CODE,lastSerialNumber,BARCODE_COUNT);
    return { success: true };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const BarcodeScanRegister = async (event: H3Event) => {
  const { barcode, processCode, boxNo, createDate } = await readBody(event)

  // 바코드 중복 확인
  const existingBarcode = await sql({
    query: `SELECT COUNT(*) as count FROM SCANNED_BARCODE WHERE BARCODE = ?`,
    values: [barcode],
  })

  if (existingBarcode[0].count > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: '이미 등록된 바코드입니다.',
    })
  }

  // 바코드 등록
  await sql({
    query: `INSERT INTO SCANNED_BARCODE (BARCODE, PROCESS_CODE, BOX_NO, CREATE_DATE) VALUES (?, ?, ?, ?)`,
    values: [barcode, processCode, boxNo, createDate],
  })

  // BOX 테이블 업데이트
  await sql({
    query: `INSERT INTO BOX (PROCESS_CODE, LOT, BOX_NO, BARCODE_COUNT, CREATE_DATE) VALUES (?, ?, ?, ?, ?)`,
    values: [processCode, getTodayLot(), boxNo, 1, createDate], // 바코드 수량은 1로 처리
  })

  return { success: true }
}

// 오늘 날짜의 LOT 계산 함수
const getTodayLot = () => {
  const today = new Date()
  return `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`
}

//바코드 검색
export const searchBarcodes = async (event: H3Event) => {
  try {
    const query = getQuery(event)
    const searchParams = {
      searchQuery: query.query as string,
      searchType: query.type as string,
      dateStart: query.dateStart as string,
      dateEnd: query.dateEnd as string,
      page: parseInt(query.page as string) || 1,
      limit: parseInt(query.limit as string) || 10
    }

    console.log('바코드 검색 시작:', searchParams)
    
    // 유효성 검사
    if (searchParams.page < 1) searchParams.page = 1
    if (searchParams.limit < 1 || searchParams.limit > 100) searchParams.limit = 10

    const result = await BarcodeModel.searchBarcodes(searchParams)
    
    console.log('검색 결과 건수:', result.total)
    return result
  } catch (error) {
    console.error('바코드 검색 중 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '바코드 검색 중 오류가 발생했습니다.'
    })
  }
}