// server/api/sequence/[...].ts
import { useBase, createRouter, defineEventHandler } from 'h3';
import * as sequenceCtrl from '~/server/controller/sequence';

const router = createRouter();

// 시퀀스 조회 및 증가
router.get('/sequence/:seqName', defineEventHandler(sequenceCtrl.getNextSequence));

export default useBase('/api', router.handler);