import { H3Event, createError } from 'h3';
import * as WorkerModel from '~~/server/model/workers';

export const getWorkers = async (evt: H3Event) => {
  try {
    const result = await WorkerModel.getWorkers();
    // return { data: result };
    return  result;
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something getWorkers went wrong' });
  }
};

export const saveCheckedWorkersRegister = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const { checkedWorkers } = body;
    const result = await WorkerModel.saveCheckedWorkersCount(checkedWorkers);
    return { ok: true, result };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
  }
};
// export const saveCheckedWorkers = async (evt: H3Event) => {
//   try {
//     console.log('Incoming data:', evt.body);
//     const { checkedWorkers } = evt.body;
//     console.log('Checked workers:', checkedWorkers);
//     const result = await WorkerModel.saveCheckedWorkers(checkedWorkers);
//     console.log('Result:', result);
//     return result;
//   } catch (error) {
//     console.error('Error saving checked workers:', error);
//     throw createError({ statusCode: 500, statusMessage: 'Something saveCheckedWorkers went wrong' });
//   }
// };
// export const saveCheckedWorkersCount = async (evt: H3Event) => {
//   try {
//     console.log('Incoming data:', evt.body);
//     const { checkedWorkers } = evt.body;
//     console.log('Checked workers:', checkedWorkers);
//     const result = await WorkerModel.saveCheckedWorkers(checkedWorkers);
//     console.log('Result:', result);
//     return result;
//   } catch (error) {
//     console.error('Error saving checked workers:', error);
//     throw createError({ statusCode: 500, statusMessage: 'Something saveCheckedWorkers went wrong' });
//   }
// };
export const getSavedWorkers = async (evt: H3Event) => {
  try {
    const result = await WorkerModel.getSavedWorkers();
    return result;
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something getSavedWorkers went wrong' });
  }
};
export const getWorkersByDate = async (evt: H3Event) => {
  try {
    const { date } = getQuery(evt); // 요청에서 date를 가져옴

    if (!date) {
      throw createError({ statusCode: 400, statusMessage: '날짜가 제공되지 않았습니다.' });
    }

    const result = await WorkerModel.getWorkersByDate(date as string);

    return {
      data: result,
    };
  } catch (error) {
    console.error('getWorkersByDate error:', error);
    throw createError({ statusCode: 500, statusMessage: 'getWorkersByDate 중 문제가 발생했습니다.' });
  }
};
export const getWorkersDate = async (evt: H3Event) => {
  try {
    const { date } = getQuery(evt); // 요청에서 date를 가져옴

    if (!date) {
      throw createError({ statusCode: 400, statusMessage: '날짜가 제공되지 않았습니다.' });
    }

    const result = await WorkerModel.getWorkersDate(date as string);

    return {
      data: result,
    };
  } catch (error) {
    console.error('getWorkersByDate error:', error);
    throw createError({ statusCode: 500, statusMessage: 'getWorkersByDate 중 문제가 발생했습니다.' });
  }
};
export const getWorkersAllDate = async (evt: H3Event) => {
  try {
    const { date } = getQuery(evt); // 요청에서 date를 가져옴

   

    const result = await WorkerModel.getWorkersAllDate(date as string);

    return {
      data: result,
    };
  } catch (error) {
    console.error('getWorkersByDate error:', error);
    throw createError({ statusCode: 500, statusMessage: 'getWorkersByDate 중 문제가 발생했습니다.' });
  }
};
