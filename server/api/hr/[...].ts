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

// 직급 목록 조회
router.get('/jobs', defineEventHandler(hrCtrl.getJobs));
// 부서 목록 조회
router.get('/departments', defineEventHandler(hrCtrl.getDepartments));
// 부서 추가
router.post('/departments', defineEventHandler(hrCtrl.createDepartment));
// 부서 수정
router.put('/departments/:id', defineEventHandler(hrCtrl.updateDepartment));



// 직급 추가
router.post('/jobs', defineEventHandler(hrCtrl.createJob));
// 직급 수정
router.put('/jobs/:id', defineEventHandler(hrCtrl.updateJob));
/**
 * 연차 관리 API
 */
// 연차 신청
router.post('/leave/request', defineEventHandler(hrCtrl.requestLeave));

// 연차 상태 업데이트
router.put('/leave/status', defineEventHandler(hrCtrl.updateLeaveStatus));
//연차 초기화
router.post('/leave/initialize', defineEventHandler(async (event) => {
    try {
      const body = await readBody(event);
      const result = await hrCtrl.initializeLeaveBalance(body);
      return { success: true, data: result };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error instanceof Error ? error.message : 'Failed to initialize leave balance'
      });
    }
  }));

  // 직원 목록 조회
router.get('/employeesList', defineEventHandler(async () => {
    try {
      const result = await hrCtrl.getEmployeesList();
      return { success: true, data: result };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error instanceof Error ? error.message : 'Failed to fetch employees'
      });
    }
  }));
  
  // 전체 연차 정보 조회
  router.get('/leave/balances', defineEventHandler(async () => {
    try {
      const result = await hrCtrl.getLeaveBalances();
      return { success: true, data: result };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error instanceof Error ? error.message : 'Failed to fetch leave balances'
      });
    }
  }));
export default useBase('/api/hr', router.handler);