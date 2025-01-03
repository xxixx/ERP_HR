import { useBase, createRouter, defineEventHandler,readBody } from 'h3';
import * as workersCtrl from '~/server/controller/workers';
import * as WorkerModel from '~~/server/model/workers';
const router = createRouter();
// const bodyParser = defineBodyParser((evt) => {
//     return evt.body;
//   });
router.get('/workers/getWorkers', defineEventHandler(workersCtrl.getWorkers));
// router.post('/workers/saveCheckedWorkers', defineEventHandler(workersCtrl.saveCheckedWorkers));

router.post('/workers/saveCheckedWorkers', async (req, res) => {
    const body = await readBody(req);
    console.log("body",body);
    const { checkedWorkers } = body;
    console.log('Incoming data:', checkedWorkers);
    const result = await WorkerModel.saveCheckedWorkers2(checkedWorkers);
    console.log('Result:', result);
    return result;
});
// router.get('/workers/getWorkersCount', defineEventHandler(workersCtrl.WORKER_COUNT));
// router.post('/workers/saveCheckedWorkersRegister', async (req, res) => {
//     const body = await readBody(req);
//     console.log("body",body);
//     const { checkedWorkers } = body;
//     console.log('Incoming data:', checkedWorkers);
//     const result = await WorkerModel.saveCheckedWorkersCount(checkedWorkers);
//     console.log('Result:', result);
//     return result;
//   });
router.post('/workers/saveCheckedWorkersRegister', defineEventHandler(workersCtrl.saveCheckedWorkersRegister)),
  // 새로운 API 추가
router.get('/workers/getSavedWorkers', defineEventHandler(workersCtrl.getSavedWorkers));
router.get('/workers/getWorkersByDate', defineEventHandler(workersCtrl.getWorkersByDate));
router.get('/workers/getWorkersDate', defineEventHandler(workersCtrl.getWorkersDate));
router.get('/workers/getWorkersAllDate', defineEventHandler(workersCtrl.getWorkersAllDate));
// router.get('/workers/getWorkerNames', defineEventHandler(workersCtrl.getWorkerNames));

export default useBase('/api', router.handler);