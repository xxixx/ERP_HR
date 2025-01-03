import { useBase, createRouter, defineEventHandler } from 'h3';
import * as wondanCtrl from '~/server/controller/wondan.js';

const router = createRouter();
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
router.post('/wondan/register', defineEventHandler(wondanCtrl.register));
router.delete('/wondan/delete/:NO', defineEventHandler(wondanCtrl.remove));
////////////////////////////////////////////////////////////////////////////
router.put('/wondan/:NO', defineEventHandler(wondanCtrl.update));
router.get('/wondan/getPagedRecord', defineEventHandler(wondanCtrl.getPagedRecord));
router.get('/wondan/searchDateRange', defineEventHandler(wondanCtrl.searchDateRange));

// pagedRecord2
router.get('/wondan/searchRecords', defineEventHandler(wondanCtrl.searchRecordsByTerm));
router.get('/wondan/getPagedRecord2', defineEventHandler(wondanCtrl.getPagedRecord2));
router.get('/wondan/getRecordsByDate', defineEventHandler(wondanCtrl.getRecordsByDate));
router.get('/wondan/getUseable', defineEventHandler(wondanCtrl.getUseable));
router.post('/wondan/updateState/:NO', defineEventHandler(wondanCtrl.updateState));
export default useBase('/api', router.handler);