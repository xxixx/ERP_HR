<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <div class=" ">
      <h5 class="text-center mt-4">BOX Label Printer</h5>
      <!-- barcode {{ barcode }} -->
      <!-- barcode{{route.query }} -->

      <!-- <button class="btn btn-sm btn-success" @click="printBarcodes">Print Barcodes</button> -->
      <hr />
      <div class="container barcode-printer">
        <button class="btn btn-sm btn-outline-warning" @click="printBarcodes">
          박스 라벨 프린터
        </button>
        {{ barcode }}
      </div>

      <div class="container barcode-container barcode-item box-label-printer">
        <div class="m-2 border border-success p-1">
          <div>
            <!-- <qrcode-vue class="p-1" :value="barcode" :size="150" level="H" />
                         <span  class=" mx-2 align-items-center">{{ barcode.processCode }}</span>
                         <span  class=" mx-2 align-items-center">수량{{ barcode.quantity }}</span> -->
          </div>
          <!--  -->
          <div class="card shadow mb-3">
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
              <div class="mb-3 text-center">
               
                <strong>[{{ barcode.processCode }}]</strong>
              </div>
              <div class="mb-3 text-center">
               
                <strong>{{ barcode.LOTNUMBER }}</strong>
              </div>
            </div>
            <div class="card-header py-3">
              <!-- <p class="text-primary m-0 fw-bold">박스라벨</p> -->
            </div>
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col">
                    <qrcode-vue
                      class="p-1"
                      :value="QRCODE"
                      :size="150"
                      level="H"
                    />
                    <!-- <div class="mb-3" style="text-align: left;"><label class="form-label" for="username" style="text-align: left;"><strong>등록일자</strong></label><input  class="form-control" type="text" placeholder="" name="" /></div>
                                             <div class="mb-3" style="text-align: left;"><label class="form-label" for="username"><strong>작업등록 번호</strong></label><input v-model="barcode.PROCESS_CODE" id="" class="form-control" type="text" placeholder="" name="" /></div> -->
                  </div>
                  <div class="col">
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
                    <div class="mb-3 text-center">
                      <label class="form-label" for="first_name"
                        ><strong>수량</strong></label
                      ><input
                        v-model.number="barcode.quantity"
                        id=""
                        class="form-control text-center"
                        type="text"
                        placeholder=""
                        name="first_name"
                      />
                    </div>
                    <!-- <div class="mb-3"><label class="form-label" for="first_name"><strong>수량</strong></label><input v-model.number="barcode.quantity"  id="" class="form-control" type="text" placeholder="" name="first_name" /></div> -->
                  </div>
                  <div class="col text-center">
                    <!-- <div class="mb-3"><img src="https://via.placeholder.com/150" alt=""></div> -->
                    <!-- <div class="mb-3 w-50"><img src="../../assets/images/logo.png" alt=""></div> -->
                    <img
                      class="logo"
                      src="../../assets/images/logo.png"
                      alt=""
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <hr />
                    <div class="mt-3 text-center">
                      <span class="text-align-center" style="font-size: 1.5em"
                        >&reg;
                      </span>
                      <strong>ALKOSC.LTD</strong>
                      <span>&nbsp;&nbsp;</span><span></span
                      ><strong>KOREA</strong>
                    </div>
                    <!-- <div class="mb-3"><label class="form-label" for="first_name"><strong>수량</strong></label><input v-model.number="barcode.quantity"  id="" class="form-control" type="text" placeholder="" name="first_name" /></div> -->
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import QrcodeVue from "qrcode.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const barcode = ref(route.query);
// const QRCODE = ref(JSON.stringify({ // 객체를 JSON 문자열로 변환
//   LOTNUMBER: barcode.value.LOTNUMBER,
//   processCode: barcode.value.processCode
// }));
const QRCODE = ref(`${barcode.value.LOTNUMBER} ${barcode.value.processCode}`); // 값만 포함된 문자열로 구성
const printBarcodes = () => {
  window.print();
};
</script>

<style scoped>
.logo {
  width: 100px;
}
.barcode-container {
  align-items: center;
}

.barcode-item {
  margin-top: 50px;
  height: auto;

  margin-bottom: 5mm;
  border: 1px solid #ccc;
}
.box-label-printer {
}
@media print {
  body * {
    visibility: hidden;
  }

  .barcode-container,
  .barcode-container * {
    visibility: visible;
  }
}
</style>
