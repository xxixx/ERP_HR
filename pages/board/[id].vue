<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="mb-0">
            <span v-if="post.IS_NOTICE" class="badge bg-danger me-2">공지</span>
            {{ post.TITLE }}
          </h4>
          <div class="d-flex gap-2" v-if="isAuthor">
            <button class="btn btn-outline-primary btn-sm" @click="editPost">수정</button>
            <button class="btn btn-outline-danger btn-sm" @click="deletePost">삭제</button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="mb-3 text-muted">
          <small>
            카테고리: {{ post.CATEGORY_NAME }} | 
            작성자: {{ post.AUTHOR_NAME }} | 
            작성일: {{ post.FORMATTED_DATE }} | 
            조회수: {{ post.VIEW_COUNT }}
          </small>
        </div>
        <div class="content" v-html="post.CONTENT"></div>
        
        <div class="mt-4" v-if="post.attachments && post.attachments.length > 0">
          <h5>첨부 파일</h5>
          <div class="list-group">
            <a 
              v-for="file in post.attachments" 
              :key="file.ATTACHMENT_ID"
              :href="file.FILE_PATH"
              target="_blank"
              class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div>
                <i class="bi bi-paperclip me-2"></i>
                {{ file.FILE_NAME }}
              </div>
              <span class="badge bg-secondary rounded-pill">
                {{ formatFileSize(file.FILE_SIZE) }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 d-flex justify-content-between">
      <NuxtLink to="/board" class="btn btn-outline-secondary">목록으로</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useRoute, useRouter } from 'vue-router';
import { $fetch } from 'ofetch';
import DOMPurify from 'dompurify';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const post = ref({});
const isAuthor = computed(() => post.value.AUTHOR_NO === (authStore.user ? authStore.user.NO : ''));

const fetchPost = async () => {
  try {
    const response = await $fetch(`/api/board/${route.params.id}`);
    post.value = response.data;
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    router.push('/board');
  }
};

const editPost = () => {
  router.push(`/board/edit/${route.params.id}`);
};

const deletePost = async () => {
  if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;
  
  try {
    await $fetch(`/api/board/${route.params.id}`, {
      method: 'DELETE'
    });
    router.push('/board');
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

onMounted(() => {
  fetchPost();
});
</script>

<style scoped>
.content {
  min-height: 200px;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}

.content img {
  max-width: 100%;
  height: auto;
}

.content table {
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
}

.content table td,
.content table th {
  padding: 0.75rem;
  border: 1px solid #dee2e6;
}

.content pre {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto;
}
</style>
