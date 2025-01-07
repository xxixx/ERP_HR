import { H3Event } from 'h3';

import * as working_partModel from '~~/server/model/working_part';

export const getWORKING_PART = async () => {
  try {
    const result = await working_partModel.getWORKING_PART();

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