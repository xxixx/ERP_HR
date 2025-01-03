import { H3Event, createError, getQuery, readBody, readMultipartFormData, getRouterParam } from 'h3';
import * as BoardModel from '~~/server/model/board';
import * as AttachmentModel from '~~/server/model/attachment';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const getPosts = async (evt) => {
    console.log('[Controller] getPosts 호출');
    try {
        const query = getQuery(evt);
        const result = await BoardModel.getPosts(query);
        console.log('[Controller] getPosts 성공:', result.length + '개의 게시글');
        return { data: result };
    } catch (error) {
        console.error('[Controller] getPosts 에러:', error);
        throw createError({ statusCode: 500, statusMessage: '게시글 목록 조회 중 오류가 발생했습니다.' });
    }
};

export const getPost = async (evt) => {
    console.log('[Controller] getPost 호출');
    try {
        const { id } = evt.context.params;
        const result = await BoardModel.getPost(id);
        const attachments = await AttachmentModel.getAttachmentsByPostId(id);
        console.log('[Controller] getPost 성공:', result);
        return { 
            data: { 
                ...result,
                attachments 
            } 
        };
    } catch (error) {
        console.error('[Controller] getPost 에러:', error);
        throw createError({ statusCode: 500, statusMessage: '게시글 조회 중 오류가 발생했습니다.' });
    }
};

export const createPost = async (evt) => {
    try {
        const body = await readBody(evt);
        console.log('[Controller] 게시글 데이터:', body);

        if (!body.AUTHOR_NO) {
            throw createError({
                statusCode: 401,
                message: '로그인이 필요합니다.'
            });
        }

        // 게시글 생성
        const postId = await BoardModel.createPost(body);
        console.log('[Controller] 게시글 생성 성공, ID:', postId);

        return { data: postId };
    } catch (error) {
        console.error('[Controller] createPost 에러:', error);
        throw createError({ 
            statusCode: error.statusCode || 500, 
            message: error.message || '게시글 생성 중 오류가 발생했습니다.' 
        });
    }
};

export const updatePost = async (evt) => {
    try {
        const postId = getRouterParam(evt, 'id');
        const body = await readBody(evt);
        console.log('[Controller] 게시글 데이터:', body);

        // 필드명 변환
        const postData = {
            TITLE: body.title,
            CONTENT: body.content,
            CATEGORY_ID: body.categoryId,
            IS_NOTICE: body.isNotice || false
        };

        // 게시글 수정
        const result = await BoardModel.updatePost(postId, postData);
        console.log('[Controller] updatePost 성공');

        // 파일 처리 로직이 있다면 여기에 추가

        return { success: true };
    } catch (error) {
        console.error('[Controller] updatePost 에러:', error);
        throw createError({
            statusCode: 500,
            message: '게시글 수정 중 오류가 발생했습니다.'
        });
    }
};

export const deletePost = async (evt) => {
    console.log('[Controller] deletePost 호출');
    try {
        const { id } = evt.context.params;
        const result = await BoardModel.deletePost(id);
        console.log('[Controller] deletePost 성공:', result);
        return { data: result };
    } catch (error) {
        console.error('[Controller] deletePost 에러:', error);
        throw createError({ statusCode: 500, statusMessage: '게시글 삭제 중 오류가 발생했습니다.' });
    }
};

export const getCategories = async (evt) => {
    console.log('[Controller] getCategories 호출');
    try {
        const result = await BoardModel.getCategories();
        console.log('[Controller] getCategories 성공:', result);
        return { data: result };
    } catch (error) {
        console.error('[Controller] getCategories 에러:', error);
        throw createError({ statusCode: 500, statusMessage: '카테고리 목록 조회 중 오류가 발생했습니다.' });
    }
};

export const getNotices = async (evt) => {
    console.log('[Controller] getNotices 호출');
    try {
        const result = await BoardModel.getNotices();
        console.log('[Controller] getNotices 성공:', result.length + '개의 공지사항');
        return { success: true, data: result };
    } catch (error) {
        console.error('[Controller] getNotices 실패:', error);
        throw createError({ statusCode: 500, statusMessage: '공지사항 목록 조회 중 오류가 발생했습니다.' });
    }
};