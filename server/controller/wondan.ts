import { H3Event } from 'h3';

import * as WondanModel from '~~/server/model/wondan';

export const getWondanCode = async () => {
  try {
    const result = await WondanModel.getWondanCode();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something  getWondanCode went wrong'
    });
  }
};

export const getRecord = async () => {
  try {
    const result = await WondanModel.getRecord();

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

export const register = async (evt) => {
  try {
    console.log("Creating a new wondan RECORD");
    const body = await readBody(evt);
    console.log("Got request body", body);

    const result = await WondanModel.register({
      REG_DATE: body.REG_DATE,
      WONDAN_NAME: body.WONDAN_NAME,
      LOT_NO: body.LOT_NO,
      LENGTH: body.LENGTH,
      REAL_LENGTH: body.REAL_LENGTH,
      SUPPLIER: body.SUPPLIER,
      REG_ACCOUNT: body.REG_ACCOUNT,
      DEFECTIVE_LENGTH: body.DEFECTIVE_LENGTH,
      UPDATE_ACCOUNT: body.UPDATE_ACCOUNT,
    });

    if (result.statusCode === 400 && result.statusMessage === 'LOT_NO already exists') {
      return {
        statusCode: 400,
        statusMessage: 'LOT_NO already exists'
      };
    }

    console.log("Created Wondan REGISTER post", result);
    return {
      data: result,
    };
  } catch (err) {
    console.error("Error creating Wondan post", err);
    throw err;
  }
};

export const remove = async (evt: H3Event) => {
  try {
    console.log("evt",evt)
    const body = await readBody(evt);
    const result = await WondanModel.remove(evt.context.params?.NO as number, {

    });

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

///////////////////////////////
export const getPagedRecord = async (event: H3Event) => {
  const query = getQuery(event);
  console.log('query', query);
  const page = parseInt(query.page as string) || 1;
  console.log('page', page);
  const itemsPerPage = parseInt(query.itemsPerPage as string) || 15;
  console.log('page', page, 'itemsPerPage', itemsPerPage);

  try {
    const result = await WondanModel.getPagedRecord(page, itemsPerPage);
    const totalRecords = await WondanModel.getTotalRecords(); // Get total records for pagination
    return {
      data: result,
      totalRecords: totalRecords
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const getPagedRecord2 = async (event: H3Event) => {
  const { page, pageSize  } = getQuery(event);

  try {
    const result = await WondanModel.getPagedRecord2(Number(page), Number(pageSize));
    const totalRecords = await WondanModel.getTotalRecords2(); // 총 레코드 수를 가져오는 함수 필요

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
    // getRecordsByDate 함수 호출
    const { records, totalPages } = await WondanModel.getRecordsByDate(startDate, endDate, parseInt(page), parseInt(limit));

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

export const searchMasterWondanByTerm = async (event: H3Event) => {
  try {
    console.log('[Controller] searchMasterWondanByTerm - 검색 시작');
    const query = getQuery(event);
    const { searchTerm } = query;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    if (!searchTerm || typeof searchTerm !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: '검색어가 필요합니다.'
      });
    }

    const result = await WondanModel.searchMasterWondanByTerm(searchTerm, page, limit);
    console.log('[Controller] searchMasterWondanByTerm - 검색 완료');

    return {
      success: true,
      data: result.data,
      total: result.total
    };
  } catch (error: any) {
    console.error('[Controller] searchMasterWondanByTerm - 에러 발생:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || '원단 코드 검색 중 오류가 발생했습니다.'
    });
  }
};

export const searchDateRange = async (event: H3Event) => {
  const query = getQuery(event);
  const searchQuery = query.searchQuery as string;
  const startDate = query.startDate as string;
  const endDate = query.endDate as string;

  try {
    const result = await WondanModel.searchDateRange( startDate, endDate);
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
  // export const searchRecordsByTerm = async (event: H3Event) => {
  //   const { searchTerm } = getQuery(event); // 쿼리 파라미터에서 searchTerm 가져오기
  //   console.log("Received searchTerm:", searchTerm);
  
  //   try {
  //     const records = await WondanModel.searchRecordsByTerm(searchTerm);
  //     return {
  //       success: true,
  //       data: records,
  //     };
  //   } catch (error) {
  //     throw createError({
  //       statusCode: 500,
  //       statusMessage: '서버 오류',
  //       message: error.message,
  //     });
  //   }
  // };
  

export const searchRecords_여러조건 = async (event: H3Event) => {
  const query = getQuery(event);
  const searchQuery = query.searchQuery as string;
  const startDate = query.startDate as string;
  const endDate = query.endDate as string;

  try {
    const result = await WondanModel.searchRecords(searchQuery, startDate, endDate);
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

export const searchRecords = async (event: H3Event) => {
  const query = getQuery(event);
  const searchQuery = query.searchQuery as string;
  const startDate = query.startDate as string;
  const endDate = query.endDate as string;

  try {
    const result = await WondanModel.searchRecords(searchQuery);
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

export const getUseable = async () => {
  try {
    const result = await WondanModel.getUseable();

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

export const updateState = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const NO = body.NO as string;


    const result = await WondanModel.updateState(NO, body.STATE,body.UPDATE_ACCOUNT);

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

// ===================================

export const update = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await WondanModel.update(evt.context.params?.NO as number, {
      REG_DATE: body.REG_DATE,
      WONDAN_NAME: body.WONDAN_NAME,
      LOT_NO: body.LOT_NO,
      LENGTH: body.LENGTH,
      REAL_LENGTH: body.REAL_LENGTH,
      SUPPLIER: body.SUPPLIER,
      DEFECTIVE_LENGTH: body.DEFECTIVE_LENGTH,
      STATE: body.STATE,
    });

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


export const getRecord10 = async () => {
  try {
    const result = await WondanModel.getRecord10();

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

export const getAllData = async () => {
  try {
    const result = await WondanModel.getAllData();

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

// 원단 코드 관리를 위한 추가 컨트롤러 함수들
export const getMasterWondanCode = async (event: H3Event) => {
  try {
    console.log('[Controller] getMasterWondanCode - 원단 코드 목록 조회 시작');
    const result = await WondanModel.getMasterWondanCode();
    console.log('[Controller] getMasterWondanCode - 조회 완료, 결과 개수:', result.length);
    return { data: result };
  } catch (error) {
    console.error('[Controller] getMasterWondanCode - 에러 발생:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: '원단 코드 목록 조회 중 오류가 발생했습니다.' 
    });
  }
};

export const searchMasterWondan = async (event: H3Event) => {
  try {
    const query = getQuery(event);
    const term = query.term as string;
    console.log('[Controller] searchMasterWondan - 원단 코드 검색 시작, 검색어:', term);
    const result = await WondanModel.searchMasterWondan(term);
    console.log('[Controller] searchMasterWondan - 검색 완료, 결과 개수:', result.length);
    return { data: result };
  } catch (error) {
    console.error('[Controller] searchMasterWondan - 에러 발생:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: '원단 코드 검색 중 오류가 발생했습니다.' 
    });
  }
};

export const registerMasterWondan = async (event: H3Event) => {
  try {
    console.log('[Controller] registerMasterWondan - 원단 코드 등록 시작');
    const body = await readBody(event);

    console.log('[Controller] registerMasterWondan - 요청 데이터:', body);

    // 필수 필드 검증
    if (!body.WONDAN_NAME || !body.NAME || !body.SUPPLAY) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: '필수 필드가 누락되었습니다. (원단명, 이름, 공급사)' 
      });
    }

    const result = await WondanModel.registerMasterWondan(body);
    console.log('[Controller] registerMasterWondan - 등록 완료');
    return { success: true, data: result };

  } catch (error: any) {
    console.error('[Controller] registerMasterWondan - 에러 발생:', error);
    throw createError({ 
      statusCode: error.statusCode || 500, 
      statusMessage: error.message || '원단 코드 등록 중 오류가 발생했습니다.' 
    });
  }
};

export const updateMasterWondan = async (event: H3Event) => {
  try {
    console.log('[Controller] updateMasterWondan - 원단 코드 수정 시작');
    const body = await readBody(event);
    const params = event.context.params;
    const NO = params?.NO;

    console.log('[Controller] updateMasterWondan - 파라미터:', params);
    console.log('[Controller] updateMasterWondan - 원단 코드 수정 시작, NO:', NO, '데이터:', body);

    if (!NO) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: '수정할 원단 코드의 NO가 필요합니다.' 
      });
    }

    if (!body.WONDAN_NAME || !body.NAME || !body.SUPPLAY) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: '필수 필드가 누락되었습니다. (원단명, 이름, 공급사)' 
      });
    }

    const result = await WondanModel.updateMasterWondan(Number(NO), {
      ...body,
      NO: Number(NO)  // NO를 숫자로 변환하여 추가
    });
    
    console.log('[Controller] updateMasterWondan - 수정 완료');
    return { success: true, data: result };

  } catch (error: any) {
    console.error('[Controller] updateMasterWondan - 에러 발생:', error);
    throw createError({ 
      statusCode: error.statusCode || 500, 
      statusMessage: error.message || '원단 코드 수정 중 오류가 발생했습니다.' 
    });
  }
};

export const removeMasterWondan = async (event: H3Event) => {
  try {
    console.log('[Controller] removeMasterWondan - 원단 코드 삭제 시작');
    const params = event.context.params;
    const NO = params?.NO;

    console.log('[Controller] removeMasterWondan - 파라미터:', params);

    if (!NO) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: '삭제할 원단 코드의 NO가 필요합니다.' 
      });
    }

    const result = await WondanModel.removeMasterWondan(Number(NO));
    console.log('[Controller] removeMasterWondan - 삭제 완료');
    return { success: true, data: result };

  } catch (error: any) {
    console.error('[Controller] removeMasterWondan - 에러 발생:', error);
    throw createError({ 
      statusCode: error.statusCode || 500, 
      statusMessage: error.message || '원단 코드 삭제 중 오류가 발생했습니다.' 
    });
  }
};

// 원단 마스터 코드 목록 조회
export const getMasterWondanList = async (event: H3Event) => {
  try {
    console.log('[Controller] getMasterWondanList - 조회 시작');
    const query = getQuery(event);
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const result = await WondanModel.getMasterWondanList(page, limit);
    console.log('[Controller] getMasterWondanList - 조회 완료');

    return {
      success: true,
      data: result.data,
      total: result.total
    };
  } catch (error: any) {
    console.error('[Controller] getMasterWondanList - 에러 발생:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || '원단 코드 목록 조회 중 오류가 발생했습니다.'
    });
  }
};

// 원단 마스터 코드 검색
export const searchMasterWondanCode = async (event: H3Event) => {
  try {
    console.log('[Controller] searchMasterWondan - 원단 마스터 코드 검색 시작');
    const query = getQuery(event);
    const searchTerm = query.term as string;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    
    if (!searchTerm) {
      throw createError({ statusCode: 400, statusMessage: '검색어를 입력해주세요.' });
    }

    const result = await WondanModel.searchMasterWondan(searchTerm, page, limit);
    console.log('[Controller] searchMasterWondan - 검색 완료');

    return {
      success: true,
      data: result.data,
      total: result.total
    };
  } catch (error) {
    console.error('[Controller] searchMasterWondan - 에러 발생:', error);
    throw createError({ statusCode: 500, statusMessage: '원단 마스터 코드 검색 중 오류가 발생했습니다.' });
  }
};

// 원단 마스터 코드 등록
export const registerMasterWondanCode = async (event: H3Event) => {
  try {
    console.log('[Controller] registerMasterWondan - 원단 마스터 코드 등록 시작');
    const body = await readBody(event);
    
    if (!body.WONDAN_CODE || !body.WONDAN_NAME || !body.SUPPLIER) {
      throw createError({ statusCode: 400, statusMessage: '필수 항목을 모두 입력해주세요.' });
    }

    const result = await WondanModel.registerMasterWondan(body);
    console.log('[Controller] registerMasterWondan - 등록 완료');
    return { data: result };
  } catch (error) {
    console.error('[Controller] registerMasterWondan - 에러 발생:', error);
    if (error.message?.includes('Duplicate')) {
      throw createError({ statusCode: 400, statusMessage: '이미 존재하는 원단 코드입니다.' });
    }
    throw createError({ statusCode: 500, statusMessage: '원단 마스터 코드 등록 중 오류가 발생했습니다.' });
  }
};

// 원단 마스터 코드 수정
export const updateMasterWondanCode = async (event: H3Event) => {
  try {
    console.log('[Controller] updateMasterWondan - 원단 마스터 코드 수정 시작');
    const id = event.context.params?.id;
    const body = await readBody(event);
    
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: '수정할 원단 코드의 ID가 필요합니다.' });
    }

    if (!body.WONDAN_CODE || !body.WONDAN_NAME || !body.SUPPLIER) {
      throw createError({ statusCode: 400, statusMessage: '필수 항목을 모두 입력해주세요.' });
    }

    const result = await WondanModel.updateMasterWondan(Number(id), body);
    console.log('[Controller] updateMasterWondan - 수정 완료');
    return { data: result };
  } catch (error) {
    console.error('[Controller] updateMasterWondan - 에러 발생:', error);
    if (error.message?.includes('Duplicate')) {
      throw createError({ statusCode: 400, statusMessage: '이미 존재하는 원단 코드입니다.' });
    }
    throw createError({ statusCode: 500, statusMessage: '원단 마스터 코드 수정 중 오류가 발생했습니다.' });
  }
};

// 원단 마스터 코드 삭제
export const removeMasterWondanCode = async (event: H3Event) => {
  try {
    console.log('[Controller] removeMasterWondan - 원단 마스터 코드 삭제 시작');
    const id = event.context.params?.id;
    
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: '삭제할 원단 코드의 ID가 필요합니다.' });
    }

    const result = await WondanModel.removeMasterWondan(Number(id));
    console.log('[Controller] removeMasterWondan - 삭제 완료');
    return { data: result };
  } catch (error) {
    console.error('[Controller] removeMasterWondan - 에러 발생:', error);
    throw createError({ statusCode: 500, statusMessage: '원단 마스터 코드 삭제 중 오류가 발생했습니다.' });
  }
};
