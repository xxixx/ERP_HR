<template>
  <div ref="modalRef" class="modal" tabindex="-1" role="dialog" id="editModal">
    <div class="" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Report</h5>
        </div>
        <div class="container">
          <form>
            <div class="">
              <div>Report</div>
              <div
                class="d-flex align-items-center mb-1 justify-content-between"
              >
                <div class="d-flex align-items-center mb-1">
                  <label class="form-label col-4" for="editDate"
                    >등록일 {{ data.WORK_DATE }}</label
                  >
                  <input
                    v-model="data.WORK_DATE"
                    type="text"
                    class="form-control border border-success"
                    id="editDate"
                    placeholder="DATE"
                    required
                  />
                </div>
                <div class="d-flex align-items-center mb-1">
                  <label class="form-label col-4" for="editRealLength"
                    >작업일</label
                  >
                  <input
                    v-model="data.WORK_DATE"
                    type="text"
                    class="form-control border border-success"
                    id="editRealLength"
                    placeholder="REAL_LENGTH"
                    required
                  />
                </div>
              </div>
              <hr />
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply"
                  >ASSY PART</label
                >
                <input
                  v-model="data.ASSY_PART_NAME"
                  type="text"
                  class="form-control border border-success"
                  id="editSupply"
                  placeholder="STATE"
                  required
                />
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply"
                  >ASSY SUB NAME</label
                >
                <input
                  v-model="data.ASSY_SUB_PART_NAME"
                  type="text"
                  class="form-control border border-success"
                  id="editSupply"
                  placeholder="STATE"
                  required
                />
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply">품명</label>
                <input
                  v-model="data.JAEDAN_PART_NAME"
                  type="text"
                  class="form-control border border-success"
                  id="editSupply"
                  placeholder="STATE"
                  required
                />
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply">품번</label>
                <input
                  v-model="data.PUMBUN"
                  type="text"
                  class="form-control border border-success"
                  id="editSupply"
                  placeholder="STATE"
                  required
                />
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editLotNo">LOT NO</label>
                <input
                  v-model="data.LOT"
                  type="text"
                  class="form-control border border-success"
                  id="editLotNo"
                  placeholder="LOT_NO"
                  required
                />
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editLength">COUNT</label>
                <input
                  v-model="data.COUNT"
                  type="text"
                  class="form-control border border-success"
                  id="editLength"
                  placeholder="LENGTH"
                  required
                />
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply">등록자</label>
                <input
                  v-model="data.regAccount"
                  type="text"
                  class="form-control border border-success"
                  id="editSupply"
                  placeholder="공급자"
                  required
                />
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply">작업자</label>
                <input
                  v-model="data.updateAccount"
                  type="text"
                  class="form-control border border-success"
                  id="editSupply"
                  placeholder="공급자"
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button @click="generateReport" type="button" class="btn btn-primary">
            Report
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const data = ref({
  WORK_DATE: "",
  ASSY_PART_NAME: "",
  ASSY_SUB_PART_NAME: "",
  JAEDAN_PART_NAME: "",
  PUMBUN: "",
  LOT: "",
  COUNT: "",
  regAccount: "",
  updateAccount: "",
});

const generateReport = () => {
  const printWindow = window.open("", "printWindow", "width=800,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>Report</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          <form>
            <div class="">
              <div>Report</div>
              <div class="d-flex align-items-center mb-1 justify-content-between">
                <div class="d-flex align-items-center mb-1">
                  <label class="form-label col-4" for="editDate">등록일 ${data.value.WORK_DATE}</label>
                  <input value="${data.value.WORK_DATE}" type="text" class="form-control border border-success" id="editDate" placeholder="DATE" required>
                </div>
                <div class="d-flex align-items-center mb-1">
                  <label class="form-label col-4" for="editRealLength">작업일</label>
                  <input value="${data.value.WORK_DATE}" type="text" class="form-control border border-success" id="editRealLength" placeholder="REAL_LENGTH" required>
                </div>
              </div>
              <hr>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply">ASSY PART</label>
                <input value="${data.value.ASSY_PART_NAME}" type="text" class="form-control border border-success" id="editSupply" placeholder="STATE" required>
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply">ASSY SUB NAME</label>
                <input value="${data.value.ASSY_SUB_PART_NAME}" type="text" class="form-control border border-success" id="editSupply" placeholder="STATE" required>
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply">품명</label>
                <input value="${data.value.JAEDAN_PART_NAME}" type="text" class="form-control border border-success" id="editSupply" placeholder="STATE" required>
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply">품번</label>
                <input value="${data.value.PUMBUN}" type="text" class="form-control border border-success" id="editSupply" placeholder="STATE" required>
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editLotNo">LOT NO</label>
                <input value="${data.value.LOT}" type="text" class="form-control border border-success" id="editLotNo" placeholder="LOT_NO" required>
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editLength">COUNT</label>
                <input value="${data.value.COUNT}" type="text" class="form-control border border-success" id="editLength" placeholder="LENGTH" required>
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply">등록자</label>
                <input value="${data.value.regAccount}" type="text" class="form-control border border-success" id="editSupply" placeholder="공급자" required>
              </div>
              <div class="d-flex align-items-center mb-1">
                <label class="form-label col-4" for="editSupply">작업자</label>
                <input value="${data.value.updateAccount}" type="text" class="form-control border border-success" id="editSupply" placeholder="공급자" required>
              </div>
            </div>
          </form>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};

onMounted(() => {
  const params = route.query;
  if (params.data) {
    data.value = JSON.parse(params.data);
  }
});
</script>
