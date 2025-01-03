
import { H3Event } from 'h3';
// import { Context } from 'nuxt';
// import { Context } from '@nuxt/types';

import * as JaedanModel from '~~/server/model/jaedanView.ts';


export const getJaedanWondanView = async () => {
  try {
    const result = await JaedanModel.getJaedanWondanView();

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
