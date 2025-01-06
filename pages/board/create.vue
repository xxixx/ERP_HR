<template>
  <div class="container mt-4">
    <!-- <h5 class="bg-warning align-items-center text-white p-2">게시글 작성</h5> -->
    
    <form @submit.prevent="submitPost" class="mt-4">
      <div class="mb-3 d-flex align-items-center">
        
        <label for="category" class="form-label mb-0 text-center d-flex justify-content-between" style="width: 5%; min-width: 80px;">
          <span>카</span>   <span> 테</span> <span> 고</span> <span>리</span>
         
        </label>
        <select v-model="postData.CATEGORY_ID" class="form-select ms-3" id="category" required>
          <option value="">카테고리 선택</option>
          <option v-for="category in categories" :key="category.CATEGORY_ID" :value="category.CATEGORY_ID">
            {{ category.CATEGORY_NAME }}
          </option>
        </select>
      </div>

      <div class="mb-3 d-flex align-items-center">
        <label for="title" class="form-label mb-0 text-center d-flex justify-content-between " style="width: 5%; min-width: 80px; ">
            <span> 제</span>   <span> 목</span>
        </label>
        <input type="text" v-model="postData.TITLE" class="form-control ms-3" id="title" required>
      </div>

      <div class="mb-3">
        <!-- <label for="content" class="form-label">내용</label> -->
        <Editor
          v-model="postData.CONTENT"
          :api-key="tinyMceApiKey"
          :init="{
            height: 500,
            menubar: false,
            placeholder: '내용을 입력하세요',
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

      <!-- 관리자용 공지사항 체크박스 -->
      <div class="mb-3 form-check" v-if="isAdmin">
        <input 
          type="checkbox" 
          v-model="postData.IS_NOTICE" 
          class="form-check-input" 
          id="isNotice"
        >
        <label class="form-check-label" for="isNotice">
          공지사항으로 등록
        </label>
        <div class="text-muted small">
          (관리자 전용 기능)
        </div>
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
        <div v-if="selectedFiles.length > 0" class="mt-2">
          <div v-for="(file, index) in selectedFiles" :key="index" class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-paperclip"></i>
            <span>{{ file.name }}</span>
            <button 
              type="button" 
              class="btn btn-sm btn-outline-danger" 
              @click="removeFile(index)"
            >
              <i class="bi bi-x"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary">등록</button>
        <NuxtLink to="/board" class="btn btn-outline-secondary">취소</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';
import { $fetch } from 'ofetch';
import { useRuntimeConfig } from '#app';
import Editor from '@tinymce/tinymce-vue';

// 페이지 메타데이터 설정
const pageTitle = ref('게시판 글작성');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
const router = useRouter();
const authStore = useAuthStore();
const categories = ref([]);
const runtimeConfig = useRuntimeConfig();
const tinyMceApiKey = runtimeConfig.public.TINYMCE_API_KEY;

// 사용자 권한 디버깅
console.log('현재 사용자:', authStore.user);
console.log('사용자 권한:', authStore.user?.ROLE);

const isAdmin = computed(() => {
  const hasAdminRole = authStore.user?.ROLE === 'admin';
  console.log('관리자 권한 여부:', hasAdminRole);
  return hasAdminRole;
});

const postData = ref({
  TITLE: '',
  CONTENT: '',
  CATEGORY_ID: '',
  IS_NOTICE: false,
  AUTHOR_NO: authStore.user ? authStore.user.NO : ''
});

// 공지사항 상태 변경 감시
watch(() => postData.value.IS_NOTICE, (newValue) => {
  console.log('공지사항 상태 변경:', newValue);
});

const selectedFiles = ref([]);

const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  selectedFiles.value.push(...files);
};

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1);
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
  if (!authStore.user) {
    alert('로그인이 필요합니다.');
    router.push('/login');
    return;
  }

  try {
    console.log('제출할 데이터:', postData.value);
    const response = await $fetch('/api/board/create', {
      method: 'POST',
      body: postData.value
    });

    if (selectedFiles.value.length > 0) {
      const formData = new FormData();
      selectedFiles.value.forEach(file => {
        formData.append('files', file);
      });
      formData.append('postId', response.data);

      await $fetch('/api/board/upload', {
        method: 'POST',
        body: formData
      });
    }

    router.push('/board');
  } catch (error) {
    console.error('게시글 등록 실패:', error);
    if (error.statusCode === 401) {
      alert('로그인이 필요합니다.');
      router.push('/login');
    } else {
      alert('게시글 등록에 실패했습니다.');
    }
  }
};

onMounted(() => {
  if (!authStore.user) {
    router.push('/login');
    return;
  }
  fetchCategories();
});
</script>

<style>
.bg-warning {
   border-radius: 5px;
   height: 40px;
  }
.tox-tinymce {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>
