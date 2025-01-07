import { defineEventHandler } from 'h3';
import * as backupCtrl from '~/server/controller/backup';

export default defineEventHandler(backupCtrl.downloadBackup);
