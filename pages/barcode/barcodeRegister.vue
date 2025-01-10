<template>
  <div>
    <div class="container mt-4 main-container">
      production {{ production }}
      processCode{{ processCode }}
     
      routQuery{{ routQuery }}
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
              v-model="ScannedBarcodecount"
              type="text"
              placeholder=""
              name=""
            />
          </div>
          <div
            class="mb-3 d-flex align-items-center flex-fill"
            style="text-align: left"
          >
            <spanp style="width: 200px">LOT</spanp>
            <input
              class="form-control"
              v-model="LOTNUMBER"
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
              placeholder="바코드를 스캔하거나 입력하세요"
              @keyup.enter="handleBarcodeInputArray"
              @paste="handlePaste"
              ref="barcodeInput"
              :disabled="!isScanning"
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
                     
                     
                     <div class="table-responsive text-center d-flex justify-content-center">
                       <div class="table table-striped table-bordered text-center">
                         <!-- 스캔 수 표시 -->
                         <div class="mb-2 border py-2 bg-secondary text-white">
                           <span>스캔된 바코드 수: </span> 
                           <span style="font-size: 1.5em;">{{ scannedBarcodes.length }} </span> 
                           <span style="font-size: 1.5em;"> /{{ quantity }}</span>
                         
                        </div>
                         <!--  -->


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
                <!-- <tr v-for="(barcode, index) in scannedBarcodes" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ barcode }}</td>
                  <td>{{ currentDate }}</td>
                </tr> -->
                <tr v-for="(barcode, index) in reversedBarcodes" :key="index">
                  <td>{{ scannedBarcodes.length - index }}</td>
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
                        ><strong>품번</strong></label
                      ><input
                        class="form-control"
                         v-model="production.PROCESSCODE"
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
                        ><strong>LOT</strong></label
                      ><input
                        v-model="LOTNUMBER"
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
const ProductCode = ref(route.query.ProductCode || "");
const PRODUCT_CODE = ref(route.query.PRODUCT_CODE || "");
const routQuery = ref(route.query);
const production = ref("");
const quantity = ref(0);
const scannedBarcode = ref("");
const scannedBarcodes = ref([]);
const ScannedBarcodecount = ref('');
const isScanning = ref(false);
const currentDate = computed(() => new Date().toISOString().split("T")[0]);
const boxView = ref(false);
// 바코드 목록을 역순으로 표시하기 위한 computed 속성
const reversedBarcodes = computed(() => {
  return [...scannedBarcodes.value].reverse();
});


// 바코드 입력 필드에 포커스
const barcodeInput = ref(null);

const focusInput = () => {
  if (barcodeInput.value) {
    barcodeInput.value.focus();
  }
};

const getLotNumber = () => {
  const today = new Date()
  return `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`
}
const LOTNUMBER = ref(getLotNumber()); // getLotNumber 함수를 호출하여 LOTNUMBER에 할당
// const startScanning = () => {
//   if (quantity.value <= 0) {
//     alert("Please enter a valid quantity");
//     return;
//   }
//   boxView.value = false;
//   isScanning.value = true;
//   scannedBarcodes.value = [];
// };
// 스캔 시작
const startScanning = async () => {
  isScanning.value = true;
  await getLotNumber();
  await nextTick(() => {
    focusInput();
  });
};
// 붙여넣기 처리
const handlePaste = (event) => {
  event.preventDefault();
  const pastedText = event.clipboardData.getData('text');
  if (pastedText) {
    scannedBarcode.value = pastedText.trim();
    handleBarcodeInputArray();
  }
};

let currentBoxNumber = 1; // 기본값은 1

const getBoxNumber = async () => {
  try {
    const response = await fetch(`/api/barcode/getLatestBoxNumber?processCode=${processCode.value}`);
    const data = await response.json();

    console.log("data response)", data);
    console.log("data response.json()", response);
    console.log("data response typeof", typeof response);
    if (data.error) {
      console.error("Error:", data.error);
      // handle the error, e.g. display an error message to the user
      return null; // or some other default value
    } else if (data) {
      console.log("data boxNumber", data);
      currentBoxNumber = data + 1;
      console.log("currentBoxNumber", currentBoxNumber);
      return currentBoxNumber;
    } else {
      currentBoxNumber = 1; // or some other default value
      return currentBoxNumber;
    }
  } catch (error) {
    console.error("박스 번호를 가져오는 중 오류 발생:", error);
    return null; // or some other default value
  }
};

const getBoxNumber2 = async () => {
  try {
    const response = await fetch(`/api/barcode/getLatestBoxNumber?processCode=${processCode.value}`);

    if (response.ok) {
      const data = await response;
      console.log("data", data);

      if (data.boxNumber) {
        currentBoxNumber = parseInt(data.boxNumber) + 1;
        console.log("currentBoxNumber", currentBoxNumber);
      } else {
        currentBoxNumber = 1;
      }

      return currentBoxNumber;
    } else {
      console.error("Error response:", response.status, response.statusText);
      return 1; // or throw an error
    }
  } catch (error) {
    console.error("박스 번호를 가져오는 중 오류 발생:", error);
    return 1; // or throw an error
  }
};
// 1개씩 저장하는 것
const handleBarcodeInput = () => {
  const barcode = scannedBarcode.value.trim();

  if (barcode) {
    if (scannedBarcodes.value.includes(barcode)) {
      alert("중복된  barcode 입니다.");
      scannedBarcode.value = "";
      return;
    }

    scannedBarcodes.value.push(barcode);
    scannedBarcode.value = "";

    // Save scanned barcodes to the server
    // saveScannedBarcodes(barcode);

    if (scannedBarcodes.value.length >= quantity.value) {
      alert("Input completed");
      isScanning.value = false; // Save scanned barcodes to the server
      boxView.value = true;
      saveScannedBarcodes(barcode);
      saveScannedBarcodes(null); // 전체 바코드 저장
    }
  }
};
//배열로 버장하는 것
// const handleBarcodeInputArray = async () => {
//   const barcode = scannedBarcode.value.trim(); // 입력된 바코드

//   if (barcode) {
//     // 클라이언트 측 중복 체크
//     if (scannedBarcodes.value.includes(barcode)) {
//       alert("이미 스캔한 바코드입니다.");
//       scannedBarcode.value = ""; // 중복일 경우 입력 필드 초기화
//       return; // 중복일 경우 함수 종료
//     }

//     // 서버로 중복 체크 요청
//     const isDuplicate = await checkBarcodeDuplicate(barcode);
//     if (isDuplicate) {
//       alert("중복된 바코드입니다.");
//       scannedBarcode.value = ""; // 중복일 경우 입력 필드 초기화
//       return; // 중복일 경우 함수 종료
//     }

//     // 바코드를 배열에 추가
//     scannedBarcodes.value.push(barcode);
//     scannedBarcode.value = ""; // 입력 필드를 초기화

//     // 설정된 개수만큼 바코드가 스캔되면 한 번에 전송
//     if (scannedBarcodes.value.length >= quantity.value) {
//       boxView.value = true;
//       saveScannedBarcodesArray(); // 배열을 서버로 전송
//     }
//   }
// };

// 바코드 입력 처리
const handleBarcodeInputArray = async () => {
  const barcode = scannedBarcode.value.trim();

  if (barcode) {
    // 클라이언트 측 중복 체크
    if (scannedBarcodes.value.includes(barcode)) {
      alert("이미 스캔한 바코드입니다.");
      scannedBarcode.value = "";
      focusInput();
      return;
    }

    // 서버로 중복 체크 요청
    const isDuplicate = await checkBarcodeDuplicate(barcode);
    if (isDuplicate) {
      alert("중복된 바코드입니다.");
      scannedBarcode.value = "";
      focusInput();
      return;
    }

    // 바코드를 배열에 추가
    scannedBarcodes.value.push(barcode);
    scannedBarcode.value = "";
    focusInput();

    // 설정된 개수만큼 바코드가 스캔되면 한 번에 전송
    if (scannedBarcodes.value.length >= quantity.value) {
      boxView.value = true;
      await saveScannedBarcodesArray();
    }
  }
};

// 서버에서 중복 체크 함수
const checkBarcodeDuplicate = async (barcode) => {
  try {
    // URL 경로에 barcode를 파라미터로 추가
    const response = await fetch(`/api/barcode/checkDuplicate/${barcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }

    const data = await response.json();
    return data.isDuplicate; // 중복 여부 반환
  } catch (error) {
    console.error('Error checking barcode duplicate:', error);
    alert('바코드 중복 검증 중 오류 발생');
    return true; // 오류 발생 시 중복으로 처리
  }
};
// 박스 번호 생성 함수
// let boxNumber = 1;
const saveScannedBarcodes = async (barcode) => {
  const lotNumber = getLotNumber();
  try {
    if (barcode) {
      const response = await fetch("/api/barcode/scannedBarcode", {
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
          lotNumber: getLotNumber(),   // LOT 번호 추가
        boxNumber: getBoxNumber()    
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
       // 전체 바코드 등록 시
      const response = await fetch('/api/barcode/scannedBarcodes', {
      // const response = await fetch("/api/test_scannedBarcode/scannedBarcodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barcodes: scannedBarcodes.value,
          date: currentDate.value,
          processCode: processCode.value,
          lotNumber: getLotNumber(),   // LOT 번호 추가
          boxNumber: boxNumber    
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

//배열로 저장
const saveScannedBarcodesArray = async () => {
  // const lotNumber = getLotNumber();
  try {
    // 새로운 박스 번호를 할당
    const boxNumber = await getBoxNumber();
    const response = await fetch("/api/barcode/scannedBarcodes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        barcodes: scannedBarcodes.value, // 배열을 서버에 전송
        date: currentDate.value,
        processCode: processCode.value,
        lotNumber:LOTNUMBER.value,   // LOT 번호 추가
        boxNumber: currentBoxNumber  
      }),
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert("바코드 저장 완료");
      scannedBarcodes.value = []; // 성공적으로 저장 후 배열 초기화
    }
    //상품재고 등록
    await $fetch("/api/inventory/stockRegisterFromBarcode", {
      method: "POST",
      body: {
        PRODUCT_NO: routQuery.value.PRODUCT_CODE, // .value를 사용하여 접근
        PRODUCT_CODE: routQuery.value.productCode, // .value를 사용하여 접근
        PRODUCT_FULLNAME: routQuery.value.PRODUCT_FULLNAME, // .value를 사용하여 접근
        PROCESSCODE: routQuery.value.processCode, // .value를 사용하여 접근
        COUNT: quantity.value,
        DATE: currentDate.value,
        LOT_NUMBER: LOTNUMBER.value,   // LOT 번호 추가
        BOX_NUMBER: currentBoxNumber  
      },
    });
  } catch (error) {
    console.error("Error saving barcodes:", error);
    alert("바코드 저장 중 오류 발생");
  }
};
// LOT 번호는 오늘 날짜로 생성


const productionData = async () => {
  const response = await fetch(
    `/api/production/getprocessCode/${processCode.value}`,
  );
  console.log("response",response);

  production.value = await response.json();
  console.log("productionData 호출", production.value);

  const ScannedBarcode = await $fetch(`/api/barcode/getScannedBarcodecount/${processCode.value}`);
    console.log("ScannedBarcodecount", ScannedBarcode);
    console.log("ScannedBarcodecount.barcodeCount============", ScannedBarcode.barcodeCount.barcode_count);
    ScannedBarcodecount.value = ScannedBarcode.barcodeCount.barcode_count;
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
      LOTNUMBER: LOTNUMBER.value
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
