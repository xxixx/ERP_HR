import { H3Event } from 'h3';
// import { Context } from 'nuxt';
// import { Context } from '@nuxt/types';

import * as ProductsModel from '~~/server/model/products';


export const getProducts = async (req: H3Event, res: Response) => {
  try {
    const products = await ProductsModel.getProducts();
    
    // return res.json(products);
    return {
      data: products
    };
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 모든 상품 가져오기
export const getAllProducts = async () => {
  try {
    const products = await ProductsModel.getAllProducts();
    if (products) {
      return products;
    } else {
      return; // 상품이 없을 경우 반환
    }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

// 특정 상품 가져오기 (NO 값으로)
export const getProductByNo = async (event: H3Event) => {
  try {
    const NO = event.context.params.NO;
    if (!NO) {
      throw createError({
        statusCode: 400,
        message: '상품 번호(NO)가 필요합니다.'
      });
    }

    const product = await ProductsModel.getProductByNo(NO);
    if (!product) {
      throw createError({
        statusCode: 404,
        message: '상품을 찾을 수 없습니다.'
      });
    }
    return product;
  } catch (err) {
    console.error('Controller - Error in getProductByNo:', err);
    throw err;
  }
};

// 제품 코드로 상품 조회
export const getProductByCode = async (event: H3Event) => {
  try {
    const processCode = event.context.params.processCode;
    console.log('Controller - Fetching product with code:', processCode);
    
    if (!processCode) {
      throw createError({
        statusCode: 400,
        message: '제품 코드가 필요합니다.'
      });
    }

    const product = await ProductsModel.getProductByCode(processCode);
    if (!product) {
      throw createError({
        statusCode: 404,
        message: '상품을 찾을 수 없습니다.'
      });
    }
    return product;
  } catch (err) {
    console.error('Controller - Error in getProductByCode:', err);
    throw err;
  }
};

// 상품 추가하기
export const addProducts = async (data) => {
  try {
    await ProductsModel.addProducts(data);
    return { message: '상품이 등록되었습니다.' };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: '상품 등록 중 오류 발생'
    });
  }
};

// 상품 수정하기
export const updateProducts = async (data) => {
  console.log('Controller - Update function called');
  try {
    console.log('Controller - Received update data:', JSON.stringify(data, null, 2));
    
    if (!data || !data.NO) {
      console.error('Controller - Invalid data: NO is missing');
      throw new Error('상품 번호(NO)가 필요합니다');
    }
    
    console.log('Controller - Calling model updateProducts');
    const result = await ProductsModel.updateProducts(data);
    console.log('Controller - Model update successful, result:', result);
    
    return { 
      success: true,
      message: '상품이 수정되었습니다.',
      data: result
    };
  } catch (err) {
    console.error('Controller - Error updating product:', err);
    throw createError({
      statusCode: 500,
      statusMessage: err.message || '상품 수정 중 오류 발생'
    });
  }
};


export const getAllProducts1 = async () => {
  
  try {
    const product = await ProductsModel.getAllProducts();
    if (product) {
      return product;
    } else {
      return null;
    }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const getProductsByProductCode = async (event: H3Event) => {
  const { productsCode } = event.context.params;
  try {
    const product = await ProductsModel.getProductsByProductCode(productsCode);
    if (product) {
      return product;
    } else {
      return null;
    }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const getProductData = async (event: H3Event) => {
  const { productsCode } = event.context.params;
  try {
    const product = await ProductsModel.getProductData(productsCode);
    if (product) {
      return product;
    } else {
      return null;
    }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const updateLastSerialNumber = async (event: H3Event) => {
  const { productsCode } = event.context.params;
  const { lastSerialNumber } = await readBody(event);
  try {
    await ProductsModel.updateLastSerialNumber(productsCode, lastSerialNumber);
    return { success: true };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};


export const getProductionAllData = async () => {
  try {
    const result = await ProductsModel.getProductionAllData();

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
    const result = await ProductsModel.getRecord();

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

export const create = async (evt: H3Event) => {
  try {
    console.log('Creating a new JAEDAN RECORD');
    const body = await readBody(evt);
    console.log('Got request body', body);
    const result = await ProductsModel.register({
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
    });

    console.log('Created JADAN REGISTER post', result);
    return {
      data: result
    };
  } catch (err) {
    console.error('Error creating JADAN REGISTER post', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};
export const getProductionByProcessCode = async (event: H3Event) => {
  const { processCode } = getQuery(event);
  try {
    const production = await ProductionModel.getProductionByProcessCode(processCode);
    if (production) {
      return {
        exists: true,
        lastSerialNumber: production.LAST_SERIAL_NUMBER
      };
    } else {
      return { exists: false };
    }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};


export const getBarcodeCount = async (event: H3Event) => {
  const processCode = event.context.params.processCode;

  try {
    const result = await ProductsModel.getBarcodeCount(processCode);

    if (result.length === 0) {
      return { barcodeCount: 0 };
    }

    return { barcodeCount: result[0].BARCODE_COUNT };
  } catch (err) {
    console.error('Error fetching barcode count for process code', processCode, err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};


export const register = async (evt: H3Event) => {
  try {
    console.log('Creating a new PRODUCTION RECORD');
    const body = await readBody(evt);
    console.log('Got request body', body);
    
    const result = await ProductsModel.register({
      JAEDAN_NO: body.JAEDAN_NO,
      PROCESS_CODE: body.PROCESS_CODE,
      STATE: body.STATE,
     
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

    // const STATE = body.STATE as number;

    // const data = { STATE };
    const result = await ProductsModel.updateState(NO, body.STATE,body.PD_STATE,body.PD_ACCOUNT,body.PD_DATE);

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

export const getRecord10 = async () => {
  try {
    const result = await ProductsModel.getRecord10();

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
    const result = await ProductsModel.getAllData();

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
    const result = await ProductionModel.get10();

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
    const result = await ProductsModel.getLastData();

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
    const result = await ProductsModel.insertData();

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
    const result = await ProductsModel.getDetail(evt.context.params?.NO as string);

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
export const detail = async (evt: H3Event) => {
  try {
    const result = await ProductsModel.detail(evt.context.params?.PD_NAME as string);

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
    const result = await ProductsModel.update(evt.context.params?.no as number, {
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

    // const result = await ProductionModel.remove(numNo?.)?;
    const result = await ProductsModel.remove?.(numNo); 
    
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
    const result = await ProductsModel.remove(evt.context.params?.NO as string);
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
//     const result = await ProductionModel.remove(evt.context.params?.no as number);
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
    const result = await ProductsModel.remove(evt.context.params?.no as unknown);

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
