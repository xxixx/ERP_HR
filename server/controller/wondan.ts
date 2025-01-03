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
  export const searchRecordsByTerm = async (event: H3Event) => {
    const { searchTerm, page, limit } = getQuery(event); // 쿼리 파라미터에서 searchTerm 가져오기
    console.log("searchRecordsByTerm received searchTerm:", searchTerm);
  
    try {
      const { records, totalPages } = await WondanModel.searchRecordsByTerm(searchTerm, parseInt(page), parseInt(limit));
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
  


