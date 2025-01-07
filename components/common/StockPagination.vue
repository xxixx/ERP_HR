<template>
    <div class="pagination">
      <button @click="goToPage(1)" :disabled="currentPage === 1">1</button>
      <span v-if="showEllipsisStart">...</span>
      
      <button 
        v-for="page in visiblePages" 
        :key="page" 
        @click="goToPage(page)" 
        :disabled="currentPage === page"
      >
        {{ page }}
      </button>
      
      <span v-if="showEllipsisEnd">...</span>
      <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">{{ totalPages }}</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      totalPages: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      }
    },
    computed: {
      visiblePages() {
        const pages = [];
        const startPage = Math.max(2, this.currentPage - 1);
        const endPage = Math.min(this.totalPages - 1, this.currentPage + 1);
  
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        return pages;
      },
      showEllipsisStart() {
        return this.currentPage > 4; // 1, 2, 3, ...
      },
      showEllipsisEnd() {
        return this.currentPage < this.totalPages - 3; // ..., totalPages-2, totalPages-1, totalPages
      }
    },
    methods: {
      goToPage(page) {
        this.$emit('page-changed', page);
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    align-items: center;
  }
  button {
    margin: 0 5px;
  }
  </style>