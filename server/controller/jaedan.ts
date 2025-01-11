import { H3Event } from 'h3';
// import { Context } from 'nuxt';
// import { Context } from '@nuxt/types';

import * as JaedanModel from '~~/server/model/jaedan';


export const getRecord10 = async () => {
  try {
    const result = await JaedanModel.getRecord10();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const register = async (evt: H3Event) => {
  try {
    console.log('Creating a new JAEDAN RECORD');
    const body = await readBody(evt);
    console.log('Got request body', body);
    
    const result = await JaedanModel.register({
      WORK_ORDER_NO: body.WORK_ORDER_NO,
      WONDAN_STORE: body.WONDAN_STORE,
      WONDAN_MANAGER_NO: body.WONDAN_MANAGER_NO,
      LOT: body.LOT,
      Y_COUNT: body.Y_COUNT,
      MARKS: body.MARKS,
      COUNT: body.COUNT,
      DEFECTIVE: body.DEFECTIVE,
      CREATE_DATE: body.CREATE_DATE,
      WORK_DATE: body.WORK_DATE,
      REG_ACCOUNT: body.REG_ACCOUNT  // REG_ACCOUNT 추가
    });

    console.log('Created JAEDAN REGISTER post', result);
    return {
      data: result
    };
  } catch (err) {
    console.error('Error creating JAEDAN post', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const updateState = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const NO = body.NO as string;

    const result = await JaedanModel.updateState(NO, body.STATE, body.UPDATE_ACCOUNT, body.PROCESSCODE);

    return {
      success: true,
      data: result
    };
  } catch (err) {
    console.error('상태 업데이트 실패:', err);
    return {
      success: false,
      error: err.message || 'Something went wrong'
    };
  }
};
export const updateStateProcess = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const NO = body.NO as string;

    const result = await JaedanModel.updateStateProcess(NO, body.PROCESS_STATE, body.PROCESS_STATE_UP_ACCOUNT, body.PROCESSCODE);

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const getRecord = async () => {
  try {
    const result = await JaedanModel.getRecord();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const remove = async (evt: H3Event) => {
  try {
    console.log("evt",evt)
    const result = await JaedanModel.remove(evt.context.params?.NO as string);
    console.log(result)
    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const getHistory = async () => {
  try {
    const result = await JaedanModel.getHistory();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
// export const getPagedRecord = async (event: H3Event) => {
//   const query = getQuery(event);
//   const page = parseInt(query.page as string) || 1;
//   const itemsPerPage = parseInt(query.itemsPerPage as string) || 15;

//   try {
//     const result = await JaedanModel.getPagedRecord(page, itemsPerPage);
//     const totalRecords = await JaedanModel.getTotalRecords(); // Get total records for pagination
//     return {
//       data: result,
//       totalRecords: totalRecords
//     };
//   } catch (err) {
//     throw createError({
//       statusCode: 500,
//       statusMessage: 'Something went wrong'
//     });
//   }
// };
export const getProcessStateRecord = async () => {
  try {
    const result = await JaedanModel.getProcessStateRecord();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const getDetail = async (evt: H3Event) => {
  try {
    const result = await JaedanModel.getDetail(evt.context.params?.NO as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
// 페이지 단위 데이터 가져오기
export const getPagedRecord = async (event: H3Event) => {
  const { page, pageSize  } = getQuery(event);
  
  try {
    const result = await JaedanModel.getPagedRecord(Number(page), Number(pageSize));
    const totalRecords = await JaedanModel.getTotalRecords(); // 총 레코드 수를 가져오는 함수 필요

    return {
      data: result,
      totalRecord: totalRecords,
      totalPages: Math.ceil(totalRecords / pageSize),
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong',
    });
  }
};
export const getRecordsByDate = async (event: H3Event) => {
  const { startDate, endDate, page, limit } = getQuery(event); // 쿼리 파라미터에서 값 가져오기
  console.log("startDate, endDate, page, limit:", startDate, endDate, page, limit);
  
  try {
    const { records, totalPages } = await JaedanModel.getRecordsByDate(startDate, endDate, parseInt(page), parseInt(limit));
    
    return {
      success: true,
      data: records,
      page: parseInt(page), // 현재 페이지 추가
      limit: parseInt(limit),
      totalPages: totalPages, // totalPages 추가
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: '서버 오류',
      message: error.message,
    });
  }
};
export const searchRecordsByTerm = async (event: H3Event) => {
  const { searchTerm, page, limit } = getQuery(event); // 쿼리 파라미터에서 searchTerm 가져오기
  console.log("searchRecordsByTerm received searchTerm:", searchTerm);

  try {
    const { records, totalPages } = await JaedanModel.searchRecordsByTerm(searchTerm, parseInt(page), parseInt(limit));
    return {
      success: true,
      data: records,
      page: parseInt(page), // 현재 페이지 추가
      limit: parseInt(limit),
      totalPages: totalPages, // totalPages 추가
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: '서버 오류: ' + error.message, // statusMessage 대신 message 사용
    });
  }
};
//파트재단
export const partJaedanRegister = async (evt: H3Event) => {
  try {
    console.log('Creating a new JAEDAN RECORD');
    const body = await readBody(evt);
    console.log('Got request body', body);
    
    const result = await JaedanModel.partJaedanRegister({
      WORK_ORDER_NO: body.WORK_ORDER_NO,
      WONDAN_STORE: body.WONDAN_STORE,
      WONDAN_MANAGER_NO: body.WONDAN_MANAGER_NO,
      LOT: body.LOT,
      Y_COUNT: body.Y_COUNT,
      MARKS: body.MARKS,
      COUNT: body.COUNT,
      DEFECTIVE: body.DEFECTIVE,
      CREATE_DATE: body.CREATE_DATE,
      WORK_DATE: body.WORK_DATE,
      REG_ACCOUNT: body.REG_ACCOUNT  // REG_ACCOUNT 추가
    });

    console.log('Created PartJaedanRegister post', result);
    return {
      data: result
    };
  } catch (err) {
    console.error('Error creating PartJaedanRegister post', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const getPartJaedanRecord10 = async () => {
  try {
    const result = await JaedanModel.getPartJaedanRecord10();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const partJaedaupdateState = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const NO = body.NO as string;

    const result = await JaedanModel.partJaedaupdateState(NO, body.JR_STATE, body.PROCESS_STATE, body.UPDATE_ACCOUNT, body.PROCESSCODE);

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};