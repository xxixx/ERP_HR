import { sql } from '~/server/db';
import bcrypt from 'bcrypt';

// 비밀번호 해시 생성 함수
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// 사용자 찾기
export const findUser = async (EMAIL) => {
  console.log('findUser 호출됨, EMAIL:', EMAIL);
  const result = await sql({
    query: 'SELECT * FROM ACCOUNT WHERE EMAIL = ?',
    values: [EMAIL]
  });
  console.log('쿼리 결과:', result);
  return result[0];
};

// 사용자 등록 함수
export const createUser = async (EMAIL, NAME, PASSWORD) => {
  const hashedPassword = await hashPassword(PASSWORD);
  try {
    await sql({
      query: 'INSERT INTO ACCOUNT (EMAIL, NAME, PASSWORD) VALUES (?, ?, ?)',
      values: [EMAIL, NAME, hashedPassword]
    });
    console.log('사용자 등록 성공:', EMAIL);
    return { success: true, message: '사용자 등록 성공' };
  } catch (error) {
    console.error('사용자 등록 중 오류 발생:', error);
    return { success: false, message: '사용자 중복 등록 실패' };
  }
};

// 비밀번호 업데이트 함수
export const updatePassword = async (EMAIL, new_password) => {
  try {
    const hashedPassword = await hashPassword(new_password);
    await sql({
      query: 'UPDATE ACCOUNT SET PASSWORD = ? WHERE EMAIL = ?',
      values: [hashedPassword, EMAIL]
    });
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
    if (!new_password) {
      throw new Error('새 비밀번호가 제공되지 않았습니다.');
    }
    const result = await sql({
      query: 'SELECT password FROM ACCOUNT WHERE EMAIL = ?',
      values: [EMAIL]
    });
    if (result.length === 0) {
      return { success: false, message: '사용자를 찾을 수 없습니다.' };
    }
    const hashedPassword = await hashPassword(new_password);
    await sql({
      query: 'UPDATE ACCOUNT SET password = ? WHERE EMAIL = ?',
      values: [hashedPassword, EMAIL]
    });
    return { success: true, message: '비밀번호가 해시로 업데이트되었습니다.' };
  } catch (error) {
    console.error('비밀번호 업데이트 중 오류 발생:', error);
    return { success: false, message: '비밀번호 업데이트 실패' };
  }
};

//중복이메일 검사
export const findUserByEmail = async (EMAIL) => {
  const result = await sql({
    query: 'SELECT * FROM ACCOUNT WHERE EMAIL = ?',
    values: [EMAIL]
  });
  return result[0];
};

export const getAccounts1 = async () => {
  const result = await sql({
    query: 'SELECT NO, EMAIL, NAME,ROLE,POSITION,CREATED_DATE, ACCOUNT_STATUS, LEVEL FROM ACCOUNT '
  });
  return result; 
};

export const getAccounts = async () => {
  const result = await sql({
    query: 'SELECT NO, EMAIL, NAME, ROLE,POSITION,CREATE_DATE,ACCOUNT_STATE,LEVEL,EMPLOYEE_ID FROM ACCOUNT '
  });
  return result; 
};

// 계정 상세 정보 조회
export const getAccountDetail = async (NO) => {
  try {
    const result = await sql({
      query: 'SELECT NO, EMAIL, ROLE, POSITION, CREATE_DATE, ACCOUNT_STATE, LEVEL,EMPLOYEE_ID FROM ACCOUNT WHERE NO = ?',
      values: [NO]
    });
    console.log('Account detail query result:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error in getAccountDetail:', error);
    throw error;
  }
};

// 계정 정보 수정
export const updateAccount = async (NO, data) => {
  try {
    const { ROLE, POSITION, LEVEL, ACCOUNT_STATE } = data;
    const result = await sql({
      query: 'UPDATE ACCOUNT SET  ROLE= ?, POSITION = ?, LEVEL = ?, ACCOUNT_STATE = ? WHERE NO = ?',
      values: [ROLE, POSITION, LEVEL, ACCOUNT_STATE, NO]
    });
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
    const result = await sql({
      query: 'DELETE FROM ACCOUNT WHERE NO = ?',
      values: [NO]
    });
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
    const result = await sql({
      query: 'SELECT ROLE_NO, ROLE_NAME FROM ACCOUNT_ROLE'
    });
    console.log('역할 조회 결과:', result);
    return result;
  } catch (error) {
    console.error('getRoles 에러:', error);
    throw error;
  }
};

export const getAccountPosition = async () => {
  try {
    const result = await sql({
      query: 'SELECT * FROM ACCOUNT_POSITION'
    });
    console.log('역할 조회 결과:', result);
    return result;
  } catch (error) {
    console.error('getRoles 에러:', error);
    throw error;
  }
};
