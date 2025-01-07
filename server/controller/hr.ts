import { H3Event, getQuery, readBody, createError } from 'h3';
import * as HRModel from '~/server/model/hr';

/**
 * 사원 관리 컨트롤러
 */
// 사원 목록 조회
// 사원 목록 조회
export const getEmployees = async (event: H3Event) => {
  try {
    console.log('[Controller] 사원 목록 조회 시작');
    const query = getQuery(event);
    
    const params = {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      name: query.name as string || '',
      employeeId: query.employeeId as string || '',
      status: query.status as string || ''
    };

    console.log('[Controller] 조회 파라미터:', params);

    const [employees, total] = await Promise.all([
      HRModel.getEmployees(params),
      HRModel.getTotalEmployees(params)
    ]);

    console.log('[Controller] 조회 결과:', { total: total[0].total, count: employees.length });

    return {
      employees,
      total: total[0].total
    };
  } catch (error) {
    console.error('[Controller] 사원 목록 조회 오류:', error);
    throw createError({
      statusCode: 500,
      message: '사원 목록 조회 중 오류가 발생했습니다.'
    });
  }
};

// 사원 등록
export const createEmployee = async (event: H3Event) => {
  try {
    console.log('[Controller] 사원 등록 시작');
    const body = await readBody(event);
    
    // 필수 필드 검증
    const requiredFields = [
      'EMPLOYEE_ID',
      'FULL_NAME',
      'EMAIL',
      'PHONE',
      'HIRE_DATE',
      'JOB_ID',
      'DEPARTMENT_ID'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        throw createError({
          statusCode: 400,
          message: `${field} 필드는 필수입니다.`
        });
      }
    }

    console.log('[Controller] 사원 등록 데이터:', body);

    // 사원번호 중복 체크
    const existing = await HRModel.getEmployeeById(body.EMPLOYEE_ID);
    if (existing.length > 0) {
      throw createError({
        statusCode: 400,
        message: '이미 존재하는 사원번호입니다.'
      });
    }

    // 사원 등록 처리
    await HRModel.createEmployee(body);
    
    // 연차 정보 초기화
    await HRModel.initializeLeaveBalance({
      EMPLOYEE_ID: body.EMPLOYEE_ID,
      YEAR: new Date().getFullYear(),
      TOTAL_DAYS: 15,
      USED_DAYS: 0,
      REMAINING_DAYS: 15
    });

    return {
      message: '사원이 등록되었습니다.'
    };
  } catch (error) {
    console.error('[Controller] 사원 등록 오류:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '사원 등록 중 오류가 발생했습니다.'
    });
  }
};
/**
 * 사원 상세 조회
 */
export const getEmployeeById = async (event: H3Event) => {
  try {
    console.log('[Controller] 사원 상세 조회 시작');
    const employeeId = event.context.params.id;

    if (!employeeId) {
      throw createError({
        statusCode: 400,
        message: '사원번호가 필요합니다.'
      });
    }

    console.log('[Controller] 조회할 사원번호:', employeeId);
    const employee = await HRModel.getEmployeeById(employeeId);

    if (!employee || employee.length === 0) {
      throw createError({
        statusCode: 404,
        message: '사원을 찾을 수 없습니다.'
      });
    }

    console.log('[Controller] 조회 결과:', employee[0]);
    return employee[0];
  } catch (error) {
    console.error('[Controller] 사원 상세 조회 오류:', error);
    throw error;
  }
};

/**
 * 사원 정보 수정
 */
export const updateEmployee = async (event: H3Event) => {
  try {
    console.log('[Controller] 사원 정보 수정 시작');
    const employeeId = event.context.params.id;
    const body = await readBody(event);

    if (!employeeId) {
      throw createError({
        statusCode: 400,
        message: '사원번호가 필요합니다.'
      });
    }

    // 필수 필드 검증
    const requiredFields = [
      'FULL_NAME',
      'EMAIL',
      'PHONE',
      'HIRE_DATE',
      'JOB_ID',
      'DEPARTMENT_ID',
      'EMPLOYEES_STATUS'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        throw createError({
          statusCode: 400,
          message: `${field} 필드는 필수입니다.`
        });
      }
    }

    console.log('[Controller] 수정할 데이터:', body);

    // 사원 정보 업데이트
    await HRModel.updateEmployee(employeeId, body);

    // 연차 정보 업데이트 (총 연차일수가 변경된 경우)
    if (body.TOTAL_DAYS !== undefined) {
      await HRModel.updateLeaveBalance(employeeId, {
        TOTAL_DAYS: body.TOTAL_DAYS
      });
    }

    return {
      message: '사원 정보가 수정되었습니다.'
    };
  } catch (error) {
    console.error('[Controller] 사원 정보 수정 오류:', error);
    throw error;
  }
};
// 사원 상태 업데이트
export const updateEmployeeStatus = async (event: H3Event) => {
  try {
    console.log('사원 상태 업데이트 컨트롤러 시작');
    const employeeId = event.context.params.id;
    const body = await readBody(event);

    if (!employeeId || !body.status) {
      throw createError({
        statusCode: 400,
        message: '필수 입력 항목이 누락되었습니다.'
      });
    }

    console.log('상태 업데이트:', { employeeId, status: body.status });

    await HRModel.updateEmployeeStatus(employeeId, body.status);

    return {
      message: '사원 상태가 업데이트되었습니다.'
    };
  } catch (error) {
    console.error('사원 상태 업데이트 오류:', error);
    throw createError({
      statusCode: 500,
      message: '사원 상태 업데이트 중 오류가 발생했습니다.'
    });
  }
};

// 관리자 목록 조회
export const getManagers = async (event: H3Event) => {
  try {
    console.log('관리자 목록 조회 컨트롤러 시작');
    const managers = await HRModel.getManagers();
    console.log('관리자 수:', managers.length);
    return managers;
  } catch (error) {
    console.error('관리자 목록 조회 오류:', error);
    throw createError({
      statusCode: 500,
      message: '관리자 목록 조회 중 오류가 발생했습니다.'
    });
  }
};

/**
 * 부서/직급 관리 컨트롤러
 */
// 부서 목록 조회
export const getDepartments = async (event: H3Event) => {
  try {
    console.log('부서 목록 조회 컨트롤러 시작');
    const departments = await HRModel.getDepartments();
    console.log('부서 수:', departments.length);
    return departments;
  } catch (error) {
    console.error('부서 목록 조회 오류:', error);
    throw createError({
      statusCode: 500,
      message: '부서 목록 조회 중 오류가 발생했습니다.'
    });
  }
};

// 직급 목록 조회
export const getJobs = async (event: H3Event) => {
  try {
    console.log('직급 목록 조회 컨트롤러 시작');
    const jobs = await HRModel.getJobs();
    console.log('직급 수:', jobs.length);
    return jobs;
  } catch (error) {
    console.error('직급 목록 조회 오류:', error);
    throw createError({
      statusCode: 500,
      message: '직급 목록 조회 중 오류가 발생했습니다.'
    });
  }
};
// 부서 추가
export const createDepartment = async (event: H3Event) => {
  try {
    console.log('[Controller] 부서 추가 시작');
    const body = await readBody(event);
    
    // 필수 필드 검증
    const requiredFields = ['DEPARTMENT_NAME', 'LOCATION'];
    for (const field of requiredFields) {
      if (!body[field]) {
        throw createError({
          statusCode: 400,
          message: `${field} 필드는 필수입니다.`
        });
      }
    }

    const result = await HRModel.createDepartment(body);
    console.log('[Controller] 부서 추가 완료:', result);
    return result;
  } catch (error) {
    console.error('[Controller] 부서 추가 오류:', error);
    throw createError({
      statusCode: 500,
      message: '부서 추가 중 오류가 발생했습니다.'
    });
  }
};

// 부서 수정
export const updateDepartment = async (event: H3Event) => {
  try {
    console.log('[Controller] 부서 수정 시작');
    const body = await readBody(event);
    const id = event.context.params?.id;
    
    if (!id) {
      throw createError({
        statusCode: 400,
        message: '부서 ID가 필요합니다.'
      });
    }

    const result = await HRModel.updateDepartment(id, body);
    console.log('[Controller] 부서 수정 완료:', result);
    return result;
  } catch (error) {
    console.error('[Controller] 부서 수정 오류:', error);
    throw createError({
      statusCode: 500,
      message: '부서 수정 중 오류가 발생했습니다.'
    });
  }
};

// 직급 추가
export const createJob = async (event: H3Event) => {
  try {
    console.log('[Controller] 직급 추가 시작');
    const body = await readBody(event);
    
    // 필수 필드 검증
    const requiredFields = ['JOB_TITLE', 'MIN_SALARY', 'MAX_SALARY'];
    for (const field of requiredFields) {
      if (!body[field]) {
        throw createError({
          statusCode: 400,
          message: `${field} 필드는 필수입니다.`
        });
      }
    }

    const result = await HRModel.createJob(body);
    console.log('[Controller] 직급 추가 완료:', result);
    return result;
  } catch (error) {
    console.error('[Controller] 직급 추가 오류:', error);
    throw createError({
      statusCode: 500,
      message: '직급 추가 중 오류가 발생했습니다.'
    });
  }
};

// 직급 수정
export const updateJob = async (event: H3Event) => {
  try {
    console.log('[Controller] 직급 수정 시작');
    const body = await readBody(event);
    const id = event.context.params?.id;
    
    if (!id) {
      throw createError({
        statusCode: 400,
        message: '직급 ID가 필요합니다.'
      });
    }

    const result = await HRModel.updateJob(id, body);
    console.log('[Controller] 직급 수정 완료:', result);
    return result;
  } catch (error) {
    console.error('[Controller] 직급 수정 오류:', error);
    throw createError({
      statusCode: 500,
      message: '직급 수정 중 오류가 발생했습니다.'
    });
  }
};

/**
 * 연차 관리 컨트롤러
 */
// 연차 신청
export const requestLeave = async (event: H3Event) => {
  try {
    console.log('[Controller] 연차 신청 시작');
    const body = await readBody(event);

    // 필수 필드 검증
    const requiredFields = [
      'EMPLOYEE_ID',
      'START_DATE',
      'END_DATE',
      'LEAVE_TYPE',
      'DAYS_COUNT',
      'REASON'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        throw createError({
          statusCode: 400,
          message: `${field} 필드는 필수입니다.`
        });
      }
    }

    // 연차 잔여일수 확인
    const leaveBalance = await HRModel.getLeaveBalance(body.EMPLOYEE_ID);
    if (!leaveBalance || body.DAYS_COUNT > leaveBalance.REMAINING_DAYS) {
      throw createError({
        statusCode: 400,
        message: '잔여 연차가 부족합니다.'
      });
    }

    console.log('[Controller] 연차 신청 데이터:', body);

    // 연차 신청 처리
    await HRModel.requestLeave({
      ...body,
      STATUS: '신청',
      CREATED_AT: new Date()
    });

    // 연차 잔여일수 업데이트
    await HRModel.updateLeaveBalance(body.EMPLOYEE_ID, body.DAYS_COUNT);

    return {
      message: '연차가 신청되었습니다.'
    };
  } catch (error) {
    console.error('[Controller] 연차 신청 오류:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '연차 신청 중 오류가 발생했습니다.'
    });
  }
};

// 연차 상태 업데이트
export const updateLeaveStatus = async (event: H3Event) => {
  try {
    console.log('[Controller] 연차 상태 업데이트 시작');
    const leaveId = event.context.params.id;
    const body = await readBody(event);

    if (!leaveId || !body.status) {
      throw createError({
        statusCode: 400,
        message: '필수 입력 항목이 누락되었습니다.'
      });
    }

    console.log('[Controller] 연차 상태 업데이트:', { leaveId, status: body.status });

    await HRModel.updateLeaveStatus(Number(leaveId), body.status, body.approvedBy);

    return {
      message: '연차 상태가 업데이트되었습니다.'
    };
  } catch (error) {
    console.error('[Controller] 연차 상태 업데이트 오류:', error);
    throw createError({
      statusCode: 500,
      message: '연차 상태 업데이트 중 오류가 발생했습니다.'
    });
  }
};

// 연차 잔여일수 조회
export const getLeaveBalance = async (event: H3Event) => {
  try {
    console.log('[Controller] 연차 잔여일수 조회 시작');
    const employeeId = event.context.params.employeeId;

    if (!employeeId) {
      throw createError({
        statusCode: 400,
        message: '사원번호가 필요합니다.'
      });
    }

    const balance = await HRModel.getLeaveBalance(employeeId);
    console.log('[Controller] 연차 잔여일수:', balance);

    return balance;
  } catch (error) {
    console.error('[Controller] 연차 잔여일수 조회 오류:', error);
    throw createError({
      statusCode: 500,
      message: '연차 잔여일수 조회 중 오류가 발생했습니다.'
    });
  }
};
//연차 초기화
export const initializeLeaveBalance = async (data: any) => {
  console.log('[Controller] 연차 초기화 시작:', data);
  try {
    await HRModel.initializeLeaveBalance(data);
    return { message: '연차가 성공적으로 초기화되었습니다.' };
  } catch (error) {
    console.error('[Controller] 연차 초기화 오류:', error);
    throw error;
  }
};
// 직원 목록 조회
export const getEmployeesList = async () => {
  console.log('[Controller] 직원 목록 조회 시작');
  try {
    const result = await HRModel.getEmployeesList();
    return result;
  } catch (error) {
    console.error('[Controller] 직원 목록 조회 오류:', error);
    throw error;
  }
};

// 전체 연차 정보 조회
// 전체 연차 정보 조회
// export const getLeaveBalances = async () => {
//   try {
//     console.log('[Model] 전체 연차 정보 조회 쿼리 시작');
//     const query = `
//       SELECT 
//         lb.EMPLOYEE_ID,
//         e.FULL_NAME as NAME,
//         YEAR(CURRENT_DATE()) as YEAR,
//         lb.TOTAL_DAYS,
//         lb.USED_DAYS,
//         lb.REMAINING_DAYS
//       FROM LEAVE_BALANCE lb
//       JOIN EMPLOYEES e ON lb.EMPLOYEE_ID = e.EMPLOYEE_ID
//       WHERE e.EMPLOYEES_STATUS = '재직'
//       ORDER BY e.FULL_NAME, YEAR DESC
//     `;

//     console.log('[Model] 실행 쿼리:', query);
//     return await sql({ query });
//   } catch (error) {
//     console.error('[Model] 전체 연차 정보 조회 쿼리 오류:', error);
//     throw error;
//   }
// };
// 전체 연차 정보 조회
export const getLeaveBalances = async () => {
  console.log('[Controller] 전체 연차 정보 조회 시작');
  try {
    const result = await HRModel.getLeaveBalances();
    return result;
  } catch (error) {
    console.error('[Controller] 전체 연차 정보 조회 오류:', error);
    throw error;
  }
};