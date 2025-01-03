import { sql } from '~~/server/db';
import { unlink } from 'fs/promises';
import { join } from 'path';

export const saveAttachment = async (attachmentData) => {
    console.log('[Model] saveAttachment 호출, 데이터:', attachmentData);
    
    const result = await sql({
        query: `
            INSERT INTO BOARD_ATTACHMENT 
            (POST_ID, FILE_NAME, FILE_PATH, FILE_SIZE) 
            VALUES (?, ?, ?, ?)
        `,
        values: [
            attachmentData.postId,
            attachmentData.fileName,
            attachmentData.filePath,
            attachmentData.fileSize
        ]
    });

    console.log('[Model] saveAttachment 성공:', result);
    return result;
};

export const getAttachmentsByPostId = async (postId) => {
    console.log('[Model] getAttachmentsByPostId 호출, POST_ID:', postId);
    
    const result = await sql({
        query: `
            SELECT * FROM BOARD_ATTACHMENT
            WHERE POST_ID = ?
            ORDER BY CREATED_DATE DESC
        `,
        values: [postId]
    });

    console.log('[Model] getAttachmentsByPostId 성공:', result);
    return result;
};

export const deleteAttachment = async (attachmentId) => {
    console.log('[Model] deleteAttachment 호출, ATTACHMENT_ID:', attachmentId);
    
    // 파일 정보 조회
    const [fileInfo] = await sql({
        query: 'SELECT FILE_PATH FROM BOARD_ATTACHMENT WHERE ATTACHMENT_ID = ?',
        values: [attachmentId]
    });

    if (fileInfo) {
        // 실제 파일 삭제
        try {
            const filePath = join(process.cwd(), 'public', fileInfo.FILE_PATH);
            await unlink(filePath);
        } catch (error) {
            console.error('[Model] 파일 삭제 실패:', error);
        }
    }

    // 데이터베이스에서 레코드 삭제
    const result = await sql({
        query: 'DELETE FROM BOARD_ATTACHMENT WHERE ATTACHMENT_ID = ?',
        values: [attachmentId]
    });

    console.log('[Model] deleteAttachment 성공:', result);
    return result;
};
