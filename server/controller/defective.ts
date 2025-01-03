import { H3Event } from 'h3';
// import { Context } from 'nuxt';
// import { Context } from '@nuxt/types';

import * as DefectiveModel from '@/server/model/defective';
import * as DefectiveCategoryModel from '@/server/model/defective';

export const read = async () => {
  try {
    const result = await DefectiveModel.read();

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
    const result = await DefectiveModel.getAllData();

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
    const result = await DefectiveCategoryModel.categoryAll();

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
    const result = await DefectiveCategoryModel.partCount();

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
    const result = await DefectiveCategoryModel.getPart();

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
    const result = await DefectiveCategoryModel.getCategory();

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
    const result = await DefectiveCategoryModel.getSubCategory();

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
    const result = await DefectiveModel.get10();

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
    const result = await DefectiveModel.getLastData();

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
    const result = await DefectiveModel.insertData();

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
export const create = async (evt: H3Event) => {
  try {
    console.log('Creating a new Defective ');
    const body = await readBody(evt);
    console.log('Got request body', body);
    const result = await DefectiveModel.create({
      DATE: body.DATE,
      PART: body.PART,
      CATEGORY: body.CATEGORY,
      SUB_CATEGORY: body.SUB_CATEGORY,
      COUNT: body.COUNT,
      SUM: body.SUM,
      ETC: body.ETC,
      
    });

    console.log('Created Defective post', result);
    return {
      data: result
    };
 } catch (err) {
+    console.error('Error creating Defective post', err);
// -  } catch {
//     throw createError({
//       statusCode: 500,
//       statusMessage: 'Something went wrong'
//     });
//   }
};
}
// <<<<<<<  8e2948af-5622-4b2b-aaa0-07346e75d753  >>>>>>>

export const detail = async (evt: H3Event) => {
  try {
    const result = await DefectiveModel.detail(evt.context.params?.no as string);

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

export const update = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await DefectiveModel.update(evt.context.params?.no as number, {
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
    const result = await DefectiveModel.remove?.(numNo); 
    
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
export const remove = async (evt: H3Event) => {
  try {
    console.log("evt",evt)
    // const params = evt.context.params.no
    const result = await DefectiveModel.remove(evt.context.params?.no as string);
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
    const result = await DefectiveModel.remove(evt.context.params?.no as unknown);

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

export const getDataByDate = async (event: H3Event) => {
  try {
    console.log('getDataByDate 컨트롤러 호출');
    const query = getQuery(event);
    const startDate = query.startDate as string;
    const endDate = query.endDate as string;
    
    console.log('조회 기간:', startDate, '~', endDate);
    
    const result = await DefectiveModel.getDataByDate(startDate, endDate);
    console.log('조회 결과:', result);
    
    return { data: result };
  } catch (error) {
    console.error('getDataByDate 에러:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch data by date range' });
  }
};
