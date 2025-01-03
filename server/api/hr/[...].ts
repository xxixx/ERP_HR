import { useBase, createRouter, defineEventHandler } from 'h3';
import * as hrCtrl from '~/server/controller/hr';

const router = createRouter();

/**
 * 사원 관리 API
 */
// 사원 목록 조회
router.get('/employees/list', defineEventHandler(hrCtrl.getEmployees));

// 사원 등록
router.post('/employees/create', defineEventHandler(hrCtrl.createEmployee));
// 사원 상세 조회
router.get('/employees/:id', defineEventHandler(hrCtrl.getEmployeeById));

// 사원 정보 수정
router.put('/employees/:id', defineEventHandler(hrCtrl.updateEmployee));
// 사원 상태 업데이트

router.put('/employees/:id/status', defineEventHandler(hrCtrl.updateEmployeeStatus));

// 관리자 목록 조회
router.get('/employees/managers', defineEventHandler(hrCtrl.getManagers));

/**
 * 부서/직급 관리 API
 */
// 부서 목록 조회
router.get('/departments', defineEventHandler(hrCtrl.getDepartments));

// 직급 목록 조회
router.get('/jobs', defineEventHandler(hrCtrl.getJobs));

/**
 * 연차 관리 API
 */
// 연차 신청
router.post('/leave/request', defineEventHandler(hrCtrl.requestLeave));

// 연차 상태 업데이트
router.put('/leave/status', defineEventHandler(hrCtrl.updateLeaveStatus));

export default useBase('/api/hr', router.handler);