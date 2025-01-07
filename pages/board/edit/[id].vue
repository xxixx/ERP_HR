<template>
  <div class="container mt-4">
    <h5 class=" mt-2 bg-warning align-items-center text-white p-2">게시글 수정</h5>
    
    <form @submit.prevent="submitPost" class="mt-4">
      <div class="mb-3">
        <label for="category" class="form-label">카테고리</label>
        <select v-model="postData.CATEGORY_ID" class="form-select" id="category" required>
          <option value="">카테고리 선택</option>
          <option v-for="category in categories" :key="category.CATEGORY_ID" :value="category.CATEGORY_ID">
            {{ category.CATEGORY_NAME }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input type="text" v-model="postData.TITLE" class="form-control" id="title" required>
      </div>

      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <Editor
          v-model="postData.CONTENT"
          :api-key="tinyMceApiKey"
          :init="{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }"
        />
      </div>

      <div class="mb-3">
        <label for="files" class="form-label">첨부 파일</label>
        <input 
          type="file" 
          class="form-control" 
          id="files" 
          @change="handleFileChange" 
          multiple
        >
        <!-- 기존 첨부 파일 목록 -->
        <div v-if="existingFiles.length > 0" class="mt-2">
          <h6>기존 첨부 파일</h6>
          <div v-for="file in existingFiles" :key="file.ATTACHMENT_ID" class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-paperclip"></i>
            <a :href="file.FILE_PATH" target="_blank">{{ file.FILE_NAME }}</a>
            <span class="badge bg-secondary">{{ formatFileSize(file.FILE_SIZE) }}</span>
            <button 
              type="button" 
              class="btn btn-sm btn-outline-danger" 
              @click="removeExistingFile(file.ATTACHMENT_ID)"
            >
              <i class="bi bi-x"></i>
            </button>
          </div>
        </div>
        <!-- 새로 추가된 파일 목록 -->
        <div v-if="selectedFiles.length > 0" class="mt-2">
          <h6>새로 추가된 파일</h6>
          <div v-for="(file, index) in selectedFiles" :key="index" class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-paperclip"></i>
            <span>{{ file.name }}</span>
            <button 
              type="button" 
              class="btn btn-sm btn-outline-danger" 
              @click="removeNewFile(index)"
            >
              <i class="bi bi-x"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="mb-3" v-if="isAdmin">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="postData.IS_NOTICE" id="noticeCheck">
          <label class="form-check-label" for="noticeCheck">
            공지사항으로 등록
          </label>
        </div>
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary">수정</button>
        <NuxtLink :to="`/board/${route.params.id}`" class="btn btn-outline-secondary">취소</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useRouter, useRoute } from 'vue-router';
import { $fetch } from 'ofetch';
import { useRuntimeConfig } from '#app';
import Editor from '@tinymce/tinymce-vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const categories = ref([]);
const isAdmin = computed(() => authStore.user?.ROLE === 'admin');
const selectedFiles = ref([]);
const existingFiles = ref([]);
const deletedFileIds = ref([]);
const runtimeConfig = useRuntimeConfig();
const tinyMceApiKey = runtimeConfig.public.TINYMCE_API_KEY;

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  selectedFiles.value.push(...files);
};

const removeNewFile = (index) => {
  selectedFiles.value.splice(index, 1);
};

const removeExistingFile = (attachmentId) => {
  const file = existingFiles.value.find(f => f.ATTACHMENT_ID === attachmentId);
  if (file) {
    deletedFileIds.value.push(attachmentId);
    existingFiles.value = existingFiles.value.filter(f => f.ATTACHMENT_ID !== attachmentId);
  }
};

const postData = ref({
  TITLE: '',
  CONTENT: '',
  CATEGORY_ID: '',
  IS_NOTICE: false
});

const loadPost = async () => {
  try {
    const response = await $fetch(`/api/board/${route.params.id}`);
    postData.value = {
      TITLE: response.data.TITLE,
      CONTENT: response.data.CONTENT,
      CATEGORY_ID: response.data.CATEGORY_ID,
      IS_NOTICE: response.data.IS_NOTICE
    };

    // 첨부 파일 설정
    if (response.data.attachments) {
      existingFiles.value = response.data.attachments;
    }
  } catch (error) {
    console.error('게시글 로드 실패:', error);
    alert('게시글을 불러오는데 실패했습니다.');
    router.push('/board');
  }
};

const fetchCategories = async () => {
  try {
    const response = await $fetch('/api/board/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('카테고리 목록 조회 실패:', error);
  }
};

const submitPost = async () => {
  try {
    console.log('수정할 데이터:', postData.value);
    await $fetch(`/api/board/${route.params.id}`, {
      method: 'PUT',
      body: {
        title: postData.value.TITLE,
        content: postData.value.CONTENT,
        categoryId: postData.value.CATEGORY_ID,
        isNotice: postData.value.IS_NOTICE
      }
    });

    router.push('/board');
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    alert('게시글 수정에 실패했습니다.');
  }
};

onMounted(() => {
  if (!authStore.user) {
    router.push('/login');
    return;
  }
  loadPost();
  fetchCategories();
});
</script>

<style>
.tox-tinymce {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>
