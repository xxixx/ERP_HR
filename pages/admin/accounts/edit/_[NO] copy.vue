<template>
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-2xl font-bold mb-6">계정 상세 정보</h1>
            accountData{{ accountData }}
            roles{{ roles }}
            accountPosition{{ accountPosition }}
            <div v-if="accountData" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="form-group">
                        <label class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                        <input type="email" v-model="accountData.EMAIL" class="form-input" disabled />
                    </div>
                    
                    <div class="form-group">
                        <label class="block text-gray-700 text-sm font-bold mb-2">역할</label>
                        <div class="mb-2">현재 역할: {{ accountData.ROLE }}</div>
                        <select 
                            v-model="accountData.ROLE" 
                            class="form-select w-full px-3 py-2 border rounded-lg"
                            @change="handleRoleChange"
                        >
                            <option value="">역할을 선택하세요</option>
                            <option 
                                v-for="role in roles" 
                                :key="role.ROLE_NO" 
                                :value="role.ROLE_NAME"
                                :selected="role.ROLE_NAME === accountData.ROLE"
                            >
                                {{ role.ROLE_NAME }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="block text-gray-700 text-sm font-bold mb-2">직책</label>
                        <div class="mb-2">현재 직책: {{ accountData.POSITION }}</div>
                        <select 
                            v-model="accountData.POSITION" 
                            class="form-select w-full px-3 py-2 border rounded-lg"
                            @change="handlePositionChange"
                        >
                            <option value="">직책을 선택하세요</option>
                            <option 
                                v-for="position in accountPosition" 
                                :key="position.index" 
                                :value="position.POSITION_NAME"
                                :selected="position.POSITION_NAME === accountData.POSITION"
                            >
                                {{ position.POSITION_NAME }}
                            </option>
                        </select>
                    </div>
                    
                    <!-- <div class="form-group">
                        <label class="block text-gray-700 text-sm font-bold mb-2">직책</label>
                        <input type="text" v-model="accountData.POSITION" class="form-input" />
                    </div> -->
                    
                    <div class="form-group">
                        <label class="block text-gray-700 text-sm font-bold mb-2">계정 상태</label>
                        <div class="mb-2">현재 상태: {{ accountData.ACCOUNT_STATE === 1 ? '활성' : '비활성' }}</div>
                        <select 
                            v-model="accountData.ACCOUNT_STATE" 
                            class="form-select w-full px-3 py-2 border rounded-lg"
                            @change="handleStateChange"
                        >
                            <option :value="1">활성</option>
                            <option :value="0">비활성</option>
                        </select>
                    </div>
                </div>
                
                <div class="flex justify-end space-x-4 mt-6">
                    <button @click="router.push('/admin/accounts')" class="btn-secondary">
                        취소
                    </button>
                    <button @click="updateAccount" class="btn-primary">
                        저장
                    </button>
                    <button @click="deleteAccount" class="btn-danger">
                        삭제
                    </button>
                </div>
            </div>
            <div v-else class="text-center py-8">
                <p class="text-gray-600">계정 정보를 불러오는 중...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetch } from '@vueuse/core';

const route = useRoute();
const router = useRouter();

// 계정 데이터 초기화
const accountData = ref({
    NO: null,
    EMAIL: '',
    ROLE: '',
    POSITION: '',
    CREATE_DATE: '',
    ACCOUNT_STATE: ''
});

// 역할 목록을 저장할 ref
const roles = ref([]);
const accountPosition = ref([]);

// 역할 목록 가져오기
const fetchRoles = async () => {
    try {
        const result = await $fetch('/api/account/getRoles', {
            method: 'GET'
        });
        
        console.log("Roles response:", result.data);
        if (result.data) {
            roles.value = result.data;
            console.log("Roles loaded:", roles.value);
        } else {
            console.error('Failed to load roles:', result.data);
        }
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
};
const fetchAccountPosition = async () => {
    try {
        const result = await $fetch('/api/account/getAccountPosition', {
            method: 'GET'
        });
        
        console.log("getAccountPosition response:", result.data);
        if (result.data) {
            accountPosition.value = result.data;
            console.log("getAccountPosition loaded:", accountPosition.value);
        } else {
            console.error('Failed to load getAccountPosition:', result.data);
        }
    } catch (error) {
        console.error('Error fetching getAccountPosition:', error);
    }
};

const fetchAccount = async () => {
    const NO = route.params.NO;
    try {
        const { data } = await useFetch(`/api/account/detail/${NO}`, {
            method: 'GET'
        });
        
        console.log("API Response:", data.value);
        if (!data.value) {
            throw new Error('서버로부터 응답을 받지 못했습니다.');
        }

        // API 응답 데이터를 파싱하고 accountData에 할당
        const responseData = JSON.parse(data.value);
        console.log("Parsed response:", responseData);

        if (responseData.success && responseData.data) {
            accountData.value = responseData.data;
            console.log("Account data loaded:", accountData.value);
        } else {
            console.error('Invalid response data:', responseData);
            throw new Error('계정 정보를 불러올 수 없습니다.');
        }
    } catch (error) {
        console.error('계정 정보를 가져오는 중 오류 발생:', error);
        alert(error.message || '계정 정보를 가져오는데 실패했습니다.');
        router.push('/admin/accounts');
    }
};

const handleRoleChange = (event) => {
    console.log('선택된 역할:', accountData.value.ROLE);
};
const handlePositionChange = (event) => {
    console.log('선택된 역할:', accountData.value.POSITION);
};

const handleStateChange = (event) => {
    console.log('선택된 상태:', accountData.value.ACCOUNT_STATE);
};

const updateAccount = async () => {
    try {
        const NO = route.params.NO;
        
        // 현재 계정 데이터 출력
        console.log('현재 계정 데이터:', accountData.value);
        
        // 필수 필드 검증
        if (!accountData.value.ROLE) {
            throw new Error('역할을 선택해주세요.');
        }

        const updateData = {
            ROLE: accountData.value.ROLE,
            POSITION: accountData.value.POSITION || '',
            ACCOUNT_STATE: parseInt(accountData.value.ACCOUNT_STATE)
        };
        
        console.log('전송할 데이터:', JSON.stringify(updateData));

        const response = await $fetch(`/api/account/detail/${NO}`, {
            method: 'PUT',
            body: updateData
        });

        console.log('서버 응답:', response);

        if (!response.success) {
            throw new Error(response.message || '계정 수정에 실패했습니다.');
        }

        alert('계정이 성공적으로 수정되었습니다.');
        router.push('/admin/accounts');
    } catch (error) {
        console.error('Error updating account:', error);
        alert(error.message || '계정 수정 중 오류가 발생했습니다.');
    }
};

const deleteAccount = async () => {
    if (!confirm('정말로 이 계정을 삭제하시겠습니까?')) return;
    
    try {
        const NO = route.params.NO;
        console.log('Deleting account NO:', NO);

        const { data: response } = await useFetch(`/api/account/detail/${NO}`, {
            method: 'DELETE'
        });

        if (!response.value) {
            throw new Error('서버로부터 응답을 받지 못했습니다.');
        }

        alert('계정이 성공적으로 삭제되었습니다.');
        router.push('/admin/accounts');
    } catch (error) {
        console.error('Error deleting account:', error);
        alert(error.message || '계정 삭제 중 오류가 발생했습니다.');
    }
};

// 컴포넌트 마운트 시 계정 정보와 역할 목록 모두 가져오기
onMounted(async () => {
    await Promise.all([fetchAccount(), fetchRoles(), fetchAccountPosition()]);
});
</script>

<style scoped>
.form-input,
.form-select {
    @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50;
}

.btn-primary {
    @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50;
}

.btn-secondary {
    @apply bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50;
}

.btn-danger {
    @apply bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50;
}
</style>
