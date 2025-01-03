import { sql } from '~~/server/db';

export const getPosts = async (query = {}) => {
    console.log('[Model] getPosts 호출, 쿼리:', query);
    const { categoryId, page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE IS_DELETE = FALSE';
    if (categoryId) {
        whereClause += ` AND CATEGORY_ID = ${categoryId}`;
    }

    const result = await sql({
        query: `
            SELECT 
                p.*,
                c.CATEGORY_NAME,
                a.NAME as AUTHOR_NAME,
                DATE_FORMAT(p.CREATED_DATE, '%Y-%m-%d') as FORMATTED_DATE
            FROM BOARD_POST p
            LEFT JOIN BOARD_CATEGORY c ON p.CATEGORY_ID = c.CATEGORY_ID
            LEFT JOIN ACCOUNT a ON p.AUTHOR_NO = a.NO
            ${whereClause}
            ORDER BY p.IS_NOTICE DESC, p.CREATED_DATE DESC
            LIMIT ? OFFSET ?
        `,
        values: [limit, offset]
    });
    
    console.log('[Model] getPosts 성공:', result.length + '개의 게시글');
    return result;
};

export const getPost = async (postId) => {
    console.log('[Model] getPost 호출, ID:', postId);
    
    // 조회수 증가
    await sql({
        query: 'UPDATE BOARD_POST SET VIEW_COUNT = VIEW_COUNT + 1 WHERE POST_ID = ?',
        values: [postId]
    });

    const result = await sql({
        query: `
            SELECT 
                p.*,
                c.CATEGORY_NAME,
                a.NAME as AUTHOR_NAME,
                DATE_FORMAT(p.CREATED_DATE, '%Y-%m-%d') as FORMATTED_DATE
            FROM BOARD_POST p
            LEFT JOIN BOARD_CATEGORY c ON p.CATEGORY_ID = c.CATEGORY_ID
            LEFT JOIN ACCOUNT a ON p.AUTHOR_NO = a.NO
            WHERE p.POST_ID = ? AND p.IS_DELETE = FALSE
        `,
        values: [postId]
    });

    console.log('[Model] getPost 성공:', result);
    return result[0];
};

export const createPost = async (postData) => {
    console.log('[Model] createPost 호출');
    
    const result = await sql({
        query: `
            INSERT INTO BOARD_POST (
                TITLE, 
                CONTENT, 
                CATEGORY_ID, 
                AUTHOR_NO,
                IS_NOTICE,
                CREATED_DATE
            ) VALUES (?, ?, ?, ?, ?, NOW())
        `,
        values: [
            postData.TITLE,
            postData.CONTENT,
            postData.CATEGORY_ID,
            postData.AUTHOR_NO,
            postData.IS_NOTICE || false
        ]
    });

    console.log('[Model] createPost 성공, ID:', result.insertId);
    return result.insertId;
};

export const updatePost = async (postId, postData) => {
    console.log('[Model] updatePost 호출, ID:', postId);
    
    const result = await sql({
        query: `
            UPDATE BOARD_POST 
            SET 
                TITLE = ?,
                CONTENT = ?,
                CATEGORY_ID = ?,
                IS_NOTICE = ?,
                MODIFIED_DATE = NOW()
            WHERE POST_ID = ?
        `,
        values: [
            postData.TITLE,
            postData.CONTENT,
            postData.CATEGORY_ID,
            postData.IS_NOTICE || false,
            postId
        ]
    });

    console.log('[Model] updatePost 성공:', result.affectedRows + '개의 행이 수정됨');
    return result;
};

export const deletePost = async (postId) => {
    console.log('[Model] deletePost 호출, ID:', postId);
    
    const result = await sql({
        query: 'UPDATE BOARD_POST SET IS_DELETE = TRUE WHERE POST_ID = ?',
        values: [postId]
    });

    console.log('[Model] deletePost 성공:', result);
    return result;
};

export const getCategories = async () => {
    console.log('[Model] getCategories 호출');
    
    const result = await sql({
        query: 'SELECT * FROM BOARD_CATEGORY ORDER BY CATEGORY_ID'
    });

    console.log('[Model] getCategories 성공:', result);
    return result;
};

export const getNotices = async () => {
    console.log('[Model] getNotices 호출');
    
    const result = await sql({
        query: `
            SELECT 
                p.*,
                a.NAME as AUTHOR_NAME,
                DATE_FORMAT(p.CREATED_DATE, '%Y-%m-%d %H:%i') as FORMATTED_DATE
            FROM BOARD_POST p
            LEFT JOIN ACCOUNT a ON p.AUTHOR_NO = a.NO
            WHERE p.IS_DELETE = FALSE AND p.IS_NOTICE = TRUE
            ORDER BY p.CREATED_DATE DESC
            LIMIT 5
        `
    });

    console.log('[Model] getNotices 성공:', result.length + '개의 공지사항');
    return result;
};