// File: /server/controller/account.js
import * as accountModel from '../model/account.js';
import { findUserByEmail } from '../model/account.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { H3Event } from 'h3';

// JWT 설정
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '15m';
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d';

console.log('JWT 환경 변수 로드:', {
  JWT_SECRET: JWT_SECRET?.slice(0, 5) + '...',
  JWT_REFRESH_SECRET: JWT_REFRESH_SECRET?.slice(0, 5) + '...',
  JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION
});

// 토큰 생성 함수
const generateTokens = (user) => {
  console.log('토큰 생성 - 사용자 정보:', user);
  console.log('환경 변수 확인:', { 
    JWT_SECRET: JWT_SECRET?.slice(0, 5) + '...', 
    JWT_REFRESH_SECRET: JWT_REFRESH_SECRET?.slice(0, 5) + '...',
    JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_EXPIRATION 
  });

  const accessToken = jwt.sign(
    { 
      NO: user.NO,
      email: user.EMAIL,
      name: user.NAME,
      role: user.ROLE,
      level: user.LEVEL,
      employee_id: user.EMPLOYEE_ID
    },
    JWT_SECRET,
    { expiresIn: JWT_ACCESS_EXPIRATION }
  );

  const refreshToken = jwt.sign(
    { id: user.NO },
    JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRATION }
  );

  return { accessToken, refreshToken };
};

// 사용자 등록 함수
export const registerUser = async (EMAIL, NAME, PASSWORD) => {
    console.log('사용자 등록 controller 호출됨, EMAIL:', EMAIL, '이름:', NAME,'PASSWORD:', PASSWORD);
    const existingUser = await findUserByEmail(EMAIL);
    if (existingUser) {
      return { success: false, message: '이미 사용 중인 이메일입니다.' };
    }
    return await accountModel.createUser(EMAIL, NAME, PASSWORD);
};

// 로그인 함수
export const loginUser = async (EMAIL, PASSWORD) => {
  console.log('loginUser 호출됨, EMAIL:', EMAIL, 'PASSWORD:', PASSWORD);
  const user = await accountModel.findUser(EMAIL);

  if (user) {
    const isPasswordValid = await bcrypt.compare(PASSWORD, user.PASSWORD);
    if (isPasswordValid) {
      const { accessToken, refreshToken } = generateTokens(user);
      
      return { 
        success: true, 
        message: '로그인 성공',
        accessToken,
        refreshToken,
        user: {
          NO: user.NO,
          NAME: user.NAME,
          EMAIL: user.EMAIL,
          ROLE: user.ROLE,
          LEVEL: user.LEVEL,
          EMPLOYEE_ID: user.EMPLOYEE_ID
        }
      };
    }
  }
  
  return { success: false, message: '사용자 이름 또는 비밀번호가 잘못되었습니다.' };
};

// 토큰 갱신 함수
export const refreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await accountModel.findUserById(decoded.NO);

    if (!user) {
      return { success: false, message: '사용자를 찾을 수 없습니다.' };
    }

    const tokens = generateTokens(user);
    
    return {
      success: true,
      message: '토큰 갱신 성공',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };
  } catch (error) {
    return { success: false, message: '유효하지 않은 리프레시 토큰입니다.' };
  }
};

// 비밀번호 업데이트 함수
export const updatePassword = async (EMAIL, new_password) => {
    console.log('비밀번호 업데이트 요청, 이메일:', EMAIL);
    
    const existingUser = await findUserByEmail(EMAIL);
    if (!existingUser) {
        return { success: false, message: '일치하는 이메일이 없습니다.' };
    }

    return await accountModel.updatePassword(EMAIL, new_password);
};

// 로그인한 사용자의 비밀번호 변경
export const changePassword = async (EMAIL, current_password, new_password) => {
    try {
        // 현재 사용자 정보 조회
        const user = await accountModel.findUser(EMAIL);
        if (!user) {
            return { success: false, message: '사용자를 찾을 수 없습니다.' };
        }

        // 현재 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(current_password, user.PASSWORD);
        if (!isPasswordValid) {
            return { success: false, message: '현재 비밀번호가 올바르지 않습니다.' };
        }

        // 새 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(new_password, 10);

        // 비밀번호 업데이트
        await accountModel.updatePassword(EMAIL, hashedPassword);
        
        return { success: true, message: '비밀번호가 성공적으로 변경되었습니다.' };
    } catch (error) {
        console.error('비밀번호 변경 중 오류 발생:', error);
        return { success: false, message: '비밀번호 변경 중 오류가 발생했습니다.' };
    }
};

// 토큰 검증 미들웨어
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ 
      success: false, 
      message: '인증 토큰이 필요합니다.' 
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: '토큰이 만료되었습니다.' 
      });
    }
    return res.status(401).json({ 
      success: false, 
      message: '유효하지 않은 토큰입니다.' 
    });
  }
};

export const getAccounts = async () => {
  try {
    const result = await accountModel.getAccounts();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

// 계정 상세 정보 조회 컨트롤러
export const getAccountDetailController = async (NO) => {
    try {
        console.log('Getting account details for NO:', NO);
        const account = await accountModel.getAccountDetail(NO);
        
        if (!account) {
            return {
                success: false,
                message: '계정을 찾을 수 없습니다.'
            };
        }

        return {
            success: true,
            data: account
        };
    } catch (error) {
        console.error('Error in getAccountDetailController:', error);
        return {
            success: false,
            message: error.message || '계정 정보 조회 중 오류가 발생했습니다.'
        };
    }
};

// 계정 정보 수정 컨트롤러
export const updateAccountController = async (NO, data) => {
    try {
        console.log('Controller received NO:', NO);
        console.log('Controller received data:', JSON.stringify(data));
        
        if (!data.ROLE) {
            throw new Error('ROLE is required');
        }

        const result = await accountModel.updateAccount(NO, {
            ROLE: data.ROLE,
            POSITION: data.POSITION,
            LEVEL: data.LEVEL,
            ACCOUNT_STATE: data.ACCOUNT_STATE
        });

        return {
            success: true,
            message: '계정이 성공적으로 수정되었습니다.',
            data: result
        };
    } catch (error) {
        console.error('Error in updateAccountController:', error);
        return {
            success: false,
            message: error.message || '계정 수정 중 오류가 발생했습니다.'
        };
    }
};

// 계정 삭제 컨트롤러
export const deleteAccountController = async (NO) => {
    try {
        console.log('Deleting account NO:', NO);
        const result = await accountModel.deleteAccount(NO);
        
        if (result.affectedRows === 0) {
            return {
                success: false,
                message: '삭제할 계정을 찾을 수 없습니다.'
            };
        }

        return {
            success: true,
            message: '계정이 성공적으로 삭제되었습니다.'
        };
    } catch (error) {
        console.error('Error in deleteAccountController:', error);
        return {
            success: false,
            message: error.message || '계정 삭제 중 오류가 발생했습니다.'
        };
    }
};

//ROLE 조회 
export const getRoles = async () => {
    try {
      const result = await accountModel.getRoles();
      return {
      
        data: result
      };
    } catch (error) {
      console.error('Error in getRolesController:', error);
      return {
        success: false,
        message: error.message || '로컬 조회 중 오류가 발생했습니다.'
      };
    }
  };
export const getAccountPosition = async () => {
    try {
      const result = await accountModel.getAccountPosition();
      return {
      
        data: result
      };
    } catch (error) {
      console.error('Error in getAccountPosition:', error);
      return {
        success: false,
        message: error.message || '로컬 조회 중 오류가 발생했습니다.'
      };
    }
  };
  
