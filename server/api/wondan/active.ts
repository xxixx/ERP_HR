import { useBase, createRouter, defineEventHandler } from 'h3';
import * as wondanCtrl from '~/server/controller/wondan.js';

const router = createRouter();

// 실제 사용되는 API 엔드포인트
router.get('/wondan/getRecord', defineEventHandler(async (evt) => {
  try {
    const result = await wondanCtrl.getRecord();
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
}));

router.get('/wondan/getWondanCode', defineEventHandler(wondanCtrl.getWondanCode));
router.delete('/wondan/delete/:NO', defineEventHandler(wondanCtrl.remove));

export default useBase('/api', router.handler);
