import { useBase, createRouter, defineEventHandler } from 'h3';
import * as backupCtrl from '~/server/controller/backup';

const router = createRouter();

// 백업 목록 조회
router.get('/backup', defineEventHandler(backupCtrl.getBackupList));

// 백업 생성
router.post('/backup', defineEventHandler(backupCtrl.createBackup));

// 백업 파일 다운로드
router.get('/:filename', defineEventHandler(backupCtrl.downloadBackup));

// 백업 파일 삭제
router.delete('/:filename', defineEventHandler(backupCtrl.deleteBackup));

export default useBase('/api/admin', router.handler);