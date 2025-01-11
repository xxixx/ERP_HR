import { sql } from '~/server/db';

export const getNextSequence = async (seqName: string) => {
    console.log('[Model] getNextSequence - 시작, seqName:', seqName);
    
    try {
        // 1. 시퀀스 업데이트
        await sql({
            query: `
                UPDATE SEQUENCE_MANAGER 
                SET CURRENT_VALUE = CASE
                    WHEN CURRENT_VALUE >= MAX_VALUE AND CYCLE_FLAG = 'Y' THEN MIN_VALUE
                    WHEN CURRENT_VALUE >= MAX_VALUE AND CYCLE_FLAG = 'N' THEN CURRENT_VALUE
                    ELSE CURRENT_VALUE + STEP
                END,
                LAST_UPDATED = NOW()
                WHERE SEQ_NAME = ?
            `,
            values: [seqName]
        });

        // 2. 업데이트된 시퀀스 조회
        const result = await sql({
            query: `
                SELECT CURRENT_VALUE, PREFIX, MAX_VALUE 
                FROM SEQUENCE_MANAGER 
                WHERE SEQ_NAME = ?
            `,
            values: [seqName]
        });

        console.log('[Model] getNextSequence - 조회 결과:', result);

        if (!result || result.length === 0) {
            throw new Error(`시퀀스 ${seqName}를 찾을 수 없습니다.`);
        }

        const sequenceData = result[0];
        return {
            success: true,
            data: {
                currentValue: sequenceData.CURRENT_VALUE,
                prefix: sequenceData.PREFIX,
                maxValue: sequenceData.MAX_VALUE
            }
        };
    } catch (error) {
        console.error('[Model] getNextSequence - 오류:', error);
        return {
            success: false,
            error: error.message
        };
    }
};