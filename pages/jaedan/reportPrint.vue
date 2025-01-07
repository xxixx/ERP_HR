<template>
  <div ref="modalRef" class="modal" tabindex="-1" role="dialog" id="editModal">
    <div class="" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">공정진행표 {{ data.PROCESSCODE }}</h5>
        </div>
        <div class="container">
          <img src="https://placehold.co/300x400" alt="Logo" />
          <div class="barcode-container">
            <img ref="barcodeImg" id="barcodeImg" alt="Barcode" />
            <!-- 바코드를 출력할 이미지 요소 -->
          </div>
          <form>
            <div class="">
              <div>Repor{{ data }}</div>
              {{ data.PUMBUN }}
              {{ data.PROCESSCODE }}
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
          <button @click="goBack" type="button" class="btn btn-primary">
            이전페이지
          </button>
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import JsBarcode from "jsbarcode";

const route = useRoute();
const router = useRouter();
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
  PROCESSCODE: "",
});

const barcodeImg = ref(null);

const generateBarcode = () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  JsBarcode(svg, data.value.PROCESSCODE || "123456789", {
    // 데이터가 없을 경우 임시 값 사용
    format: "CODE128",
    lineColor: "#0aa",
    width: 2,
    height: 40,
    displayValue: true,
  });

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    barcodeImg.value.src = canvas.toDataURL("image/png");
    URL.revokeObjectURL(url);
  };
  img.src = url;
};

const generateReport = () => {
  generateBarcode();
  window.print();
  printWindow.close();
  // printWindow.onafterprint = function() {
  //   printWindow.close(); // 프린트가 완료되면 창을 닫습니다.
  // };
};
const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  const params = route.query;
  if (params.data) {
    data.value = JSON.parse(params.data);
  }
  generateBarcode(); // 컴포넌트가 마운트될 때 바코드를 생성
});
</script>

<style scoped>
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
.modal-content {
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.barcode-container {
  text-align: center;
}
#barcodeImg {
  display: inline-block;
}
</style>
