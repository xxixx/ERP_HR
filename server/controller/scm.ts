import { H3Event } from 'h3';
import * as ScmModel from '~~/server/model/scm';

export const register = async (event: H3Event) => {
  try {
    console.log('Creating a new barcode register');
    const body = await readBody(event);
    console.log('Got request body', body);
    
    const { barcode } = body;
    
    if (!barcode) {
      throw createError({
        statusCode: 400,
        message: '바코드는 필수 입력값입니다.'
      })
    }

    const result = await ScmModel.register(barcode);

    console.log('Created barcode register', result);
    return {
      data: result
    };
  } catch (err) {
    console.error('Error creating barcode register', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const getRegisters = async (event: H3Event) => {
  try {
    const result = await ScmModel.getRegisters();

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
export const getPagedRecord = async (event: H3Event) => {
  const { page, pageSize  } = getQuery(event);
  
  try {
    const result = await ScmModel.getPagedRecord(Number(page), Number(pageSize));
    const totalRecords = await ScmModel.getTotalRecords(); // 총 레코드 수를 가져오는 함수 필요

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
    const { records, totalPages } = await ScmModel.getRecordsByDate(startDate, endDate, parseInt(page), parseInt(limit));
    
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
    const { records, totalPages } = await ScmModel.searchRecordsByTerm(searchTerm, parseInt(page), parseInt(limit));
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

export const searchByQuery = async (event: H3Event) => {
  const { searchQuery, page, limit } = getQuery(event);
  console.log("Received searchQuery:", searchQuery);
  
  try {
    const { records, totalPages } = await ScmModel.searchByQuery(
      searchQuery as string,
      parseInt(page as string),
      parseInt(limit as string)
    );
    
    return {
      success: true,
      records,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      totalPages
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: '검색 중 오류가 발생했습니다.',
    });
  }
};