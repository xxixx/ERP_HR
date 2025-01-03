import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { WorksModel } from '~/types/works';

export const useWorkStore = defineStore({
  id: 'works',
  state: () => ({
    jaedanItems: [] as WorksModel[],
  }),
  actions: {
    addItem(item: WorksModel) {
      this.jaedanItems.push(item);
    },
  },
});