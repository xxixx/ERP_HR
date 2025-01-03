import { useBase, createRouter, defineEventHandler, readBody } from 'h3';
import * as productsCtrl from '~/server/controller/products';

const router = createRouter();

// 상품 목록 가져오기
router.get('/products/getProducts', defineEventHandler(productsCtrl.getProducts));

// 특정 상품 가져오기 (NO 값으로)
router.get('/products/getProducts/:NO', defineEventHandler(productsCtrl.getProductByNo));

// 상품 수정하기
router.post('/products/updateProducts', defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log('API Route - Update request received:', body);
    const result = await productsCtrl.updateProducts(body);
    console.log('API Route - Update result:', result);
    return result;
  } catch (error) {
    console.error('API Route - Error:', error);
    throw error;
  }
}));

router.get('/products/getAllProducts', defineEventHandler(productsCtrl.getAllProducts));
router.get('/products/getProducts/:productsCode', defineEventHandler(productsCtrl.getProductData));
router.get('/products/getproductsCode/:productsCode', defineEventHandler(productsCtrl.getProductsByProductCode));
router.put('/products/:productsCode', defineEventHandler(productsCtrl.updateLastSerialNumber));

export default useBase('/api', router.handler);