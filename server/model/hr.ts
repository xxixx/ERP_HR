import { sql } from '~/server/db';

/**
 * 사원 관리 모델
 */
// 사원 목록 조회
export const getEmployees = async (params: any) => {
    try {
      console.log('[Model] 사원 목록 조회 쿼리 시작');
      const { page, limit, name, employeeId, status } = params;
      const offset = (page - 1) * limit;
  
      let query = `
        SELECT 
          e.*,
          d.DEPARTMENT_NAME,
          j.JOB_TITLE,
          lb.TOTAL_DAYS,
          lb.USED_DAYS,
          lb.REMAINING_DAYS,
          DATE_FORMAT(e.HIRE_DATE, '%Y-%m-%d') as HIRE_DATE
        FROM EMPLOYEES e
        LEFT JOIN DEPARTMENTS d ON e.DEPARTMENT_ID = d.DEPARTMENT_ID
        LEFT JOIN JOBS j ON e.JOB_ID = j.JOB_ID
        LEFT JOIN LEAVE_BALANCE lb ON e.EMPLOYEE_ID = lb.EMPLOYEE_ID 
          AND lb.YEAR = YEAR(CURRENT_DATE())
        WHERE 1=1
      `;
  
      const values: any[] = [];
  
      if (name) {
        query += ` AND e.FULL_NAME LIKE ?`;
        values.push(`%${name}%`);
      }
  
      if (employeeId) {
        query += ` AND e.EMPLOYEE_ID LIKE ?`;
        values.push(`%${employeeId}%`);
      }
  
      if (status) {
        query += ` AND e.EMPLOYEES_STATUS = ?`;
        values.push(status);
      }
  
      query += ` ORDER BY e.EMPLOYEE_ID LIMIT ? OFFSET ?`;
      values.push(Number(limit), Number(offset));
  
      console.log('[Model] 실행 쿼리:', query);
      console.log('[Model] 쿼리 파라미터:', values);
  
      const result = await sql({ query, values });
      return result;
    } catch (error) {
      console.error('[Model] 사원 목록 조회 쿼리 오류:', error);
      throw error;
    }
  };
  
  // 전체 사원 수 조회
  export const getTotalEmployees = async (params: any) => {
    try {
      console.log('[Model] 전체 사원 수 조회 쿼리 시작');
      const { name, employeeId, status } = params;
  
      let query = `
        SELECT COUNT(*) as total 
        FROM EMPLOYEES e
        WHERE 1=1
      `;
  
      const values: any[] = [];
  
      if (name) {
        query += ` AND e.FULL_NAME LIKE ?`;
        values.push(`%${name}%`);
      }
  
      if (employeeId) {
        query += ` AND e.EMPLOYEE_ID LIKE ?`;
        values.push(`%${employeeId}%`);
      }
  
      if (status) {
        query += ` AND e.EMPLOYEES_STATUS = ?`;
        values.push(status);
      }
  
      console.log('[Model] 실행 쿼리:', query);
      console.log('[Model] 쿼리 파라미터:', values);
  
      const result = await sql({ query, values });
      return result;
    } catch (error) {
      console.error('[Model] 전체 사원 수 조회 쿼리 오류:', error);
      throw error;
    }
  };
  
  // 사원 정보 조회
//   export const getEmployeeById = async (employeeId: string) => {
//     try {
//       console.log('[Model] 사원 정보 조회 쿼리 시작:', employeeId);
//       const query = `
//         SELECT * FROM EMPLOYEES WHERE EMPLOYEE_ID = ?
//       `;
//       const result = await sql({ query, values: [employeeId] });
//       return result;
//     } catch (error) {
//       console.error('[Model] 사원 정보 조회 쿼리 오류:', error);
//       throw error;
//     }
//   };
  
  // 사원 등록
  export const createEmployee = async (employee: any) => {
    try {
      console.log('[Model] 사원 등록 쿼리 시작');
      const query = `
        INSERT INTO EMPLOYEES (
          EMPLOYEE_ID,
          FULL_NAME,
          EMAIL,
          PHONE,
          HIRE_DATE,
          JOB_ID,
          SALARY,
          DEPARTMENT_ID,
          MANAGER_ID,
          EMPLOYEES_STATUS
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      const values = [
        employee.EMPLOYEE_ID,
        employee.FULL_NAME,
        employee.EMAIL,
        employee.PHONE,
        employee.HIRE_DATE,
        employee.JOB_ID,
        employee.SALARY,
        employee.DEPARTMENT_ID,
        employee.MANAGER_ID || null,
        employee.EMPLOYEES_STATUS || '재직'
      ];
  
      console.log('[Model] 실행 쿼리:', query);
      console.log('[Model] 쿼리 파라미터:', values);
  
      await sql({ query, values });
    } catch (error) {
      console.error('[Model] 사원 등록 쿼리 오류:', error);
      throw error;
    }
  };
  /**
 * 사원 상세 정보 조회
 */
export const getEmployeeById = async (employeeId: string) => {
    try {
      console.log('[Model] 사원 상세 정보 조회 쿼리 시작');
      const query = `
        SELECT 
          e.*,
          d.DEPARTMENT_NAME,
          j.JOB_TITLE,
          m.FULL_NAME as MANAGER_NAME,
          lb.TOTAL_DAYS,
          lb.USED_DAYS,
          lb.REMAINING_DAYS,
          DATE_FORMAT(e.HIRE_DATE, '%Y-%m-%d') as HIRE_DATE
        FROM EMPLOYEES e
        LEFT JOIN DEPARTMENTS d ON e.DEPARTMENT_ID = d.DEPARTMENT_ID
        LEFT JOIN JOBS j ON e.JOB_ID = j.JOB_ID
        LEFT JOIN EMPLOYEES m ON e.MANAGER_ID = m.EMPLOYEE_ID
        LEFT JOIN LEAVE_BALANCE lb ON e.EMPLOYEE_ID = lb.EMPLOYEE_ID 
          AND lb.YEAR = YEAR(CURRENT_DATE())
        WHERE e.EMPLOYEE_ID = ?
      `;
  
      console.log('[Model] 실행 쿼리:', query);
      console.log('[Model] 쿼리 파라미터:', [employeeId]);
  
      const result = await sql({ query, values: [employeeId] });
      return result;
    } catch (error) {
      console.error('[Model] 사원 상세 정보 조회 쿼리 오류:', error);
      throw error;
    }
  };
  
  /**
   * 사원 정보 수정
   */
  export const updateEmployee = async (employeeId: string, employee: any) => {
    try {
      console.log('[Model] 사원 정보 수정 쿼리 시작');
      console.log('[Model] 수정할 사원:', employeeId);
      console.log('[Model] 수정할 데이터:', employee);
  
      const query = `
        UPDATE EMPLOYEES
        SET
          FULL_NAME = ?,
          EMAIL = ?,
          PHONE = ?,
          HIRE_DATE = ?,
          JOB_ID = ?,
          SALARY = ?,
          DEPARTMENT_ID = ?,
          MANAGER_ID = ?,
          EMPLOYEES_STATUS = ?,
          UPDATED_AT = CURRENT_TIMESTAMP
        WHERE EMPLOYEE_ID = ?
      `;
  
      const values = [
        employee.FULL_NAME,
        employee.EMAIL,
        employee.PHONE,
        employee.HIRE_DATE,
        employee.JOB_ID,
        employee.SALARY,
        employee.DEPARTMENT_ID,
        employee.MANAGER_ID || null,
        employee.EMPLOYEES_STATUS,
        employeeId
      ];
  
      console.log('[Model] 실행 쿼리:', query);
      console.log('[Model] 쿼리 파라미터:', values);
  
      const result = await sql({ query, values });
      return result;
    } catch (error) {
      console.error('[Model] 사원 정보 수정 쿼리 오류:', error);
      throw error;
    }
  };

// 사원 상태 업데이트
export const updateEmployeeStatus = async (employeeId: string, status: string) => {
  try {
    console.log('사원 상태 업데이트 쿼리 시작');
    const query = `
      UPDATE EMPLOYEES 
      SET EMPLOYEES_STATUS = ?
      WHERE EMPLOYEE_ID = ?
    `;

    console.log('실행 쿼리:', query);
    console.log('쿼리 파라미터:', [status, employeeId]);

    await sql({ query, values: [status, employeeId] });
  } catch (error) {
    console.error('사원 상태 업데이트 쿼리 오류:', error);
    throw error;
  }
};

// 관리자 목록 조회
export const getManagers = async () => {
  try {
    console.log('관리자 목록 조회 쿼리 시작');
    const query = `
      SELECT EMPLOYEE_ID, FULL_NAME
      FROM EMPLOYEES
      WHERE EMPLOYEES_STATUS = '재직'
      ORDER BY FULL_NAME
    `;
    const result = await sql({ query });
    return result;
  } catch (error) {
    console.error('관리자 목록 조회 쿼리 오류:', error);
    throw error;
  }
};

/**
 * 부서/직급 관리 모델
 */
// 부서 목록 조회
export const getDepartments = async () => {
  try {
    console.log('부서 목록 조회 쿼리 시작');
    const query = `
      SELECT * FROM DEPARTMENTS ORDER BY DEPARTMENT_NAME
    `;
    const result = await sql({ query });
    return result;
  } catch (error) {
    console.error('부서 목록 조회 쿼리 오류:', error);
    throw error;
  }
};

// 직급 목록 조회
export const getJobs = async () => {
  try {
    console.log('직급 목록 조회 쿼리 시작');
    const query = `
      SELECT * FROM JOBS ORDER BY JOB_TITLE
    `;
    const result = await sql({ query });
    return result;
  } catch (error) {
    console.error('직급 목록 조회 쿼리 오류:', error);
    throw error;
  }
};
// 부서 추가
export const createDepartment = async (department: any) => {
  try {
    console.log('[Model] 부서 추가 쿼리 시작');
    const query = `
      INSERT INTO DEPARTMENTS (
        DEPARTMENT_NAME,
        MANAGER_ID,
        LOCATION,
        CREATED_AT,
        UPDATED_AT
      ) VALUES (?, ?, ?, NOW(), NOW())
    `;
    const values = [
      department.DEPARTMENT_NAME,
      department.MANAGER_ID || null,
      department.LOCATION
    ];

    console.log('[Model] 실행 쿼리:', query);
    console.log('[Model] 쿼리 파라미터:', values);

    const result = await sql({ query, values });
    return result;
  } catch (error) {
    console.error('[Model] 부서 추가 쿼리 오류:', error);
    throw error;
  }
};

// 부서 수정
export const updateDepartment = async (id: string, department: any) => {
  try {
    console.log('[Model] 부서 수정 쿼리 시작');
    const query = `
      UPDATE DEPARTMENTS
      SET
        DEPARTMENT_NAME = ?,
        MANAGER_ID = ?,
        LOCATION = ?,
        UPDATED_AT = NOW()
      WHERE DEPARTMENT_ID = ?
    `;
    const values = [
      department.DEPARTMENT_NAME,
      department.MANAGER_ID || null,
      department.LOCATION,
      id
    ];

    console.log('[Model] 실행 쿼리:', query);
    console.log('[Model] 쿼리 파라미터:', values);

    const result = await sql({ query, values });
    return result;
  } catch (error) {
    console.error('[Model] 부서 수정 쿼리 오류:', error);
    throw error;
  }
};

// 직급 추가
export const createJob = async (job: any) => {
  try {
    console.log('[Model] 직급 추가 쿼리 시작');
    const query = `
      INSERT INTO JOBS (
        JOB_TITLE,
        MIN_SALARY,
        MAX_SALARY,
        CREATED_AT,
        UPDATED_AT
      ) VALUES (?, ?, ?, NOW(), NOW())
    `;
    const values = [
      job.JOB_TITLE,
      job.MIN_SALARY,
      job.MAX_SALARY
    ];

    console.log('[Model] 실행 쿼리:', query);
    console.log('[Model] 쿼리 파라미터:', values);

    const result = await sql({ query, values });
    return result;
  } catch (error) {
    console.error('[Model] 직급 추가 쿼리 오류:', error);
    throw error;
  }
};

// 직급 수정
export const updateJob = async (id: string, job: any) => {
  try {
    console.log('[Model] 직급 수정 쿼리 시작');
    const query = `
      UPDATE JOBS
      SET
        JOB_TITLE = ?,
        MIN_SALARY = ?,
        MAX_SALARY = ?,
        UPDATED_AT = NOW()
      WHERE JOB_ID = ?
    `;
    const values = [
      job.JOB_TITLE,
      job.MIN_SALARY,
      job.MAX_SALARY,
      id
    ];

    console.log('[Model] 실행 쿼리:', query);
    console.log('[Model] 쿼리 파라미터:', values);

    const result = await sql({ query, values });
    return result;
  } catch (error) {
    console.error('[Model] 직급 수정 쿼리 오류:', error);
    throw error;
  }
};
/**
 * 연차 관리 모델
 */
// 연차 잔여일수 조회
export const getLeaveBalance = async (employeeId: string) => {
    try {
      console.log('[Model] 연차 잔여일수 조회 쿼리 시작:', employeeId);
      const query = `
        SELECT *
        FROM LEAVE_BALANCE
        WHERE EMPLOYEE_ID = ?
        AND YEAR = YEAR(CURRENT_DATE())
      `;
  
      console.log('[Model] 실행 쿼리:', query);
      console.log('[Model] 쿼리 파라미터:', [employeeId]);
  
      const result = await sql({ query, values: [employeeId] });
      return result[0];
    } catch (error) {
      console.error('[Model] 연차 잔여일수 조회 쿼리 오류:', error);
      throw error;
    }
  };
  
  // 연차 잔여일수 초기화
  export const initializeLeaveBalance = async (data: any) => {
    try {
      console.log('[Model] 연차 잔여일수 초기화 쿼리 시작');
      const query = `
        INSERT INTO LEAVE_BALANCE (
          EMPLOYEE_ID,
          YEAR,
          TOTAL_DAYS,
          USED_DAYS,
          REMAINING_DAYS,
          LAST_UPDATED
        ) VALUES (?, ?, ?, ?, ?, CURRENT_DATE)
      `;
  
      const values = [
        data.EMPLOYEE_ID,
        data.YEAR,
        data.TOTAL_DAYS,
        data.USED_DAYS,
        data.REMAINING_DAYS
      ];
  
      console.log('[Model] 실행 쿼리:', query);
      console.log('[Model] 쿼리 파라미터:', values);
  
      await sql({ query, values });
    } catch (error) {
      console.error('[Model] 연차 잔여일수 초기화 쿼리 오류:', error);
      throw error;
    }
  };
  
  // 연차 신청
  export const requestLeave = async (leaveData: any) => {
    try {
      console.log('[Model] 연차 신청 쿼리 시작');
      const query = `
        INSERT INTO LEAVE_HISTORY (
          EMPLOYEE_ID,
          START_DATE,
          END_DATE,
          DAYS_COUNT,
          LEAVE_TYPE,
          STATUS,
          REASON,
          CREATED_AT
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      const values = [
        leaveData.EMPLOYEE_ID,
        leaveData.START_DATE,
        leaveData.END_DATE,
        leaveData.DAYS_COUNT,
        leaveData.LEAVE_TYPE,
        leaveData.STATUS,
        leaveData.REASON,
        leaveData.CREATED_AT
      ];
  
      console.log('[Model] 실행 쿼리:', query);
      console.log('[Model] 쿼리 파라미터:', values);
  
      await sql({ query, values });
    } catch (error) {
      console.error('[Model] 연차 신청 쿼리 오류:', error);
      throw error;
    }
  };
  
  // 연차 잔여일수 업데이트
  export const updateLeaveBalance = async (
    employeeId: string,
    daysCount: number
  ): Promise<void> => {
    try {
      console.log('[Model] 연차 잔여일수 업데이트 쿼리 시작');
      const query = `
        UPDATE LEAVE_BALANCE lb,
               (SELECT EMPLOYEE_ID, USED_DAYS + ? as new_used_days 
                FROM LEAVE_BALANCE 
                WHERE EMPLOYEE_ID = ?) calc
        SET 
            lb.USED_DAYS = calc.new_used_days,
            lb.REMAINING_DAYS = lb.TOTAL_DAYS - calc.new_used_days,
            lb.LAST_UPDATED = CURRENT_DATE
        WHERE lb.EMPLOYEE_ID = ?
        AND lb.YEAR = YEAR(CURRENT_DATE())
      `;
  
      console.log('[Model] 실행 쿼리:', query);
      const params = [daysCount, employeeId, employeeId];
      console.log('[Model] 쿼리 파라미터:', params);
  
      await sql({
        query,
        values: params,
      });
  
      console.log('[Model] 연차 잔여일수 업데이트 완료');
    } catch (error) {
      console.error('[Model] 연차 잔여일수 업데이트 쿼리 오류:', error);
      throw error;
    }
  };
  
  // 연차 상태 업데이트
  export const updateLeaveStatus = async (leaveId: number, status: string, approvedBy: string = null) => {
    try {
      console.log('[Model] 연차 상태 업데이트 쿼리 시작');
      const query = `
        UPDATE LEAVE_HISTORY
        SET STATUS = ?,
            APPROVED_BY = ?,
            APPROVED_DATE = CURRENT_TIMESTAMP
        WHERE LEAVE_ID = ?
      `;
  
      console.log('[Model] 실행 쿼리:', query);
      console.log('[Model] 쿼리 파라미터:', [status, approvedBy, leaveId]);
  
      await sql({ query, values: [status, approvedBy, leaveId] });
    } catch (error) {
      console.error('[Model] 연차 상태 업데이트 쿼리 오류:', error);
      throw error;
    }
  };
  // 직원 목록 조회
export const getEmployeesList = async () => {
  try {
    console.log('[Model] 직원 목록 조회 쿼리 시작');
    const query = `
     SELECT 
          e.*,
          d.DEPARTMENT_NAME,
          j.JOB_TITLE,
          lb.TOTAL_DAYS,
          lb.USED_DAYS,
          lb.REMAINING_DAYS,
          DATE_FORMAT(e.HIRE_DATE, '%Y-%m-%d') as HIRE_DATE
        FROM EMPLOYEES e
        LEFT JOIN DEPARTMENTS d ON e.DEPARTMENT_ID = d.DEPARTMENT_ID
        LEFT JOIN JOBS j ON e.JOB_ID = j.JOB_ID
        LEFT JOIN LEAVE_BALANCE lb ON e.EMPLOYEE_ID = lb.EMPLOYEE_ID 
          AND lb.YEAR = YEAR(CURRENT_DATE())
        WHERE 1=1
    `;

    console.log('[Model] 실행 쿼리:', query);
    return await sql({ query });
  } catch (error) {
    console.error('[Model] 직원 목록 조회 쿼리 오류:', error);
    throw error;
  }
};

// 전체 연차 정보 조회
// export const getLeaveBalances = async () => {
//   try {
//     console.log('[Model] 전체 연차 정보 조회 쿼리 시작');
//     const query = `
//       SELECT 
//         lb.*,
//         e.NAME
//       FROM LEAVE_BALANCE lb
//       JOIN EMPLOYEE e ON lb.EMPLOYEE_ID = e.EMPLOYEE_ID
//       WHERE e.ACTIVE_YN = 'Y'
//       ORDER BY e.NAME, lb.YEAR DESC
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
  try {
    console.log('[Model] 전체 연차 정보 조회 쿼리 시작');
    const query = `
      SELECT 
        lb.EMPLOYEE_ID,
        e.FULL_NAME as NAME,
        YEAR(CURRENT_DATE()) as YEAR,
        lb.TOTAL_DAYS,
        lb.USED_DAYS,
        lb.REMAINING_DAYS
      FROM LEAVE_BALANCE lb
      JOIN EMPLOYEES e ON lb.EMPLOYEE_ID = e.EMPLOYEE_ID
      WHERE e.EMPLOYEES_STATUS = '재직'
      ORDER BY e.FULL_NAME, YEAR DESC
    `;

    console.log('[Model] 실행 쿼리:', query);
    return await sql({ query });
  } catch (error) {
    console.error('[Model] 전체 연차 정보 조회 쿼리 오류:', error);
    throw error;
  }
};