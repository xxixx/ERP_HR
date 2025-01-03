import { useBase, createRouter, defineEventHandler } from 'h3';
import * as working_partCtrl from '~~/server/controller/working_part';
const router = createRouter();
router.get('/working_part/getWORKING_PART', defineEventHandler(working_partCtrl.getWORKING_PART));

export default useBase('/api', router.handler);