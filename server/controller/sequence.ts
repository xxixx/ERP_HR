// server/controller/sequence.ts
import { H3Event } from 'h3';
import * as SequenceModel from '~/server/model/sequence';

export const getNextSequence = async (event: H3Event) => {
    console.log('[Controller] getNextSequence - 시작');
    try {
        const seqName = event.context.params.seqName;
        console.log('[Controller] getNextSequence - seqName:', seqName);

        const result = await SequenceModel.getNextSequence(seqName);
        console.log('[Controller] getNextSequence - 결과:', result);

        if (!result.success) {
            throw new Error(result.error || '시퀀스 생성에 실패했습니다.');
        }

        return result;
    } catch (error) {
        console.error('[Controller] getNextSequence - 오류:', error);
        return {
            success: false,
            error: error.message || '시퀀스 처리 중 오류가 발생했습니다.'
        };
    }
};