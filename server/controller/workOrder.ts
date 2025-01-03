import { H3Event } from 'h3';
// import { Context } from 'nuxt';
// import { Context } from '@nuxt/types';

import * as WorkOrderModel from '~~/server/model/workOrder';

export const getOrderWithAccount = async () => {
  try {
    const result = await WorkOrderModel.getOrderWithAccount();

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
export const getOrderWithAccountStateUp = async () => {
  try {
    const result = await WorkOrderModel.getOrderWithAccountStateUp();

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

export const detail = async (evt: H3Event) => {
  try {
    const NO = evt.context.params?.NO as string; // 대소문자 정확히 맞추기
    const result = await WorkOrderModel.detail(NO);

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

export const getOrder = async () => {
  try {
    const result = await WorkOrderModel.getOrder();

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

export const getOrderWithAccountAll = async () => {
  try {
    const result = await WorkOrderModel.getOrderWithAccountAll();

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
export const getOrderWithAccountAllPagedRecord = async () => {
  try {
    const result = await WorkOrderModel.getOrderWithAccountAllPagedRecord();

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
export const getPagedRecord2 = async (event: H3Event) => {
  const query = getQuery(event);
  console.log('query', query);
  const page = parseInt(query.page as string) || 1;
  console.log('page', page);
  const itemsPerPage = parseInt(query.itemsPerPage as string) || 15;
  console.log('page', page, 'itemsPerPage', itemsPerPage);

  try {
    const result = await WorkOrderModel.getPagedRecord(page, itemsPerPage);
    const totalRecords = await WorkOrderModel.getTotalRecords(); // Get total records for pagination
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

export const getPagedRecord = async (event: H3Event) => {
  const { page, pageSize  } = getQuery(event);
  
  try {
    const result = await WorkOrderModel.getPagedRecord(Number(page), Number(pageSize));
    const totalRecords = await WorkOrderModel.getTotalRecords(); // 총 레코드 수를 가져오는 함수 필요

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
    const { records, totalPages } = await WorkOrderModel.getRecordsByDate(startDate, endDate, parseInt(page), parseInt(limit));
    
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
    const { records, totalPages } = await WorkOrderModel.searchRecordsByTerm(searchTerm, parseInt(page), parseInt(limit));
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
    const result = await WorkOrderModel.searchDateRange( startDate, endDate);
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
    const result = await WorkOrderModel.searchRecords(searchQuery, startDate, endDate);
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
// <<<<<<<<<<<<<<  ✨ Codeium Command 🌟 >>>>>>>>>>>>>>>>
export const registerOrder = async (evt: H3Event) => {
  try {
  console.log('Creating a new worrk order RECORD ');
    const body = await readBody(evt);
    console.log('Got request body', body);
    const result = await WorkOrderModel.registerOrder({
      CREATE_DATE: body.CREATE_DATE,
      WORKING_PART: body.WORKING_PART,
     
     COUNT: body.COUNT,
     REG_ACCOUNT: body.REG_ACCOUNT,
    
    });

    console.log('Created work order post', result);
    return {
      data: result
    };
 } catch (err) {
   console.error('Error creating work order post', err);
};
}
export const remove = async (evt: H3Event) => {
  try {
    console.log("evt",evt)
    // const params = evt.context.params.no
    const result = await WorkOrderModel.remove(evt.context.params?.NO as string);
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

export const updateState = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const NO = body.NO as string;


    const result = await WorkOrderModel.updateState(NO, body.STATE,body.UPDATE_ACCOUNT);

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
export const updateStateJadan = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const NO = body.NO as string;


    const result = await WorkOrderModel.updateStateJadan(NO, body.JAEDAN_STATE,body.UPDATE_ACCOUNT);

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
    const result = await WorkOrderModel.getRecord10();

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
    const result = await WorkOrderModel.getAllData();

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
export const categoryAll = async () => {
  try {
    const result = await WorkOrderModel.categoryAll();

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
export const partCount = async () => {
  try {
    const result = await WorkOrderModel.partCount();

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
export const getPart = async () => {
  try {
    const result = await WorkOrderModel.getPart();

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
export const getCategory = async () => {
  try {
    const result = await WorkOrderModel.getCategory();

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
export const getSubCategory = async () => {
  try {
    const result = await WorkOrderModel.getSubCategory();

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
export const get10 = async () => {
  try {
    const result = await WorkOrderModel.get10();

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
export const getLastData = async () => {
  try {
    const result = await WorkOrderModel.getLastData();

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
export const getInsertData = async () => {
  try {
    const result = await WorkOrderModel.insertData();

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


// <<<<<<<  8e2948af-5622-4b2b-aaa0-07346e75d753  >>>>>>>

// export const detail = async (evt: H3Event) => {
//   try {
//     const result = await WorkOrderModel.detail(evt.context.params?.no as string);

//     return {
//       data: result
//     };
//   } catch {
//     throw createError({
//       statusCode: 500,
//       statusMessage: 'Something went wrong'
//     });
//   }
// };

export const update = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await WorkOrderModel.update(evt.context.params?.no as number, {
      name: body.name,
     no: number, undefined: undefinedy.part
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

export const remove2 = async (evt: H3Event) => {
  try {
    
    const no = evt.context.params?.no;
    let numNo;

    if (typeof no === 'string') {
      numNo = parseInt(no);
    }

    // const result = await DefectiveModel.remove(numNo?.)?;
    const result = await WorkOrderModel.remove?.(numNo); 
    
    console.log(result);
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

// export const remove = async (evt: H3Event) => {
//   try {
//     console.log("evt",evt)
//     const result = await DefectiveModel.remove(evt.context.params?.no as number);
//     console.log(result)
//     return {
//       data: result
      
    
//     };
//   } catch {
//     throw createError({
//       statusCode: 500,
//       statusMessage: 'Something went wrong'
//     });
//   }
// };
export const remove1 = async (evt: H3Event) => {
  try {
    const result = await WorkOrderModel.remove(evt.context.params?.no as unknown);

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

//재단파트공정등록
export const jaedanPartRegisterOrder = async (evt: H3Event) => {
  try {
    console.log('Creating a new work order RECORD');
    const body = await readBody(evt);
    console.log('Got request body', body);

    // Validate required fields
    if (!body.JAEDAN_PRODUCT_PART) {
      throw createError({
        statusCode: 400,
        message: 'JAEDAN_PRODUCT_PART is required'
      });
    }

    if (!body.COUNT || isNaN(Number(body.COUNT)) || Number(body.COUNT) <= 0) {
      throw createError({
        statusCode: 400,
        message: 'COUNT must be a positive number'
      });
    }

    // Set default values
    const data = {
      CREATE_DATE: body.CREATE_DATE || new Date().toISOString().split('T')[0],
      JAEDAN_PRODUCT_PART: body.JAEDAN_PRODUCT_PART,
      COUNT: body.COUNT,
      REG_ACCOUNT: body.REG_ACCOUNT || 1
    };

    const result = await WorkOrderModel.jaedanPartRegisterOrder(data);

    console.log('Created work order post', result);
    return {
      data: result
    };
  } catch (err) {
    console.error('Error creating work order post', err);
    throw err;
  }
};
export const getOrderJaedanPartWithAccount = async () => {
  try {
    const result = await WorkOrderModel.getOrderJaedanPartWithAccount();

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
export const updateStatePartJadan = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const NO = body.NO as string;


    const result = await WorkOrderModel.updateStatePartJadan(NO, body.STATE,body.UPDATE_ACCOUNT);

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
export const partJadanOrderWithAccountStateUp = async () => {
  try {
    const result = await WorkOrderModel.partJadanOrderWithAccountStateUp();

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
export const partJaedandetail = async (evt: H3Event) => {
  try {
    const NO = evt.context.params?.NO as string; // 대소문자 정확히 맞추기
    const result = await WorkOrderModel.partJaedandetail(NO);

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
