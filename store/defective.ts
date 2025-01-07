import type { DefectiveModel } from '~/types/defective';
export const useDefectiveStore = defineStore('defeective', () => {
    const count = ref(0)
    const lastDefective = ref<Maybe<DefectiveModel>>();
    const lastDefectiveItems = computed(() => {
        return lastDefective.value?.items || []
    })
    return {
        count,
        lastDefective
    }
})