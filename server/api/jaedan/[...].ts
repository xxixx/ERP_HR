import { useBase, createRouter, defineEventHandler } from 'h3';
import * as jaedanCtrl from '~/server/controller/jaedan';
import * as jaedanProductsCtrl from '~/server/controller/jadanProducts';

const router = createRouter();
router.get('/jaedan/getHistory', defineEventHandler(jaedanCtrl.getHistory));
router.get('/wondan/getPagedRecord', defineEventHandler(jaedanCtrl.getPagedRecord));
router.get('/jaedan/getRecord', defineEventHandler(jaedanCtrl.getRecord));
router.get('/jaedan/getProcessStateRecord', defineEventHandler(jaedanCtrl.getProcessStateRecord));
router.get('/jaedan/getRecord10', defineEventHandler(jaedanCtrl.getRecord10));
router.post('/jaedan/register', defineEventHandler(jaedanCtrl.register));
router.post('/jaedan/updateState/:NO', defineEventHandler(jaedanCtrl.updateState));
router.delete('/jaedan/:NO', defineEventHandler(jaedanCtrl.remove));
router.post('/jaedan/processUpdateState/:NO', defineEventHandler(jaedanCtrl.updateStateProcess));//생산투입
router.get('/jaedan/getDetail/:NO', defineEventHandler(jaedanCtrl.getDetail));
// pagedRecord2
router.get('/jaedan/getPagedRecord', defineEventHandler(jaedanCtrl.getPagedRecord));
router.get('/jaedan/getRecordsByDate', defineEventHandler(jaedanCtrl.getRecordsByDate));
router.get('/jaedan/searchRecords', defineEventHandler(jaedanCtrl.searchRecordsByTerm));
//
router.get('/jaedan/getJaedanWondanView', defineEventHandler(jaedanProductsCtrl.getJaedanWondanView));
//파트 재단
router.post('/jaedan/partJaedanRegister', defineEventHandler(jaedanCtrl.partJaedanRegister));
router.get('/jaedan/getPartJaedanRecord10', defineEventHandler(jaedanCtrl.getPartJaedanRecord10));
router.post('/jaedan/partJaedaupdateState/:NO', defineEventHandler(jaedanCtrl.partJaedaupdateState));

export default useBase('/api', router.handler);