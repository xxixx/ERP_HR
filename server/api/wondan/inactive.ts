import { useBase, createRouter, defineEventHandler } from 'h3';
import * as wondanCtrl from '~/server/controller/wondan.js';

const router = createRouter();

// 현재 사용되지 않는 API 엔드포인트
router.post('/wondan/register', defineEventHandler(wondanCtrl.register));
router.put('/wondan/:NO', defineEventHandler(wondanCtrl.update));
router.get('/wondan/getPagedRecord', defineEventHandler(wondanCtrl.getPagedRecord));
router.get('/wondan/searchDateRange', defineEventHandler(wondanCtrl.searchDateRange));
router.get('/wondan/searchRecords', defineEventHandler(wondanCtrl.searchRecordsByTerm));
router.get('/wondan/getPagedRecord2', defineEventHandler(wondanCtrl.getPagedRecord2));
router.get('/wondan/getRecordsByDate', defineEventHandler(wondanCtrl.getRecordsByDate));
router.get('/wondan/getUseable', defineEventHandler(wondanCtrl.getUseable));
router.post('/wondan/updateState/:NO', defineEventHandler(wondanCtrl.updateState));

export default useBase('/api', router.handler);
