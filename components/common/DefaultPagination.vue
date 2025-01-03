<template>
  <nav aria-label="Page navigation" class="mt-4">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="onPageChange(currentPage - 1)">
          이전
        </a>
      </li>
      <li v-for="page in displayedPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
        <a class="page-link" href="#" @click.prevent="onPageChange(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="onPageChange(currentPage + 1)">
          다음
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['page-change']);

const displayedPages = computed(() => {
  const pages = [];
  const maxDisplayPages = 5;
  let start = Math.max(1, props.currentPage - 2);
  let end = Math.min(props.totalPages, start + maxDisplayPages - 1);
  
  if (end - start + 1 < maxDisplayPages) {
    start = Math.max(1, end - maxDisplayPages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const onPageChange = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page);
  }
};
</script>