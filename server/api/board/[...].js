import { useBase, createRouter, defineEventHandler } from 'h3';
import * as boardCtrl from '~/server/controller/board';

const router = createRouter();

// 게시글 목록 조회
router.get('/board/list', defineEventHandler(boardCtrl.getPosts));

// 게시글 상세 조회
router.get('/board/:id', defineEventHandler(boardCtrl.getPost));

// 게시글 작성
router.post('/board/create', defineEventHandler(boardCtrl.createPost));

// 게시글 수정
router.put('/board/:id', defineEventHandler(boardCtrl.updatePost));

// 게시글 삭제
router.delete('/board/:id', defineEventHandler(boardCtrl.deletePost));

// 카테고리 목록 조회
router.get('/board/categories', defineEventHandler(boardCtrl.getCategories));

// 공지사항 목록 조회
router.get('/board/notice/list', defineEventHandler(boardCtrl.getNotices));
router.get('/board/notice', defineEventHandler(boardCtrl.getNotices));

export default useBase('/api', router.handler);