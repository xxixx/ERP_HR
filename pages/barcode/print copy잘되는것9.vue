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
      <div class="container d-flex flex-wrap mt-4 barcode-position">


        
        <div
          class="barcode-container barcode-item  "
          v-for="(barcode, index) in barcodes"
          :key="index"
        >
        <!--  -->
        <div class="d-flex flex-column barcode barcode-position" style="text-align: center;">
    
    <div class="d-flex justify-content-between">
        <div class="d-flex flex-column"><span>ALKOSC</span><span>{{ carName }}</span></div>
        <div><qrcode-vue class="position-a mx-2" :value="barcode" :size="22" level="H" />     </div>
        <div class="d-flex flex-column"><span>PAB</span><span>US</span></div>
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

const route = useRoute();
const barcodes = ref(
  route.query.barcodes ? route.query.barcodes.split(",") : [],
);
const barcodeData = ref(route.query.barcodeData);
const lastSerialNumber = ref(route.query.lastSerialNumber);
const productName = ref(route.query.productName);
const location = ref(route.query.location);
const carName = ref(route.query.carName);

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
</script>

<style>
.barcode-printer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.barcode-container {
  display: flex;
  flex-direction: row;
  align-items: center;

}

.barcode-item {
  width: 40mm;
  height: 20mm;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1mm;
  border: 1px solid #ccc;
}

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
   top: 5px;
   font-style: bold;
   margin-top: 2px;
   font-size: 6px;
   max-width:50px;
   font-weight: 600;
   text-align: center;

 }
 .barcode-name{
   font-size: .8em;
   text-align: center;
   font-weight: 600;
   margin-left: 8px;
 }
  .position-a{
  
  }
  .position-b{
    position: relative;
    top: 37px;
    left: -72px;
    font-style: bold;
  }
}
</style>
