import { useBase, createRouter, defineEventHandler } from 'h3';
import * as wondanCtrl from '~/server/controller/wondan.js';

const router = createRouter();

// 기본 원단 관리 API
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
router.put('/wondan/:NO', defineEventHandler(wondanCtrl.update));

// 페이지네이션 API
router.get('/wondan/getPagedRecord', defineEventHandler(wondanCtrl.getPagedRecord));
router.get('/wondan/searchDateRange', defineEventHandler(wondanCtrl.searchDateRange));

// pagedRecord2
// router.get('/wondan/searchRecords', defineEventHandler(wondanCtrl.searchRecordsByTerm));
router.get('/wondan/getPagedRecord2', defineEventHandler(wondanCtrl.getPagedRecord2));
router.get('/wondan/getRecordsByDate', defineEventHandler(wondanCtrl.getRecordsByDate));

// 검색 API
router.get('/wondan/searchDateRange', defineEventHandler(wondanCtrl.searchDateRange));
// router.get('/wondan/searchRecords', defineEventHandler(wondanCtrl.searchRecordsByTerm));

// 상태 관리 API
router.get('/wondan/getUseable', defineEventHandler(wondanCtrl.getUseable));
router.post('/wondan/updateState/:NO', defineEventHandler(wondanCtrl.updateState));

// 원단 마스터 코드 관리 API
router.get('/wondan/master/list', defineEventHandler(wondanCtrl.getMasterWondanCode));
router.get('/wondan/master/search', defineEventHandler(wondanCtrl.searchMasterWondanByTerm));
router.post('/wondan/master/register', defineEventHandler(wondanCtrl.registerMasterWondan));
router.put('/wondan/master/:NO', defineEventHandler(wondanCtrl.updateMasterWondan));
router.delete('/wondan/master/:NO', defineEventHandler(wondanCtrl.removeMasterWondan));

export default useBase('/api', router.handler);