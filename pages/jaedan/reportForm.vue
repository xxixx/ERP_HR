<template>
  <div class="print-only modal">
    <div
      class="d-flex flex-column"
      id="content-wrapper"
      style="text-align: right"
    >
      <div id="content">
     
        <div class="container-fluid">
          <div class="card shadow mb-4 col-lg-8"></div>
          <div class="row mb-3">
            <div class="col-lg-8">
              <!-- <div class="card">
                          <div class="">
                              <div class="card-body  justify-content-between align-items-sm-center align-items-xxl-center d-flex">
                                  <div class="d-sm-flex align-items-sm-center d-flex"><img class="me-3" src="../../assets/images/logo.png" width="40" height="40" style="width: 40px;height: 40px;">
                                      <h4 style="text-align: center;">ALKOSC&nbsp;</h4>
                                  </div>
                                  <div class="d-sm-flex align-items-sm-center d-flex">
                                      <h3 class="text-center text-dark py-1">공정진행표</h3>
                                  </div>
                                  <div class="d-sm-flex align-items-sm-center d-flex">
                                      <h3 class="text-center text-dark   py-1" style="font-size: 12.256px;">{{ data.WORK_DATE }}</h3>
                                  </div>
                              </div>
                          </div>
                      </div> -->

              <div class="row">
                <div class="col">
                  <div class="card shadow mb-1">
                    <div class="">
                      <div
                        class="card-body justify-content-between align-items-sm-center align-items-xxl-center d-flex"
                      >
                        <div class="d-sm-flex align-items-sm-center d-flex">
                          <img
                            class="me-3"
                            src="../../assets/images/logo.png"
                            width="40"
                            height="40"
                            style="width: 40px; height: 40px"
                          />
                          <h4 style="text-align: center">ALKOSC&nbsp;</h4>
                        </div>
                        <div class="d-sm-flex align-items-sm-center d-flex">
                          <h3 class="text-center text-dark py-1">공정진행표</h3>
                        </div>
                        <!-- {{ data }} -->
                        <div class="d-sm-flex align-items-sm-center d-flex">
                          <h3
                            class="text-center text-dark"
                            style="font-size: 12.256px"
                          >
                          {{ data.WORK_DATE ? formatDate(data.WORK_DATE) : '날짜가 없습니다' }}
                            <!-- {{ formatDate(data.WORK_DATE) }} -->
                          </h3>
                        </div>
                      </div>
                    </div>
                    <hr style="margin: 0" />
                    <div
                      class="card-header py-3 d-flex flex-row align-items-center justify-content-center"
                    >
                      <!-- <p class="text-primary m-0 fw-bold text-start"><strong><span style="color: rgb(133, 135, 150); background-color: rgb(255, 255, 255);">PROCESS CODE</span></strong></p> -->
                      <div class="barcode-container">
                        <img ref="barcodeImg" id="barcodeImg" alt="Barcode" />
                        <!-- 바코드를 출력할 이미지 요소 -->
                      </div>
                    </div>

                    <div class="card-header py-2">
                      <p class="text-primary m-0 fw-bold">Decription</p>
                    </div>
                    <div class="card-body">
                      <form>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3" style="text-align: left">
                              <label class="form-label" style="text-align: left"
                                ><strong>등록일자</strong></label
                              ><input
                                  v-model="data.WORK_DATE"
                                  class="form-control"
                                
                                />
                            </div>
                            <div class="mb-3" style="text-align: left">
                              <label class="form-label"
                                ><strong>작업등록 번호</strong></label
                              ><input
                                v-model="data.NO"
                                class="form-control"
                                type="text"
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="mb-3" style="text-align: left">
                              <label class="form-label"
                                ><span style="color: rgb(33, 37, 41)"
                                  >ASSY PART</span
                                ></label
                              ><input
                                v-model="data.PRODUCT_FULLNAME"
                                class="form-control"
                                type="text"
                              />
                            </div>
                            <div class="mb-3" style="text-align: left">
                              <label class="form-label"
                                ><span style="color: rgb(33, 37, 41)"
                                  >등록자</span
                                ></label
                              ><input
                                v-model="data.REG_ACCOUNT_NAME"
                                class="form-control"
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3">
                              <label class="form-label"
                                ><strong>품명</strong></label
                              ><input
                                v-model="data.ProductCode"
                                class="form-control"
                                type="text"
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="mb-3">
                              <label class="form-label"
                                ><strong>품번</strong></label
                              ><input
                                v-model="data.PUMBUN"
                                class="form-control"
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <!--  -->
                    <div class="card-header py-1">
                      <p class="text-primary m-0 fw-bold">
                        Sub&nbsp;<strong>Decription</strong>
                      </p>
                    </div>
                    <div class="card-body">
                      <form>
                        <div class="d-flex justify-content-between">
                          <div
                            class="mb-3 d-flex align-items-end"
                            style="text-align: left"
                          >
                            <label class="form-label" style="width: 100px"
                              ><strong>LOT NO</strong></label
                            ><input
                              v-model="data.LOT"
                              class="form-control"
                              type="text"
                            />
                          </div>
                          <div
                            class="mb-3 d-flex align-items-end"
                            style="text-align: left"
                          >
                            <label class="form-label" style="width: 100px"
                              ><strong>COUNT</strong></label
                            ><input
                              v-model="data.COUNT"
                              class="form-control"
                              type="text"
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div
                              class="mb-3 d-flex align-items-end"
                              style="text-align: left"
                            >
                              <label class="form-label" style="width: 100px"
                                ><strong>공정등록자</strong></label
                              ><input
                                v-model="data.REG_ACCOUNT_NAME"
                                class="form-control"
                                type="text"
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div
                              class="mb-3 d-flex align-items-end"
                              style="text-align: left"
                            >
                              <label class="form-label" style="width: 100px"
                                ><strong>재단작업자</strong></label
                              ><input
                                v-model="data.UPDATE_ACCOUNT"
                                class="form-control"
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="mb-3"></div>

                        <div class="mb-3">
                          <table
                            class="table text-start"
                            style="border: 0.5px solid"
                          >
                            <thead>
                              <tr>
                                <th scope="row"></th>
                                <td colspan="2"></td>
                                <td></td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr style="height: 30px">
                                <th scope="row"></th>
                                <td colspan="2"></td>
                                <td></td>
                              </tr>
                              <tr>
                                <th scope="row"></th>
                                <td colspan="2"></td>
                                <td></td>
                              </tr>
                              <tr>
                                <th scope="row"></th>
                                <td colspan="2"></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--  -->

                        <!--  -->
                      </form>
                    </div>
                    <!--print  -->
                    <div class="card shadow mb-5 print-hide">
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <form>
                              <div class="mb-3" style="text-align: left">
                                <button
                                  @click="goBack"
                                  class="btn btn-success btn-sm"
                                  type="submit"
                                >
                                  이전페이지
                                </button>
                              </div>
                            </form>
                          </div>
                          <div class="col">
                            <div class="mb-3">
                              <button
                                @click="generateReport"
                                class="btn btn-warning btn-sm text-white"
                                type="submit"
                              >
                                PRINT
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--  -->
                  </div>
                </div>
              </div>
            </div>
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import JsBarcode from "jsbarcode";
import { formatDate } from '~~/utils//datefomatter';
import { formatDateToMonthDay } from "~~/utils/formatDatetoMonth";
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
  setTimeout(() => {
    window.print();
    router.push("/production/barcodeRegister");
  }, 500); // 프린트가 되기 전에 충분한 시간을 두기 위해 500ms 대기
};
const goBack = () => {
  // router.push("/production/barcodeRegister");
  router.push("/production");
};

onMounted(() => {
  const params = route.query;
  const parsedData = JSON.parse(params.data);
    // WORK_DATE를 YYYY-MM-DD 형식으로 변환
    if (parsedData.WORK_DATE) {
      parsedData.WORK_DATE = formatDate(parsedData.WORK_DATE);
    }
    data.value = parsedData;
  generateBarcode(); // 컴포넌트가 마운트될 때 바코드를 생성
});
</script>

<style scoped>
table tr {
  height: 30px;
  border: 0.5px solid rgb(177, 177, 177);
}
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
