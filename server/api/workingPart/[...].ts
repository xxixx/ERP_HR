import { useBase, createRouter, defineEventHandler } from 'h3';
import * as workingPartCtrl from '~/server/controller/workingPart';

const router = createRouter();
router.get('/workingPart/getWORKING_PART', defineEventHandler(workingPartCtrl.getWORKING_PART));
// 목록 조회
router.get('/workingPart/list', defineEventHandler(workingPartCtrl.getWorkingPartList));

// 검색
router.get('/workingPart/search', defineEventHandler(workingPartCtrl.searchWorkingPart));

// 등록
router.post('/workingPart/register', defineEventHandler(workingPartCtrl.register));

// 수정
router.put('/workingPart/:id', defineEventHandler(workingPartCtrl.update));

// 삭제
router.delete('/workingPart/:id', defineEventHandler(workingPartCtrl.remove));

export default useBase('/api', router.handler);
