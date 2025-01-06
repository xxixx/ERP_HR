import { useBase, createRouter, defineEventHandler } from 'h3';
import * as workOrderCtrl from '~~/server/controller/workOrder';

const router = createRouter();
router.get('/workOrder/getOrderWithAccount', defineEventHandler(workOrderCtrl.getOrderWithAccount));
router.get('/workOrder/getOrderWithAccountStateUp', defineEventHandler(workOrderCtrl.getOrderWithAccountStateUp));
router.get('/workOrder/getOrder', defineEventHandler(workOrderCtrl.getOrder)); // 추가된 부분
router.get('/workOrder/getOrder/:NO', defineEventHandler(workOrderCtrl.detail));
router.post('/workOrder/registerOrder', defineEventHandler(workOrderCtrl.registerOrder));
router.post('/workOrder/updateState/:NO', defineEventHandler(workOrderCtrl.updateState));
router.post('/workOrder/updateStateJadan/:NO', defineEventHandler(workOrderCtrl.updateStateJadan));
router.delete('/workOrder/:NO', defineEventHandler(workOrderCtrl.remove));
//페이지별 데이터 가져오기
router.get('/workOrder/getPagedRecord', defineEventHandler(workOrderCtrl.getPagedRecord));
router.get('/workOrder/getRecordsByDate', defineEventHandler(workOrderCtrl.getRecordsByDate));
router.get('/workOrder/searchRecords', defineEventHandler(workOrderCtrl.searchRecordsByTerm));
// router.get('/workOrder/getOrderWithAccountAllPagedRecord', defineEventHandler(workOrderCtrl.getOrderWithAccountAllPagedRecord));
router.get('/workOrder/searchDateRange', defineEventHandler(workOrderCtrl.searchDateRange));
router.get('/workOrder/search', defineEventHandler(workOrderCtrl.searchRecords));
//파트재단
router.post('/workOrder/jaedanPartRegisterOrder', defineEventHandler(workOrderCtrl.jaedanPartRegisterOrder));
router.get('/workOrder/getOrderJaedanPartWithAccount', defineEventHandler(workOrderCtrl.getOrderJaedanPartWithAccount));
router.post('/workOrder/updateStatepartJadan/:NO', defineEventHandler(workOrderCtrl.updateStatePartJadan));
router.get('/workOrder/getPartJadanOrderWithAccountStateUp', defineEventHandler(workOrderCtrl.partJadanOrderWithAccountStateUp));
router.get('/workOrder/getPartJaedanOrder/:NO', defineEventHandler(workOrderCtrl.partJaedandetail));
// router.get('/workOrder/getPartJaedanOrder', defineEventHandler(workOrderCtrl.getPartJaedanOrder)); // 추가된 부분
export default useBase('/api', router.handler);