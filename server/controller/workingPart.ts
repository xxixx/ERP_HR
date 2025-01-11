import { H3Event } from 'h3';
import * as WorkingPartModel from '~/server/model/workingPart';

export const getWORKING_PART = async () => {
  try {
    const result = await WorkingPartModel.getWORKING_PART();

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
export const getWorkingPartList = async (event: H3Event) => {
  console.log('[Controller] getWorkingPartList - 요청 시작');
  
  try {
    const result = await WorkingPartModel.getWorkingPartList();
    return { success: true, ...result };
  } catch (error) {
    console.error('[Controller] getWorkingPartList - 오류 발생:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '작업파트 목록을 불러오는데 실패했습니다.'
    });
  }
};

export const searchWorkingPart = async (event: H3Event) => {
  console.log('[Controller] searchWorkingPart - 요청 시작');
  
  try {
    const query = getQuery(event);
    const searchTerm = query.searchTerm as string;

    if (!searchTerm) {
      throw createError({
        statusCode: 400,
        statusMessage: '검색어를 입력해주세요.'
      });
    }

    const result = await WorkingPartModel.searchWorkingPartByTerm(searchTerm);
    return { success: true, ...result };
  } catch (error) {
    console.error('[Controller] searchWorkingPart - 오류 발생:', error);
    throw error;
  }
};

export const register = async (event: H3Event) => {
  console.log('[Controller] register - 요청 시작');
  
  try {
    const body = await readBody(event);
    
    if (!body.ASSY_PART_NAME || !body.WONDAN_CODE) {
      throw createError({
        statusCode: 400,
        statusMessage: '필수 항목을 입력해주세요.'
      });
    }

    const result = await WorkingPartModel.register(body);
    
    if (!result) {
      throw createError({
        statusCode: 500,
        statusMessage: '등록에 실패했습니다.'
      });
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('[Controller] register - 오류 발생:', error);
    throw error;
  }
};

export const update = async (event: H3Event) => {
  console.log('[Controller] update - 요청 시작');
  
  try {
    const body = await readBody(event);
    const NO = parseInt(event.context.params.id);

    if (!NO || !body.ASSY_PART_NAME || !body.WONDAN_CODE) {
      throw createError({
        statusCode: 400,
        statusMessage: '필수 항목을 입력해주세요.'
      });
    }

    const result = await WorkingPartModel.update(NO, body);
    
    if (!result) {
      throw createError({
        statusCode: 500,
        statusMessage: '수정에 실패했습니다.'
      });
    }

    return { success: true };
  } catch (error) {
    console.error('[Controller] update - 오류 발생:', error);
    throw error;
  }
};

export const remove = async (event: H3Event) => {
  console.log('[Controller] remove - 요청 시작');
  
  try {
    const NO = parseInt(event.context.params.id);

    if (!NO) {
      throw createError({
        statusCode: 400,
        statusMessage: '삭제할 항목을 선택해주세요.'
      });
    }

    const result = await WorkingPartModel.remove(NO);
    
    if (!result) {
      throw createError({
        statusCode: 500,
        statusMessage: '삭제에 실패했습니다.'
      });
    }

    return { success: true };
  } catch (error) {
    console.error('[Controller] remove - 오류 발생:', error);
    throw error;
  }
};
