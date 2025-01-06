<template>
    <div class="modal" tabindex="-1" role="dialog" id="editModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">수정 화면</h5>
            <span class="ms-2"> (입력값이 없으면 저장되지 않습니다.)</span>
            <button type="button" @click="closeModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Form for editing data -->
            <!-- <p>{{ props.selectedItem }}</p> -->
            <form>
                <div class="">
                    <div>
                        
                    </div>
                   
                    <div>
                            <div class="d-flex align-items-center mb-1">
                            <label class="form-label col-4" for="editDate">등록일</label>
                            <input  v-model="editForm.REG_DATE" type="date"  class="form-control border border-success" id="editDate" placeholder="DATE" required>
                            <!-- <input :value="editForm.REG_DATE" type="date" class="form-control border border-success" id="editDate" placeholder="DATE" required> -->
                            <!-- <input :value="formatDate(editForm.REG_DATE)" @input="editForm.REG_DATE = new Date($event.target.value)" class="form-control border border-success" id="editDate" placeholder="DATE" required> -->
                            <!-- <input :value="formatDate(editForm.REG_DATE)" type="date" class="form-control border border-success" id="editDate" placeholder="DATE" required> -->
                            </div>
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editLotNo">LOT NO</label>
                                <input v-model="editForm.LOT_NO" type="text" class="form-control border border-success" id="editLotNo" placeholder="LOT_NO" required>
                            </div>
                            <!-- LENGTH -->
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editLength">표시길이</label>
                                <input v-model="editForm.LENGTH" type="text" class="form-control border border-success" id="editLength" placeholder="LENGTH" required>
                            </div>
                            <!-- REAL_LENGTH -->
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editRealLength">실길이</label>
                                <input v-model="editForm.REAL_LENGTH" type="text" class="form-control border border-success" id="editRealLength" placeholder="REAL_LENGTH" required>
                            </div>
                            <!-- SUPPLIER -->
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editSupply">공급사</label>
                                <input v-model="editForm.SUPPLIER" type="text" class="form-control border border-success" id="editSupply" placeholder="공급자" required>
                            </div>
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editSupply">상태</label>
                                <input v-model="editForm.STATE" type="text" class="form-control border border-success" id="editSupply" placeholder="STATE" required>
                            </div>
                            <!-- REG_ACCOUNT -->
                   </div>
                    
                    <!-- LOT_NO -->
                   
                </div>
          <!-- Edit form fields -->
          <!-- Date -->
         
          
        </form>
            <!-- Add your form fields here -->
          </div>
          <div class="modal-footer">
            <button type="button" @click="closeModal" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
            <button @click="updateData" type="button" class="btn btn-primary">저장</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  const emit = defineEmits(['closeModal', 'update-data']);
  const props = defineProps({
    selectedItem: Object // Define the prop type
  });
  const editForm = reactive({
        REG_DATE: formatDate(props.selectedItem.REG_DATE),
        WONDAN_NAME: props.selectedItem.WONDAN_NAME,
        LOT_NO:  props.selectedItem.LOT_NO,
        LENGTH:  props.selectedItem.LENGTH,
        REAL_LENGTH:  props.selectedItem.REAL_LENGTH,
        SUPPLIER:  props.selectedItem.SUPPLIER,
        DEFECTIVE_LENGTH:  props.selectedItem.DEFECTIVE_LENGTH,
        STATE:  props.selectedItem.STATE,
  });
  
  
const updateData = async () => {
  // 빈 값 체크
  const isAnyFieldEmpty = !editForm.LOT_NO || 
                          !editForm.LENGTH || 
                          !editForm.REAL_LENGTH || 
                          !editForm.SUPPLIER || 
                          !editForm.STATE;

  // 기존 값과 입력값 비교
  // const isChanged = Object.keys(originalData).some(key => originalData[key] !== editForm[key]);

  // 입력값이 없고 기존 값도 동일한 경우
  if (isAnyFieldEmpty && !isChanged) {
    alert('모든 필드를 입력해 주세요.'); // 빈 값일 경우 경고 메시지
    return; // 함수 종료
  }

  // 변경된 값이 없을 경우 경고 메시지 표시
  // if (!isChanged && !isAnyFieldEmpty) {
  //   alert('변경된 값이 없습니다.'); // 변경된 값이 없을 경우 경고 메시지
  //   return; // 함수 종료
  // }

  try {
    console.log('updateData', props.selectedItem);
    const response = await $fetch(`/api/wondan/${props.selectedItem.NO}`, {
      method: 'PUT',
      body: editForm
    });
    console.log('Update response:', editForm);
    // 업데이트 성공 후 추가 작업 수행 (예: 모달 닫기, 데이터 새로고침 등)
    console.log('Update response:', response);
    emit('update-data'); // 이 줄을 추가하여 'update-data' 이벤트를 발생시킵니다.
    emit('closeModal');
  } catch (error) {
    console.error('Update error:', error);
    // 에러 처리 로직 추가
  }
};

// const updateData = async () => {
//   // 빈 값 체크
//   const isAnyFieldEmpty = !editForm.LOT_NO || 
//                           !editForm.LENGTH || 
//                           !editForm.REAL_LENGTH || 
//                           !editForm.SUPPLIER || 
//                           !editForm.STATE;

//   // 기존 값과 입력값 비교
//   const isChanged = Object.keys(originalData).some(key => originalData[key] !== editForm[key]);

//   // 입력값이 없고 기존 값도 동일한 경우
//   if (isAnyFieldEmpty && !isChanged) {
//     alert('모든 필드를 입력해 주세요.'); // 빈 값일 경우 경고 메시지
//     return; // 함수 종료
//   }

//   // 변경된 값이 없을 경우 경고 메시지 표시
//   if (!isChanged) {
//     alert('변경된 값이 없습니다.'); // 변경된 값이 없을 경우 경고 메시지
//     return; // 함수 종료
//   }
//   try {
//     console.log('updateData', props.selectedItem);
//     const response = await $fetch(`/api/wondan/${props.selectedItem.NO}`, {
//       method: 'PUT',
//       body: editForm
//     });
//     console.log('Update response:', editForm);
//   // 업데이트 성공 후 추가 작업 수행 (예: 모달 닫기, 데이터 새로고침 등)
//     console.log('Update response:', response);
//     // 업데이트 성공 후 추가 작업 수행 (예: 모달 닫기, 데이터 새로고침 등)
//     emit('update-data'); // 이 줄을 추가하여 'update-data' 이벤트를 발생시킵니다.
//     emit('closeModal');
//   } catch (error) {
//     console.error('Update error:', error);
//     // 에러 처리 로직 추가
//   }
// };
  const closeModal = () => {
    emit('closeModal');
    emit('update-data'); 
  }
  onMounted(() => {
    editForm.REG_DATE = new Date().toISOString().split('T')[0];
    });
  </script>
  
  <style>
  .modal {
    display: block; /* 초기에는 모달 숨김 */
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
  }
  </style>