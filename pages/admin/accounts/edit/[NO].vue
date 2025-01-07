<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-body p-4">
                        <div class="mb-4">
                                  <h2 class="card-title h4 mb-2">회원 정보 수정</h2>
                            <p class="text-muted small mb-0">계정 상세 정보를 수정할 수 있습니다.</p>
                        </div>

                        <div class="mb-4">
                            <div class="form-group mb-3 d-flex">
                                <label class="form-label w-25">이메일</label>
                                <input type="text" v-model="accountData.EMAIL" 
                                    class="form-control" 
                                    placeholder="이메일" readonly />
                            </div>
                            
                            <div class="form-group mb-3 d-flex">
                                <label class="form-label w-25">ROLE
                                    <!-- <span class="ms-5">{{ accountData.ROLE }}</span> -->
                                </label>
                                <!-- <div class="text-strong small mb-2">현재 역할: {{ accountData.ROLE }}</div> -->
                                <select v-model="accountData.ROLE" 
                                    class="form-select"
                                    @change="handleRoleChange">
                                    <option value="">역할을 선택하세요</option>
                                    <option v-for="role in roles" 
                                        :key="role.ROLE_NO" 
                                        :value="role.ROLE_NAME"
                                        :selected="role.ROLE_NAME === accountData.ROLE">
                                        {{ role.ROLE_NAME }}
                                    </option>
                                </select>
                            </div>
                            
                            <div class="form-group mb-3 d-flex">
                                <label class="form-label w-25">POSITION 
                                    <!-- <span class="ms-5">{{ accountData.POSITION }}</span> -->
                                </label>
                                <!-- <div class="text-muted small mb-2">현재 직책: {{ accountData.POSITION }}</div> -->
                                <select v-model="accountData.POSITION" 
                                    class="form-select"
                                    @change="handlePositionChange">
                                    <option value="">직책을 선택하세요</option>
                                    <option v-for="position in accountPosition" 
                                        :key="position.index" 
                                        :value="position.POSITION_NAME"
                                        :selected="position.POSITION_NAME === accountData.POSITION">
                                        {{ position.POSITION_NAME }}
                                    </option>
                                </select>
                            </div>
                            
                            <div class="form-group mb-3 d-flex">
                                <label class="form-label w-25">LEVEL</label>
                                <select v-model.number="accountData.LEVEL" 
                                    class="form-select"
                                    @change="handleLevelChange">
                                    <option v-for="level in 20" :key="level" :value="level">
                                        {{ level }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group mb-3 d-flex">
                                <label class="form-label w-25">계정 상태</label>
                                <!-- <div class="text-muted small mb-2">현재 상태: {{ accountData.ACCOUNT_STATE === 1 ? '활성' : '비활성' }}</div> -->
                                <select v-model="accountData.ACCOUNT_STATE" 
                                    class="form-select"
                                    @change="handleStateChange">
                                    <option :value="1">활성</option>
                                    <option :value="0">비활성</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="d-flex gap-2">
                            <button @click="router.push('/admin/accounts')" 
                                class="btn btn-outline-secondary flex-grow-1">
                                <i class="fas fa-times me-2"></i>
                                취소
                            </button>
                            <button @click="updateAccount" 
                                class="btn btn-primary flex-grow-1">
                                <i class="fas fa-save me-2"></i>
                                저장
                            </button>
                            <button @click="deleteAccount" 
                                class="btn btn-danger flex-grow-1 disabled">
                                <i class="fas fa-trash me-2"></i>
                                삭제
                            </button>
                        </div>
                    </div>
                    <!--  -->
                    <div class="mx-4">
                        <button @click="changePassword" 
                        class="btn btn-outline-secondary w-100">
                        <i class="fas fa-lock me-2"></i>
                       비밀번호 변경
                    </button>
                    <div v-if="passwordForm" class="">
                         <div>
                        <div class="mb-3">
                            <label for="password" class="form-label">패스워드</label>
                            <div class="input-group">
                                <input 
                                :type="showPassword ? 'text' : 'password'"
                                id="password"
                                v-model="new_password"
                                class="form-control" 
                                placeholder="패스워드를 입력하세요."
                                required
                                />
                                <span class="input-group-text" @click="togglePassword">
                                    <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button @click="updatePassword" 
                        class="btn btn-outline-secondary flex-grow-1 w-100">
                        <i class="fas fa-key me-2"></i>
                       비밀번호 변경 저장
                    </button>
                    </div>
                    </div>
                    
                   
                    <!--  -->
                </div>
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
    LEVEL: null,
    CREATE_DATE: '',
    ACCOUNT_STATE: ''
});

// 역할 및 직책 목록
const roles = ref([]);
const accountPosition = ref([]);

// 역할 목록 가져오기
const fetchRoles = async () => {
    try {
        const result = await $fetch('/api/account/getRoles', {
            method: 'GET'
        });
        
        if (result.data) {
            roles.value = result.data;
            console.log("역할 목록 로드됨:", roles.value);
        }
    } catch (error) {
        console.error('역할 목록 가져오기 실패:', error);
    }
};

// 직책 목록 가져오기
const fetchAccountPosition = async () => {
    try {
        const result = await $fetch('/api/account/getAccountPosition', {
            method: 'GET'
        });
        
        if (result.data) {
            accountPosition.value = result.data;
            console.log("직책 목록 로드됨:", accountPosition.value);
        }
    } catch (error) {
        console.error('직책 목록 가져오기 실패:', error);
    }
};

// 계정 정보 가져오기
const fetchAccount = async () => {
    try {
        const response = await $fetch(`/api/account/detail/${route.params.NO}`);
        console.log('서버 응답:', response); // 전체 응답 확인
        if (response.success && response.data) {
            console.log('LEVEL 값:', response.data.LEVEL); // LEVEL 값 확인
            accountData.value = {
                EMAIL: response.data.EMAIL || '',
                ROLE: response.data.ROLE || '',
                POSITION: response.data.POSITION || '',
                LEVEL: parseInt(response.data.LEVEL),
                ACCOUNT_STATE: response.data.ACCOUNT_STATE
            };
            console.log('변환 후 accountData:', accountData.value); // 변환된 데이터 확인
        } else {
            throw new Error(response.message || '계정 정보를 가져오는데 실패했습니다.');
        }
    } catch (error) {
        console.error('계정 정보 조회 실패:', error);
        alert('계정 정보를 가져오는데 실패했습니다.');
    }
};

// 이벤트 핸들러
const handleRoleChange = () => console.log('선택된 역할:', accountData.value.ROLE);
const handlePositionChange = () => console.log('선택된 직책:', accountData.value.POSITION);
const handleLevelChange = () => {
    console.log('선택된 레벨:', accountData.value.LEVEL);
};
const handleStateChange = () => console.log('선택된 상태:', accountData.value.ACCOUNT_STATE);

// 계정 정보 업데이트
const updateAccount = async () => {
    try {
        const response = await $fetch(`/api/account/detail/${route.params.NO}`, {
            method: 'PUT',
            body: {
                ROLE: accountData.value.ROLE,
                POSITION: accountData.value.POSITION,
                LEVEL: accountData.value.LEVEL,
                ACCOUNT_STATE: accountData.value.ACCOUNT_STATE
            }
        });

        if (response && response.success) {
            alert('계정 정보가 성공적으로 업데이트되었습니다.');
            router.push('/admin/accounts');
        } else {
            alert(response?.message || '계정 정보 업데이트에 실패했습니다.');
        }
    } catch (error) {
        console.error('계정 업데이트 중 오류 발생:', error);
        alert('계정 정보 업데이트 중 오류가 발생했습니다.');
    }
};

// 계정 삭제
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

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
    await Promise.all([fetchAccount(), fetchRoles(), fetchAccountPosition()]);
});

// 비밀번호 변경
const EMAIL = ref('');
const message = ref('');
const showPassword = ref(false);
const new_password = ref('');
const togglePassword = () => {
    showPassword.value = !showPassword.value;
};
const passwordForm = ref(false);
const changePassword = () => {
    passwordForm.value = !passwordForm.value;
};
const updatePassword = async () => {
    EMAIL.value = accountData.value.EMAIL;
    try {
    console.log('비밀번호 업데이트 요청, 이메일:', EMAIL.value, '새 비밀번호:', new_password.value);
    const response = await $fetch('/api/account/update-password', {
      method: 'POST',
      body: { EMAIL: EMAIL.value, new_password: new_password.value },
    });
    message.value = response.message;
  } catch (error) {
    message.value = '비밀번호 업데이트 중 오류가 발생했습니다.';
  }
};
</script>

<style scoped>
.card {
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-label {
    font-weight: bold;
    margin-bottom: 10px;
}

.form-control {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.btn-primary:hover {
    background-color: #0069d9;
}

.btn-outline-secondary {
    background-color: #fff;
    border: 1px solid #ccc;
    color: #333;
}

.btn-outline-secondary:hover {
    background-color: #f8f9fa;
}

.btn-danger {
    background-color: #dc3545;
    color: #fff;
}

.btn-danger:hover {
    background-color: #c82333;
}
</style>
