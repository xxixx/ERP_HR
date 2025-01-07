<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <div class="d-flex flex-wrap flex-column">
      <h5 class="text-center mt-4">Barcode Printer</h5>
      <!-- barcodes{{ barcodes }}
      barcodes{{ barcodeData }}
  processCode{{ processCode }} -->
      <!-- <button class="btn btn-sm btn-success" @click="printBarcodes">Print Barcodes</button> -->
      <hr />
      <div class="container barcode-printer">
        <button class="btn btn-sm btn-outline-warning" @click="printBarcodes">
          바코드 프린터
        </button>
        
      </div>
      <div class="container d-flex flex-wrap barcode-position">


        
        <div class="barcode-container barcode-item" v-for="(barcode, index) in barcodes" :key="index">
        <!--  -->
              <div class="d-flex flex-column  barcode-position" style="text-align: center;">
                <div class="d-flex justify-content-between text-center barcode-headname">
                    <div>ALKOSC</div>
                    <div class="middle-div"></div>
                    <div>PA6.6/Si</div>
                </div>
                <div class="d-flex justify-content-between center-div">
                    <div class="d-flex flex-column"><span class="top-gap"></span><span>VINFAST</span><span>{{ carName }}</span></div>
                    <div class="qr-code">
                    <!-- <qrcode-vue class="mx-2" :value="barcode" :size="23" level="H" />  -->
                    <canvas :ref="'canvas-' + index"></canvas>
                        </div>
                    <div class="d-flex flex-column"><span class="top-gap"></span><span class="middle-font">&nbsp;PAB</span><span class="small-font">US</span></div>
                </div>
                <div  ><span class="barcode-name" >{{ barcode }}</span></div>
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
import QRCode from 'qrcode';

const route = useRoute();
const barcodes = ref(
  route.query.barcodes ? route.query.barcodes.split(",") : [],
);  
const barcodeData = ref(route.query.barcodeData);
const lastSerialNumber = ref(route.query.lastSerialNumber);
const productName = ref(route.query.productName);
const location = ref(route.query.location);
const carName = ref(route.query.carName);

const generateQRCode = (text, canvas) => {
      QRCode.toCanvas(canvas, text, { width: 20 }, (error) => {
        if (error) console.error(error);
      });
    };
const printBarcodes = async () => {
  await fetch(`/api/products/${barcodeData.value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lastSerialNumber: lastSerialNumber.value }),
  });
  window.print();
};
onMounted(() => {
  const canvas = document.querySelector(`#canvas-${index}`);
        if (canvas) {
          generateQRCode(barcode, canvas);
        }
    });
</script>

<style>


@media print {
  body * {
    visibility: hidden;
  }

  .barcode-container,
  .barcode-container * {
    visibility: visible;
  }

  .barcode-item {
    margin-bottom: 0;
    border: none;
  }
 .barcode-position{
   position: relative;
   left: -33px;
   top: -8px;
   font-style: bold;
   margin-top: -3px;
   /* margin-top: -10px; */
   font-size: 5px;
   max-width:50px;
   font-weight: 600;
   text-align: center;
   /* margin-bottom: 26.5px; */
   margin-bottom: 58.5px;

 }
 .center-div{
   margin-top: -5px;
 }
 .barcode-name{
   font-size: .9em;
   text-align: center;
   font-weight: 600;
   margin-left: 12px;
 }
 .middle-div{
   width: 40px;
 }
 .barcode-headname{
   display: flex;
   justify-content: space-between;
   text-align: center;
   margin: auto;
   margin-top: -2px;
 }
 .top-gap{
   margin-top: 5px;
 }
 .qr-code{
   margin-top: -2px;
 }
 .middle-font{
  font-size: 4px;
  font-weight: 600;
 }
 .small-font{
  font-size: 4px;
  font-weight: 600;
 }
}
</style>
