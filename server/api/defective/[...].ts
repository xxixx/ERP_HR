import { useBase, createRouter, defineEventHandler, getQuery } from 'h3';
import * as defectiveCtrl from '~/server/controller/defective';

const router = createRouter();

router.get('/defective/getData', defineEventHandler(defectiveCtrl.read));
router.get('/defective/getAllData', defineEventHandler(defectiveCtrl.getAllData)); 
router.get('/defective/getLastData', defineEventHandler(defectiveCtrl.getLastData)); 
router.get('/defective/get10', defineEventHandler(defectiveCtrl.get10)); 
router.post('/defective/register', defineEventHandler(defectiveCtrl.create));
router.get('/defective/getInsertData', defineEventHandler(defectiveCtrl.getInsertData)); 
router.get('/defective/getPart', defineEventHandler(defectiveCtrl.getPart)); 
router.get('/defective/getCategory', defineEventHandler(defectiveCtrl.getCategory)); 
router.get('/defective/getSubCategory', defineEventHandler(defectiveCtrl.getSubCategory)); 
router.get('/defective/getInsertData', defineEventHandler(defectiveCtrl.getInsertData)); 
router.get('/defective/getpartCount', defineEventHandler(defectiveCtrl.partCount)); 
router.get('/defective/categoryAll', defineEventHandler(defectiveCtrl.categoryAll)); 
router.get('/defective/getDataByDate', defineEventHandler(defectiveCtrl.getDataByDate));
router.delete('/defective/:no', defineEventHandler(defectiveCtrl.remove));

export default useBase('/api', router.handler);