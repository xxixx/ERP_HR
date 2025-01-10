<template>
  <div class="pages d-flex justify-content-center">
    <ul class="pagination pages">
      <li>
        <a
          href="#"
          class="back"
          :class="{ disabled: currentPage === 1 }"
          @click.prevent="onPageChange(currentPage - 1)"
          aria-label="Previous"
        >
          <span aria-hidden="true" class="fa fa-arrow-circle-left"></span>
          Prev</a
        >
      </li>
      <li 
        class="page-item d-inline"
        v-for="page in displayedPages"
        :key="page"
        :class="{ active: currentPage === page }"
      >
        <a
          href="#"
          class="page page-item"
          :class="{ active: currentPage === page }"
          @click.prevent="onPageChange(page)"
          v-if="page !== -1"
          >{{ page }}</a
        >
        <span
          class="ellipsis mx-1"
          v-else
          >...</span
        >
      </li>
      <li class="page-item d-inline">
        <a
          href="#"
          class="next"
          :class="{ disabled: currentPage === totalPages }"
          @click.prevent="onPageChange(currentPage + 1)"
          aria-label="Next"
        >
          <span aria-hidden="true" class="fa fa-arrow-circle-right"></span
          >Next</a
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}>();

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void;
}>();

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

// 표시할 페이지 번호 계산
const displayedPages = computed(() => {
  const pages = [];
  const ellipsis = -1;

  // 항상 처음 3페이지는 표시
  for (let i = 1; i <= Math.min(3, totalPages.value); i++) {
    pages.push(i);
  }

  // 현재 페이지 주변 페이지 계산
  let startPage = Math.max(4, props.currentPage - 1);
  let endPage = Math.min(totalPages.value - 3, props.currentPage + 1);

  // 시작 부분에 '...' 추가
  if (startPage > 4) {
    pages.push(ellipsis);
  }

  // 중간 페이지들 추가
  for (let i = startPage; i <= endPage; i++) {
    if (i > 3 && i < totalPages.value - 2) {
      pages.push(i);
    }
  }

  // 끝 부분에 '...' 추가
  if (endPage < totalPages.value - 3) {
    pages.push(ellipsis);
  }

  // 마지막 3페이지 추가
  for (let i = Math.max(totalPages.value - 2, endPage + 1); i <= totalPages.value; i++) {
    if (i > pages[pages.length - 1]) {
      pages.push(i);
    }
  }

  return pages;
});

const onPageChange = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page);
  }
};
</script>

<style scoped>
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
  .bg-warning {
   border-radius: 5px;
   height: 40px;
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
  .ellipsis {
  color: #6c757d;
    cursor: default;
    padding: 0.5rem 0.75rem;
    text-decoration: none;
    border: none;
    background: transparent;
}
</style>