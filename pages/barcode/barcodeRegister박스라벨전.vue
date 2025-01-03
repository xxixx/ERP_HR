<template>
  <div>
    <div class="container mt-4 main-container">
      production {{ production }}
      <hr>
      BarcodeCount{{ BarcodeCount }}
      <h4 class="text-center">Barcode Scanner</h4>
      <div class="row"></div>
      <div class="row">
        <div class="col">
          <div class="mb-3 d-flex align-items-center" style="text-align: left">
            <strong style="width: 200px">공정번호</strong>
            <input
              v-model="production.PROCESSCODE"
              class="form-control"
              type="text"
              placeholder=""
              name=""
              disabled
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex">
          <div
            class="mb-3 d-flex align-items-center flex-fill me-3"
            style="text-align: left"
          >
            <span style="width: 200px">재단수량</span>
            <input
              class="form-control"
              v-model="production.COUNT"
              type="text"
              placeholder=""
              name=""
            />
          </div>
          <div
            class="mb-3 d-flex align-items-center flex-fill"
            style="text-align: left"
          >
            <spanp style="width: 200px">출력한바코드수</spanp>
            <input
              class="form-control"
              v-model="production.LAST_SERIAL_NUMBER2"
              type="text"
              placeholder=""
              name=""
            />
          </div>
          <div
            class="mb-3 d-flex align-items-center flex-fill"
            style="text-align: left"
          >
            <spanp style="width: 200px">등록한바코드수</spanp>
            <input
              class="form-control"
              v-model="BarcodeCount"
              type="text"
              placeholder=""
              name=""
            />
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col d-flex">
          <div
            class="mb-3 d-flex align-items-center flex-fill me-3"
            style="text-align: left"
          >
            <span style="width: 200px">박스수량</span>
            <input
              class="form-control"
              v-model.number="quantity"
              type="number"
              min="1"
            />
          </div>
          <div
            class="mb-3 d-flex align-items-center flex-fill"
            style="text-align: left"
          >
            <button
              class="btn btn-warning btn-sm"
              @click="startScanning"
              :disabled="isScanning"
            >
              Start Scanning
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex">
          <div
            v-if="isScanning"
            class="mb-3 d-flex align-items-center flex-fill me-3"
            style="text-align: left"
          >
            <input
              class="form-control"
              v-model="scannedBarcode"
              placeholder="Scan barcode"
              @input="handleBarcodeInput"
            />
          </div>
        </div>
      </div>
      <div class="">
        <!--  -->
        <!-- <div class="" >
                        <div class="card shadow mb-3" >
                            <div class="card-header py-3">
                                <p class="text-primary m-0 fw-bold"><strong><span style="color: rgb(133, 135, 150); background-color: rgb(255, 255, 255);">PROCESS CODE</span></strong></p>
                            </div>
                            <div class="card-header py-3">
                                <p class="text-primary m-0 fw-bold">박스라벨</p>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3" style="text-align: left;"><label class="form-label" for="username" style="text-align: left;"><strong>등록일자</strong></label><input  class="form-control" type="text" placeholder="" name="" /></div>
                                            <div class="mb-3" style="text-align: left;"><label class="form-label" for="username"><strong>작업등록 번호</strong></label><input id="username-2" class="form-control" type="text" placeholder="" name="" /></div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3" style="text-align: left;"><label class="form-label" for="username"><span style="color: rgb(33, 37, 41);">ASSY PART</span></label><input  class="form-control" type="text" placeholder="" name="" /></div>
                                            <div class="mb-3" style="text-align: left;"><label class="form-label" for="email"><span style="color: rgb(33, 37, 41);">ASSY SUB NAME</span></label><input  class="form-control" type="" placeholder="" name="" /></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3"><label class="form-label" for="first_name"><strong>품명</strong></label><input id="first_name" class="form-control" type="text" placeholder="" name="first_name" /></div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3"><label class="form-label" for="last_name"><strong>품번</strong></label><input id="last_name" class="form-control" type="text" placeholder="" name="last_name" /></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                            <div class="d-grid gap-1">
                                <button class="btn btn-success btn-sm outline" @click="BoxLabelPrint">PRINT</button>
                             </div>
                            <hr>
                     </div> -->
        <!--  -->
        <div class="table-responsive text-center d-flex justify-content-center">
          <div class="table table-striped table-bordered text-center">
            <!-- <div class="table-responsive text-start"  > -->
            <table class="table table-sm text-center">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>BARCODE</th>
                  <th>DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(barcode, index) in scannedBarcodes" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ barcode }}</td>
                  <td>{{ currentDate }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="" v-if="boxView">
       
          <div class="card shadow mb-3" ref="printableElement">
            <div class="card-header py-3">
              <p class="text-primary m-0 fw-bold">
                <strong
                  ><span
                    style="
                      color: rgb(133, 135, 150);
                      background-color: rgb(255, 255, 255);
                    "
                    >PROCESS CODE</span
                  ></strong
                >
              </p>
            </div>
            <div class="card-header py-3">
              <p class="text-primary m-0 fw-bold">박스라벨</p>
            </div>
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col">
                    <div class="mb-3" style="text-align: left">
                      <label
                        class="form-label"
                        for="username"
                        style="text-align: left"
                        ><strong>등록일자</strong></label
                      ><input
                        class="form-control"
                        type="text"
                        placeholder=""
                        name=""
                      />
                    </div>
                    <div class="mb-3" style="text-align: left">
                      <label class="form-label" for="username"
                        ><strong>작업등록 번호</strong></label
                      ><input
                        v-model="production.PROCESSCODE"
                        id=""
                        class="form-control"
                        type="text"
                        placeholder=""
                        name=""
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label" for="last_name"
                        ><strong>품번</strong></label
                      ><input
                        v-model="production.PUMBUN"
                        id=""
                        class="form-control"
                        type="text"
                        placeholder=""
                        name=""
                      />
                    </div>
                    <div class="mb-3" style="text-align: left">
                      <label class="form-label" for="username"
                        ><span style="color: rgb(33, 37, 41)"
                          >ASSY PART</span
                        ></label
                      ><input
                        class="form-control"
                        type="text"
                        placeholder=""
                        name=""
                      />
                    </div>
                    <div class="mb-3" style="text-align: left">
                      <label class="form-label" for="email"
                        ><span style="color: rgb(33, 37, 41)"
                          >ASSY SUB NAME</span
                        ></label
                      ><input
                        v-model="production.ASSY_PART_NAME"
                        class="form-control"
                        type=""
                        placeholder=""
                        name=""
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label" for="first_name"
                        ><strong>수량</strong></label
                      ><input
                        v-model.number="quantity"
                        id=""
                        class="form-control"
                        type="text"
                        placeholder=""
                        name=""
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label" for="last_name"
                        ><strong>서명</strong></label
                      ><input
                        id=""
                        class="form-control"
                        type="text"
                        placeholder=""
                        name=""
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="btn btn-success btn-sm" @click="BoxLabelPrint">PRINT</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const processCode = ref(route.query.processCode || "");
const production = ref("");
const quantity = ref(0);
const scannedBarcode = ref("");
const scannedBarcodes = ref([]);
const isScanning = ref(false);
const currentDate = computed(() => new Date().toISOString().split("T")[0]);
const boxView = ref(false);

const startScanning = () => {
  if (quantity.value <= 0) {
    alert("Please enter a valid quantity");
    return;
  }
  boxView.value = false;
  isScanning.value = true;
  scannedBarcodes.value = [];
};

const handleBarcodeInput = () => {
  const barcode = scannedBarcode.value.trim();

  if (barcode) {
    if (scannedBarcodes.value.includes(barcode)) {
      alert("Duplicate barcode detected");
      scannedBarcode.value = "";
      return;
    }

    scannedBarcodes.value.push(barcode);
    scannedBarcode.value = "";

    // Save scanned barcodes to the server
    saveScannedBarcodes(barcode);

    if (scannedBarcodes.value.length >= quantity.value) {
      alert("Input completed");
      isScanning.value = false; // Save scanned barcodes to the server
      boxView.value = true;
      // saveScannedBarcodes(barcode);
      saveScannedBarcodes(null); // 전체 바코드 저장
    }
  }
};

const saveScannedBarcodes = async (barcode) => {
  try {
    if (barcode) {
      const response = await fetch("/api/scannedBarcode", {
        // const response = await fetch('/api/test_scannedBarcode/scannedBarcode', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ barcode, date: currentDate.value}),
        body: JSON.stringify({
          barcode,
          date: currentDate.value,
          processCode: processCode.value,
        }),
      });
      const data = await response.json();
      //   if (!response.ok) {
      if (data.error) {
        alert(data.error);
        const error = await response.text();
        if (error === "이미 등록된 바코드입니다.") {
          alert(error);
        } else {
          throw new Error(error);
        }
      }
    } else {
      const response = await fetch('/api/scannedBarcodes', {
      // const response = await fetch("/api/test_scannedBarcode/scannedBarcodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barcodes: scannedBarcodes.value,
          date: currentDate.value,
          processCode: processCode.value,
        }),
      });
      const data = await response.json();
      // if (!response.ok) {
      if (data.error) {
        alert(data.error);
        //   const error = await response.text();
        //   throw new Error(error);
      }
    }
  } catch (error) {
    console.error("Error saving scanned barcode:", error);
    boxView.value = false;
    alert("중복된 바코드가 있습니다. 확인하세요");
    //   alert('Failed to save scanned barcode');
  }
};

const productionData = async () => {
  const response = await fetch(
    `/api/production/getprocessCode/${processCode.value}`,
  );
  console.log("response",response);

  production.value = await response.json();
  console.log("productionData 호출", production.value);
};
const printableElement = ref(null);
const BoxLabelPrint = () => {
  //     const printContents = printableElement.value.innerHTML;
  //   const originalContents = document.body.innerHTML;

  //   document.body.innerHTML = printContents;

  //   window.print();

  //   document.body.innerHTML = originalContents;
  router.push({
    path: "/barcode/boxPrint",
    query: {
      barcode: production.value.barcode,
      pumbun: production.value.PUMBUN,
      quantity: quantity.value,
      processCode: processCode.value,
    },
  });
};
const BarcodeCount = ref(0);
const fetchBarcodeCount = async () => {
  console.log("fetchBarcodeCount 호출",processCode.value);
  const response = await fetch(
    `/api/production/barcodeCount/${processCode.value}`,
  );
  const data = await response.json();
  BarcodeCount.value = data.barcodeCount;
  if (response.ok) {
    // 가져온 바코드 수량을 사용하여 UI 업데이트
    // 예: production.value.BARCODE_COUNT = data.barcodeCount;
  } else {
    console.error("Error fetching barcode count:", data.error);
  }
};
onMounted(async () => {
  await productionData();
  await fetchBarcodeCount();
});
</script>
<style scoped>
.main-container {
  max-width: 700px;
  padding: 100px, 0;
}
</style>
