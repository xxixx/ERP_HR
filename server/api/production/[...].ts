import { useBase, createRouter, defineEventHandler } from 'h3';
import * as productionCtrl from '~/server/controller/production';

const router = createRouter();

router.get('/production/getProcessRecord', defineEventHandler(productionCtrl.getProcessRecord)); // 생산 입고 데이터 조회
router.get('/production/getProcessStateRecord', defineEventHandler(productionCtrl.getProcessStateRecord)); // 생산 입고 데이터 조회
router.get('/production/getProcessStateStandbyRecord', defineEventHandler(productionCtrl.getProcessStateStandbyRecord)); // 생산 대기 데이터 조회
router.get('/production/getProcessStateOnRecord', defineEventHandler(productionCtrl.getProcessStateOnRecord)); // 생산진행 데이터 조회 state= 2
router.post('/production/updateStateProcess/:NO', defineEventHandler(productionCtrl.updateStateProcess));//생산투입
router.post('/production/processFinish/:NO', defineEventHandler(productionCtrl.processFinish));
router.post('/production/productionUpdate', defineEventHandler(productionCtrl.productionUpdate));
router.get('/production/getByProcessCode/:PROCESSCODE', defineEventHandler(productionCtrl.getByProcessCode));
// router.post('/production/getLatestBoxNumber/:NO', defineEventHandler(productionCtrl.updateStateProcess));
router.get('/production/getprocessCode/:processCode', defineEventHandler(productionCtrl.getProductionByProcessCode));
//사용안하는것
router.get('/production/getProductionAllData', defineEventHandler(productionCtrl.getProductionAllData)); // 추가된 부분
router.get('/production', defineEventHandler(productionCtrl.getProductionByProcessCode));
router.put('/production/:processCode', defineEventHandler(productionCtrl.updateLastSerialNumber));
router.get('/production/barcodeCount/:processCode', defineEventHandler(productionCtrl.getBarcodeCount));

//일생산 등록
router.get('/production/getProductionPartsCushion', defineEventHandler(productionCtrl.getProductionPartsCushion)); 
router.get('/production/getProductionPartsFolding', defineEventHandler(productionCtrl.getProductionPartsFolding)); 
router.get('/production/getDayProduction', defineEventHandler(productionCtrl.getDayProduction));
router.get('/production/getLatestDayProductionCushion', defineEventHandler(productionCtrl.getLatestDayProductionCushion));
router.get('/production/getLatestDayProductionFolding', defineEventHandler(productionCtrl.getLatestDayProductionFolding));
router.get('/production/getLatestDayProduction', defineEventHandler(productionCtrl.getLatestDayProduction));
router.get('/production/getDayProductionNO/:NO', defineEventHandler(productionCtrl.getDayProductionNO));
router.post('/production/getDayProduction', defineEventHandler(productionCtrl.updateDayProduction));
router.post('/production/dayProductionRegister', defineEventHandler(productionCtrl.dayProductionRegister));


router.post('/production/register', defineEventHandler(productionCtrl.register));
router.get('/production/getRecord10', defineEventHandler(productionCtrl.getRecord10)); // 추가된 부분
router.put('/production/:NO', defineEventHandler(productionCtrl.updateState));



router.delete('/production/:NO', defineEventHandler(productionCtrl.remove));
router.delete('/production/dayProduction/:NO', defineEventHandler(productionCtrl.dayProductionremove));
// router.get('/production/:NO', defineEventHandler(productionCtrl.getDetail));
router.get('/production/:PD_NAME', defineEventHandler(productionCtrl.detail));
export default useBase('/api', router.handler);