import { createRouter, defineEventHandler, useBase } from 'h3';
import * as backupCtrl from '~/server/controller/backup';

const router = createRouter();

// 백업 목록 조회
router.get('/', defineEventHandler(backupCtrl.getBackupList));

// 백업 생성
router.post('/', defineEventHandler(backupCtrl.createBackup));

// 백업 파일 다운로드
router.get('/file/:filename', defineEventHandler(backupCtrl.downloadBackup));

// 백업 파일 삭제
router.delete('/:filename', defineEventHandler(backupCtrl.deleteBackup));

export default useBase('/api/admin/backup', router.handler);
