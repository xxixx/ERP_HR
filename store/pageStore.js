import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', {
  state: () => ({
    title: '',
  }),
  getters: {
    getTitle: (state) => state.title,
  },
  actions: {
    setTitle(title) {
      this.title = title;
    },
  },
});