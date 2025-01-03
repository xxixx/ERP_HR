<template>
  <div class="container mt-4">
    <div class="row align-items-center mb-4">
      <div class="col text-end">
        <!-- 왼쪽 여백용 빈 공간 -->
      </div>
      <div class="col text-center">
        <h5 class="mb-0">공지사항</h5>
      </div>
      <div class="col text-end">
        <NuxtLink to="/board/create" class="btn btn-sm btn-warning text-white" style="width: 150px; height: 35px;">글쓰기</NuxtLink>
      </div>
    </div>
<hr>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th style="width: 10%">번호</th>
            <th style="width: 55%">제목</th>
            <th style="width: 15%">작성자</th>
            <th style="width: 10%">조회수</th>
            <th style="width: 10%">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in currentPosts" :key="post.POST_ID" @click="goToPost(post.POST_ID)" style="cursor: pointer;">
            <td>
              <span class="badge bg-danger">공지</span>
            </td>
            <td>{{ post.TITLE }}</td>
            <td>{{ post.AUTHOR_NAME }}</td>
            <td>{{ post.VIEW_COUNT }}</td>
            <td>{{ post.FORMATTED_DATE }}</td>
          </tr>
          <tr v-if="currentPosts.length === 0">
            <td colspan="5" class="text-center py-4">공지사항이 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- paging  -->
    <div class="pages d-flex justify-content-center">
      <ul class="pagination pages">
        <li>
          <a
            href="#"
            class="back"
            :class="{ disabled: currentPage === 1 }"
            @click.prevent="changePage(currentPage - 1)"
            aria-label="Previous"
          >
            <span aria-hidden="true" class="fa fa-arrow-circle-left"></span>
            Prev</a
          >
        </li>
        <li
          class="page-item d-inline"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <a
            href="#"
            class="page page-item"
            :class="{ active: currentPage === page }"
            @click.prevent="changePage(page)"
            >{{ page }}</a
          >
        </li>
        <li class="page-item d-inline">
          <a
            href="#"
            class="next"
            :class="{ disabled: currentPage === totalPages }"
            @click.prevent="changePage(currentPage + 1)"
            aria-label="Next"
          >
            <span aria-hidden="true" class="fa fa-arrow-circle-right"></span
            >Next</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// 페이지 메타데이터 설정
const pageTitle = ref('공지 게시판');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
const router = useRouter();
const currentPage = ref(1);
const itemsPerPage = 10;
const posts = ref([]);

// 현재 페이지의 게시글
const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return posts.value.slice(start, end);
});

// 전체 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(posts.value.length / itemsPerPage);
});

const fetchPosts = async () => {
  try {
    const response = await $fetch('/api/board/notice');
    posts.value = response.data;
  } catch (error) {
    console.error('공지사항 목록 조회 실패:', error);
  }
};

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

const goToPost = (postId) => {
  router.push(`/board/${postId}`);
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.table th {
  background-color: #f8f9fa;
}
.table td {
  vertical-align: middle;
}

/* 페이징 */
a {
  color: #cc1b6f;
  text-decoration: none;
  transition: color 0.5s ease;
}
.pages {
  text-align: center;
  margin-top: 10px;
}

.pages a {
  display: inline-block;
}

.pages .back,
.pages .next {
  font-family: "Fira Sans", sans-serif;
  font-weight: 900;
  font-size: 10pt;
  margin: 0 40px;
  color: #23182c;
}

.pages .back span,
.pages .next span {
  font-size: 13pt;
  margin: 0 4px;
}

@media (max-width: 768px) {
  .pages .back,
  .pages .next {
    display: none;
  }
}

.pages .back:not(.disabled):hover,
.pages .next:not(.disabled):hover {
  color: #cc1b6f;
}

.pages .back.disabled,
.pages .next.disabled {
  color: #bdb9bf;
  cursor: default;
}

.pages .page {
  -webkit-border-radius: 50%;
  -webkit-background-clip: padding-box;
  -moz-border-radius: 50%;
  -moz-background-clip: padding;
  border-radius: 50%;
  background-clip: padding-box;
  width: 34px;
  height: 34px;
  margin: 0 4px;
  background: #cc1b6f;
  color: #fff;
  border: 2px solid #cc1b6f;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.pages .page:not(.active):hover {
  border-color: #23182c;
  background: #fff;
  color: #23182c;
}

.pages .page.active {
  background: #fff;
  color: #cc1b6f;
  cursor: default;
}
</style>
