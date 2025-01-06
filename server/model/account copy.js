import pool from '../database/database.js'; // 데이터베이스 연결
import bcrypt from 'bcrypt'; // bcrypt 모듈 가져오기

// 비밀번호 해시 생성 함수
export const hashPassword = async (password) => {
  const saltRounds = 10; // 해시 생성 시 사용할 솔트 라운드 수
  return await bcrypt.hash(password, saltRounds);
};

// 사용자 찾기
export const findUser = async (EMAIL) => {
  console.log('findUser 호출됨, EMAIL:', EMAIL); // 입력값 로그
  const [rows] = await pool.query('SELECT * FROM ACCOUNT WHERE EMAIL = ?', [EMAIL]);
  console.log('쿼리 실행됨: SELECT * FROM ACCOUNT WHERE EMAIL = ?', [EMAIL]); // 쿼리 로그
  console.log('쿼리 결과:', rows); // 쿼리 결과 로그
  return rows[0]; // 첫 번째 사용자 반환
};

// 사용자 등록 함수
export const createUser = async (EMAIL, NAME,PASSWORD) => {
  const hashedPassword = await hashPassword(PASSWORD);
  try {
    // 데이터베이스에 사용자 저장
    await pool.query('INSERT INTO ACCOUNT (EMAIL, NAME,PASSWORD) VALUES (?,?, ?)', [EMAIL,NAME, hashedPassword]);
    console.log('사용자 등록 성공:', EMAIL);
    return { success: true, message: '사용자 등록 성공' };
  } catch (error) {
    console.error('사용자 등록 중 오류 발생:', error);
    return { success: false, message: '사용자 중복 등록 실패' };
  }
};

// 비밀번호 업데이트 함수
export const updatePassword = async (EMAIL, new_password) => {
  console.log('비밀번호 업데이트 요청, 이메일:', EMAIL);
  console.log('새 비밀번호:', new_password); // 비밀번호
  try {
    const hashedPassword = await hashPassword(new_password); // 새 비밀번호 해시 생성
    console.log('비밀번호 업데이트 요청:', { EMAIL, new_password }); // 입력값 로그
    console.log('쿼리 실행됨: UPDATE ACCOUNT SET PASSWORD = ? WHERE EMAIL = ?', [hashedPassword, EMAIL]); // 쿼리 로그

    // 비밀번호 업데이트
    await pool.query('UPDATE ACCOUNT SET PASSWORD = ? WHERE EMAIL = ?', [hashedPassword, EMAIL]);
    console.log('비밀번호가 해시로 업데이트되었습니다.');
    return { success: true, message: '비밀번호가 성공적으로 업데이트되었습니다.' };
  } catch (error) {
    console.error('비밀번호 업데이트 중 오류 발생:', error);
    return { success: false, message: '비밀번호 업데이트 실패' };
  }
};
// 기존 비밀번호를 해시로 업데이트하는 함수
export const updatePasswordToHash = async (EMAIL, new_password) => {
  try {
    console.log('새 비밀번호:', new_password); // 비밀번호가 올바르게 전달되는지 확인
    if (!new_password) {
      throw new Error('새 비밀번호가 제공되지 않았습니다.'); // 새 비밀번호가 없을 경우 오류 발생
    }

    // 기존 비밀번호 가져오기
    const [rows] = await pool.query('SELECT password FROM ACCOUNT WHERE EMAIL = ?', [EMAIL]);
    if (rows.length === 0) {
      console.log('사용자를 찾을 수 없습니다.');
      return { success: false, message: '사용자를 찾을 수 없습니다.' };
    }

    // 새 비밀번호 해시 생성
    const hashedPassword = await hashPassword(new_password); // 새 비밀번호 해시 생성

    // 비밀번호 업데이트
    await pool.query('UPDATE ACCOUNT SET password = ? WHERE EMAIL = ?', [hashedPassword, EMAIL]);
    console.log('비밀번호가 해시로 업데이트되었습니다.');
    return { success: true, message: '비밀번호가 해시로 업데이트되었습니다.' };
  } catch (error) {
    console.error('비밀번호 업데이트 중 오류 발생:', error);
    return { success: false, message: '비밀번호 업데이트 실패' };
  }
};
//중복이메일 검사
export const findUserByEmail = async (EMAIL) => {
  const [rows] = await pool.query('SELECT * FROM ACCOUNT WHERE EMAIL = ?', [EMAIL]);
  return rows[0]; // 첫 번째 사용자 반환
};
export const getAccounts1 = async () => {
  const [rows] = await pool.query('SELECT NO, EMAIL, NAME,ROLE,POSITION,CREATED_DATE, ACCOUNT_STATUS, LEVEL FROM ACCOUNT ');
  return rows; // 첫 번째 사용자 반환
};
export const getAccounts = async () => {
  const [rows] = await pool.query('SELECT NO, EMAIL, NAME, ROLE,POSITION,CREATE_DATE,ACCOUNT_STATE,LEVEL FROM ACCOUNT ');
  return rows; // 첫 번째 사용자 반환
};

// 계정 상세 정보 조회
export const getAccountDetail = async (NO) => {
  try {
    const [rows] = await pool.query(
      'SELECT NO, EMAIL, ROLE, POSITION, CREATE_DATE, ACCOUNT_STATE, LEVEL FROM ACCOUNT WHERE NO = ?',
      [NO]
    );
    console.log('Account detail query result:', rows[0]);
    return rows[0];
  } catch (error) {
    console.error('Error in getAccountDetail:', error);
    throw error;
  }
};

// 계정 정보 수정
export const updateAccount = async (NO, data) => {
  try {
    // 테이블 구조 확인
    // const [columns] = await pool.query('SHOW COLUMNS FROM ACCOUNT');
    // console.log('ACCOUNT 테이블 구조:', columns);

    const { ROLE, POSITION, LEVEL, ACCOUNT_STATE } = data;
    const [result] = await pool.query(
      'UPDATE ACCOUNT SET  ROLE= ?, POSITION = ?, LEVEL = ?, ACCOUNT_STATE = ? WHERE NO = ?',
      [ROLE, POSITION, LEVEL, ACCOUNT_STATE, NO]
    );
    console.log('Update account query result:', result);
    return result;
  } catch (error) {
    console.error('Error in updateAccount:', error);
    throw error;
  }
};

// 계정 삭제
export const deleteAccount = async (NO) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM ACCOUNT WHERE NO = ?',
      [NO]
    );
    console.log('Delete account query result:', result);
    return result;
  } catch (error) {
    console.error('Error in deleteAccount:', error);
    throw error;
  }
};

//get Roles
export const getRoles = async () => {
  try {
    // 먼저 테이블 구조를 확인
    // const [columns] = await pool.query('SHOW COLUMNS FROM ACCOUNT_ROLE');
    // console.log('ACCOUNT_ROLE 테이블 구조:', columns);

    // 실제 데이터 조회
    const [rows] = await pool.query('SELECT ROLE_NO, ROLE_NAME FROM ACCOUNT_ROLE');
    console.log('역할 조회 결과:', rows);
    return rows;
  } catch (error) {
    console.error('getRoles 에러:', error);
    throw error;
  }
};
export const getAccountPosition = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM ACCOUNT_POSITION');
    console.log('역할 조회 결과:', rows);
    return rows;
  } catch (error) {
    console.error('getRoles 에러:', error);
    throw error;
  }
};
