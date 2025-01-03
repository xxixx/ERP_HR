import { useBase, createRouter, defineEventHandler, readBody, createError } from 'h3';
import * as productsCtrl from '~/server/controller/products';

const router = createRouter();

// 상품 목록 가져오기
router.get('/products/getProducts', defineEventHandler(productsCtrl.getProducts));

// 특정 상품 가져오기 (NO 값으로)
router.get('/products/getProducts/:NO', defineEventHandler(async (event) => {
  console.log('API - GetProductByNo endpoint hit');
  try {
    const NO = event.context.params.NO;
    console.log('API - Fetching product with NO:', NO);
    
    if (!NO) {
      console.error('API - Missing NO parameter');
      throw createError({
        statusCode: 400,
        message: '상품 번호(NO)가 필요합니다.'
      });
    }

    const result = await productsCtrl.getProductByNo(event);
    console.log('API - Fetch result:', result);
    
    if (!result || (Array.isArray(result) && result.length === 0)) {
      throw createError({
        statusCode: 404,
        message: '상품을 찾을 수 없습니다.'
      });
    }
    
    return { data: result };
  } catch (error) {
    console.error('API - Error fetching product:', error);
    throw error;
  }
}));

// 제품 코드로 상품 조회
router.get('/products/byCode/:processCode', defineEventHandler(async (event) => {
  console.log('API - GetProductByCode endpoint hit');
  try {
    const result = await productsCtrl.getProductByCode(event);
    return result;
  } catch (error) {
    console.error('API - Error fetching product:', error);
    throw error;
  }
}));

// 상품 수정하기
router.post('/products/updateProducts', defineEventHandler(async (event) => {
  console.log('API - Update endpoint hit');
  try {
    const body = await readBody(event);
    console.log('API - Received update request body:', JSON.stringify(body, null, 2));
    
    if (!body || !body.NO) {
      console.error('API - Missing NO in request body');
      throw createError({
        statusCode: 400,
        message: '상품 번호(NO)가 필요합니다.'
      });
    }

    const result = await productsCtrl.updateProducts(body);
    console.log('API - Update successful, result:', result);
    return result;
  } catch (error) {
    console.error('API - Error processing update:', error);
    throw error;
  }
}));

router.get('/products/getAllProducts', defineEventHandler(productsCtrl.getAllProducts));
router.get('/products/getProducts/:productsCode', defineEventHandler(productsCtrl.getProductData));
router.get('/products/getproductsCode/:productsCode', defineEventHandler(productsCtrl.getProductsByProductCode));
router.put('/products/:productsCode', defineEventHandler(productsCtrl.updateLastSerialNumber));

export default useBase('/api', router.handler);