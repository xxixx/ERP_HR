import { useBase, createRouter, defineEventHandler } from 'h3';
import * as scmCtrl from '~/server/controller/scm.js';

const router = createRouter();

router.post('/scm/register', defineEventHandler(scmCtrl.register));
router.get('/scm/getRecord', defineEventHandler(scmCtrl.getRegisters));
router.get('/scm/getPagedRecord', defineEventHandler(scmCtrl.getPagedRecord));
router.get('/scm/getRecordsByDate', defineEventHandler(scmCtrl.getRecordsByDate));
router.get('/scm/searchByQuery', defineEventHandler(scmCtrl.searchByQuery));


export default useBase('/api', router.handler);