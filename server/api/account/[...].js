// File: /server/api/account/[...].js
import { useBase, createRouter, defineEventHandler, readBody } from 'h3';
import * as accountCtrl from '~~/server/controller/account.js';


const router = createRouter();

// 사용자 등록
router.post('/register', defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { EMAIL, NAME, password } = body;
    return await accountCtrl.registerUser(EMAIL, NAME, password);
}));

// 로그인
router.post('/login', defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { EMAIL, PASSWORD } = body;
    return await accountCtrl.loginUser(EMAIL, PASSWORD);
}));

// 토큰 갱신
router.post('/refresh', defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { refreshToken } = body;
    if (!refreshToken) {
        return { success: false, message: '리프레시 토큰이 필요합니다.' };
    }
    return await accountCtrl.refreshToken(refreshToken);
}));

// 비밀번호 재설정
router.post('/reset-password', defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { EMAIL, new_password } = body;
    return await accountCtrl.resetPassword(EMAIL, new_password);
}));

// 비밀번호 업데이트
router.post('/update-password', defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { EMAIL, new_password } = body;
    return await accountCtrl.updatePassword(EMAIL, new_password);
}));

// 계정 목록 조회
router.get('/list', defineEventHandler(async () => {
    return await accountCtrl.getAccounts();
}));
// 계정 목록 조회
router.get('/getAccounts', defineEventHandler(async () => {
    return await accountCtrl.getAccounts();
}));

// 계정 상세 정보 조회
router.get('/detail/:NO', defineEventHandler(async (event) => {
    try {
        const NO = event.context.params.NO;
        console.log('Received GET request for account NO:', NO);

        if (!NO) {
            return {
                success: false,
                message: '계정 번호가 필요합니다.'
            };
        }

        const response = await accountCtrl.getAccountDetailController(Number(NO));
        console.log('Controller response:', response);
        return response;
    } catch (error) {
        console.error('Error in GET /api/account/detail/:NO:', error);
        return {
            success: false,
            message: error.message || '계정 정보 조회 중 오류가 발생했습니다.'
        };
    }
}));

// 계정 정보 수정
router.put('/detail/:NO', defineEventHandler(async (event) => {
    try {
        const NO = event.context.params.NO;
        const body = await readBody(event);
        
        console.log('API received NO:', NO);
        console.log('API received body:', JSON.stringify(body));
        
        return await accountCtrl.updateAccountController(NO, body);
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            message: error.message || '계정 수정 중 오류가 발생했습니다.'
        };
    }
}));

// 계정 삭제
router.delete('/detail/:NO', defineEventHandler(async (event) => {
    try {
        const NO = event.context.params.NO;
        console.log('Received DELETE request for account NO:', NO);

        if (!NO) {
            return {
                success: false,
                message: '계정 번호가 필요합니다.'
            };
        }

        const response = await accountCtrl.deleteAccountController(Number(NO));
        console.log('Controller response:', response);
        return response;
    } catch (error) {
        console.error('Error in DELETE /api/account/detail/:NO:', error);
        return {
            success: false,
            message: error.message || '계정 삭제 중 오류가 발생했습니다.'
        };
    }
}));

//ROLE 조회 
router.get('/getRoles', defineEventHandler(async () => {
    return await accountCtrl.getRoles();
}));
router.get('/getAccountPosition', defineEventHandler(async () => {
    return await accountCtrl.getAccountPosition();
}));

// 라우터 핸들러 내보내기
export default useBase('/api/account', router.handler);
