import { sql } from '~~/server/db';
export type WorkerModel = {
  NO: any;
  NAME: any;
  
};
export const getWorkers = async () => {
  const result = await sql({
    // query: 'SELECT *,DATE_FORMAT(DATE, "%y-%m-%d") as formatted_date FROM WORKERS'
    query: 'SELECT * FROM WORKERS'
  });
  return result;
};
export const saveCheckedWorkers2 = async (checkedWorkers: any[]) => {
  const result = await sql({
    query: 'INSERT INTO WORKER_SCHEDULE (WORKER_NO, DATE) VALUES ?',
    values: checkedWorkers.map((workerNo) => [workerNo, new Date()])
  });
  return result;
};
export const saveCheckedWorkers1 = async (checkedWorkers: any[]) => {
  const values = checkedWorkers.map((worker) => [worker.WORKER_NO, worker.DATE]);
  
  const result = await sql({
    query: 'INSERT INTO WORKER_SCHEDULE (WORKER_NO, DATE) VALUES ?',
    values: [values] // Wrap values in an additional array
  });
  
  return result;
};


export const saveCheckedWorkers = async (checkedWorkers: any[]) => {
  const values = checkedWorkers.map((worker) => [worker.WORKER_NO]);

  const result = await sql({
    query: 'INSERT INTO WORKER_SCHEDULE (WORKER_NO, COUNT) VALUES ?',
    values: [values.map((value) => [...value, values.length])]
  });

  return result;
};
export const getWorkersCount = async () => {
  const result = await sql({
    // query: 'SELECT *,DATE_FORMAT(DATE, "%y-%m-%d") as formatted_date FROM WORKERS'
    query: 'SELECT * FROM WORKER_COUNT'
  });
  return result;
};
export const saveCheckedWorkersCount1 = async (checkedWorkers: any[]) => {
  const workerIds = checkedWorkers.map((worker) => worker.WORKER_NO).join(',');
  const date = new Date();

  const result = await sql({
    query: 'INSERT INTO WORKER_COUNT (WORKER_IDS, DATE) VALUES (?, ?)',
    values: [workerIds, date]
  });

  return result;
};
export const saveCheckedWorkersCount = async (checkedWorkers: any[]) => {
  const workerIds = checkedWorkers.map((worker) => worker.WORKER_NO);
  const date = new Date();

  const result = await sql({
    query: 'INSERT INTO WORKER_COUNT (WORKER_IDS, DATE, WORKER_COUNT) VALUES (?, ?, ?)',
    values: [workerIds.join(','), date, workerIds.length]
  });

  return result;
};


export const getSavedWorkers = async () => {
  const result = await sql({
    query: 'SELECT * FROM WORKER_COUNT'
  });
  return result;
};
// export const getWorkerNames = async (workerIds) => {
//   const result = await sql({
//     query: 'SELECT NAME FROM WORKERS WHERE NO IN (?)',
//     values: [workerIds]
//   });
//   console.log(result); // Log the result to the console
//   return result;
// };
export const getWorkerNames = async (workerIds) => {
  const result = await sql({
    query: 'SELECT NAME FROM WORKERS WHERE NO IN (?)',
    values: [workerIds]
  });
  console.log(result); // Log the result to the console
  return result;
};
export const getWorkersByDate = async (date: string): Promise<WorkerModel[]> => {
  const result = await sql({
    query: `
      SELECT w.NO, w.NAME
      FROM WORKERS w
      JOIN WORKER_COUNT wc ON FIND_IN_SET(w.NO, wc.WORKER_IDS) > 0
      WHERE wc.DATE = ?
    `,
    values: [date]
  });
  
  return result as WorkerModel[];
};
export const getWorkersAllDate = async (date: string): Promise<WorkerModel[]> => {

  //뷰테이블에서 가져오기  SELECT *FROM WORKERS_DATE_VIEW WHERE DATE = ?;
  const result = await sql({
    query: `
      SELECT 
    wc.NO AS WorkerCountNo,
    GROUP_CONCAT(w.NAME ORDER BY FIELD(w.NO, wc.WORKER_IDS)) AS WorkerNames,
    wc.WORKER_COUNT,wc.DATE,
     DATE_FORMAT(wc.DATE, '%y-%m%-%d') AS DATEFROM 
    FROM 
    WORKER_COUNT wc
    JOIN 
    WORKERS w ON FIND_IN_SET(w.NO, wc.WORKER_IDS) > 0
    GROUP BY 
    wc.NO, wc.WORKER_COUNT, wc.DATE;
    `,
    values: [date]
  });
  
  return result as WorkerModel[];
};
// export const getWorkersDate = async (date: string): Promise<WorkerModel[]> => {

//   //뷰테이블에서 가져오기  SELECT *FROM WORKERS_DATE_VIEW WHERE DATE = ?;
//   const result = await sql({
//     query: `
//       SELECT 
//     wc.NO AS WorkerCountNo,
//     GROUP_CONCAT(w.NAME ORDER BY FIELD(w.NO, wc.WORKER_IDS)) AS WorkerNames,
//     wc.WORKER_COUNT,
//     wc.DATE
//     FROM 
//     WORKER_COUNT wc
//     JOIN 
//     WORKERS w ON FIND_IN_SET(w.NO, wc.WORKER_IDS) > 0
//     WHERE 
//     wc.DATE = ?
//     GROUP BY 
//     wc.NO, wc.WORKER_COUNT, wc.DATE;
//     `,
//     values: [date]
//   });
  
//   return result as WorkerModel[];
// };