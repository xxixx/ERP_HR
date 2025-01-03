<template>
    <div ref="modalRef" class="modal" tabindex="-1" role="dialog" id="editModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detail</h5>
            <button type="button" @click="closeModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Form for editing data -->
            <!-- <p>{{ props.jaedanDetailData }}</p -->
            <form>
                <div class="">
                    <div>
                        
                    </div>
                   
                    <div>
                            <div class="d-flex align-items-center mb-1">
                            <label class="form-label col-4" for="editDate">등록일</label>
                            <input  v-model="Form.WORK_DATE" type="text"  class="form-control border border-success" id="editDate" placeholder="DATE" required>
                            <!-- <input :value="Form.REG_DATE" type="date" class="form-control border border-success" id="editDate" placeholder="DATE" required> -->
                            <!-- <input :value="formatDate(Form.REG_DATE)" @input="Form.REG_DATE = new Date($event.target.value)" class="form-control border border-success" id="editDate" placeholder="DATE" required> -->
                            <!-- <input :value="formatDate(Form.REG_DATE)" type="date" class="form-control border border-success" id="editDate" placeholder="DATE" required> -->
                            </div>
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editSupply">ASSY PART</label>
                                <input v-model="Form.ASSY_PART_NAME" type="text" class="form-control border border-success" id="editSupply" placeholder="STATE" required>
                            </div>
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editSupply">ASSY SUB NAME</label>
                                <input v-model="Form.ASSY_SUB_PART_NAME" type="text" class="form-control border border-success" id="editSupply" placeholder="STATE" required>
                            </div>
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editSupply">품명</label>
                                <input v-model="Form.JAEDAN_PART_NAME" type="text" class="form-control border border-success" id="editSupply" placeholder="STATE" required>
                            </div>
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editSupply">품번</label>
                                <input v-model="Form.PUMBUN" type="text" class="form-control border border-success" id="editSupply" placeholder="STATE" required>
                            </div>
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editLotNo">LOT NO</label>
                                <input v-model="Form.LOT" type="text" class="form-control border border-success" id="editLotNo" placeholder="LOT_NO" required>
                            </div>
                            <!-- LENGTH -->
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editLength">COUNT</label>
                                <input v-model="Form.COUNT" type="text" class="form-control border border-success" id="editLength" placeholder="LENGTH" required>
                            </div>
                            <!-- REAL_LENGTH -->
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editRealLength">WORK_DATE</label>
                                <input v-model="Form.WORK_DATE" type="text" class="form-control border border-success" id="editRealLength" placeholder="REAL_LENGTH" required>
                            </div>
                            <!-- SUPPLY -->
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editSupply">등록자</label>
                                <input v-model="Form.regAccount" type="text" class="form-control border border-success" id="editSupply" placeholder="공급자" required>
                            </div>
                            <div class="d-flex align-items-center mb-1">
                                <label class="form-label col-4" for="editSupply">작업자</label>
                                <input v-model="Form.updateAccount" type="text" class="form-control border border-success" id="editSupply" placeholder="공급자" required>
                            </div>
                           
                            <!-- REG_ACCOUNT -->
                   </div>
                    
                 
                   
                </div>
        
         
          
        </form>
         
          </div>
          <div class="modal-footer">
            <!-- <button type="button" @click="closeModal" class="btn btn-secondary" data-bs-dismiss="modal">취소</button> -->
            <button @click="closeModal" type="button" class="btn btn-primary">닫기</button>
            <button @click="generateReport" type="button" class="btn btn-primary">Report</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref, onMounted } from 'vue';
  import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
// import 'jspdf-plugin-png';
  const emit = defineEmits(['closeModal', 'update-data']);
  const props = defineProps({
    jaedanDetailData: Object // Define the prop type
  });
  const modalRef = ref(null);
  const Form = reactive({
    // WORK_ORDER_NO: 1,
    WORK_ORDER_NO: formatDate(props.jaedanDetailData.WORK_ORDER_NO),
    WONDAN_STORE: props.jaedanDetailData.WONDAN_STORE,
    LOT:  props.jaedanDetailData.LOT,
    COUNT:  props.jaedanDetailData.COUNT,
    CREATE_DATE:  props.jaedanDetailData.CREATE_DATE,
        WORK_DATE:  props.jaedanDetailData.WORK_DATE,
        regAccount:  props.jaedanDetailData.regAccount,
        updateAccount:  props.jaedanDetailData.updateAccount,
        PUMBUN:  props.jaedanDetailData.PUMBUN,
        ASSY_PART_NAME:  props.jaedanDetailData.ASSY_PART_NAME,
        ASSY_SUB_PART_NAME:  props.jaedanDetailData.ASSY_SUB_PART_NAME,
        JAEDAN_PART_NAME:  props.jaedanDetailData.JAEDAN_PART_NAME,
  });
  
  

const updateData = async () => {
  try {
    console.log('updateData', props.jaedanDetailData);
    const response = await $fetch(`/api/wondan/${props.jaedanDetailData.NO}`, {
      method: 'PUT',
      body: Form
    });
    
    console.log('Update response:', response);
    // 업데이트 성공 후 추가 작업 수행 (예: 모달 닫기, 데이터 새로고침 등)
    emit('update-data'); // 이 줄을 추가하여 'update-data' 이벤트를 발생시킵니다.
    emit('closeModal');
  } catch (error) {
    console.error('Update error:', error);
    // 에러 처리 로직 추가
  }
};
  const closeModal = () => {
    emit('closeModal');
    emit('update-data'); 
  }
  const generateReport = async () => {
  try {
     // 1. HTML 데이터 생성
     const modalElement = modalRef.value;
    const outerHTML = modalElement.outerHTML;

    // 2. 새 창에 HTML 데이터 렌더링
    const newWindow = window.open('', '_blank');
    const container = newWindow.document.createElement('div');
    container.innerHTML = outerHTML;
    newWindow.document.body.appendChild(container);

    // 3. 인쇄 대화상자 열기
    newWindow.print();

    // 4. PDF로 출력하고 싶다면 HTML-to-PDF 라이브러리 사용
    if (confirm('PDF로 저장하시겠습니까?')) {
      html2canvas(container, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('report.pdf');
      });
    }
  } catch (error) {
    console.error('Report error:', error);
  }
};
onMounted(() => {
  modalRef.value = document.getElementById('editModal');
});
  </script>
  
  <style>
   @media print {
    /* 인쇄 스타일 정의 */
    body {
      margin: 0;
      padding: 0;
    }
    .modal-content {
      width: 210mm; /* A4 용지 가로 크기 */
      height: 297mm; /* A4 용지 세로 크기 */
      margin: 0 auto;
      padding: 10mm; /* 여백 설정 */
      box-sizing: border-box;
    }
  }

  </style>