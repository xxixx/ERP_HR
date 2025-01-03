<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <div class="d-flex flex-wrap flex-column">
      <h5 class="text-center mt-4">Barcode Printer</h5>
      barcodes{{ barcodes }}
      barcodes{{ barcodeData }}
  processCode{{ processCode }}
      <!-- <button class="btn btn-sm btn-success" @click="printBarcodes">Print Barcodes</button> -->
      <hr />
      <div class="container barcode-printer">
        <button class="btn btn-sm btn-outline-warning" @click="printBarcodes">
          바코드 프린터
        </button>
        <!-- <table class="table table-sm text-center">
         <thead>
           <tr> </tr>
         </thead>
         <tbody  class="barcode-item">
           <tr class="row justify-content-center">
             <div v-for="(barcode, index) in barcodes" :key="index" >
               <qrcode-vue :value="barcode" :size="50" level="H" />
               <span>{{ barcode }}</span>
             </div>
           </tr>
        
         </tbody>
       </table>   -->
      </div>
      <div class="container d-flex flex-wrap mt-4">
        <div
          class="barcode-container barcode-item m-2 border border-success p-1"
          v-for="(barcode, index) in barcodes"
          :key="index"
        >
          <qrcode-vue class="p-1" :value="barcode" :size="50" level="H" />
          <div class="d-flex flex-column">
            <span
              class="mx-2 align-items-center border-bottom"
              style="font-size: 0.8em"
              >{{ barcode }}</span
            >
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-column">
                <span
                  class="mx-2 align-items-center"
                  style="font-size: 0.7em"
                  >{{ barcodeData }}QG181</span
                >
                <span class="mx-2 align-items-center" style="font-size: 0.7em"
                  >ALKOSCLTD</span
                >
              </div>
              <span>{{ productName }}</span>
              <span>{{ location }}</span>
              <span>{{ carName }}</span>
              <div>
                <!-- <img
                  src="../../assets/images/logo.png"
                  style="width: 2.5em"
                  alt="Logo"
                /> -->
              </div>
              <div></div>
            </div>
          </div>
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
  await fetch(`/api/products/${processCode.value}`, {
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
  width: 70mm;
  height: 20mm;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5mm;
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
}
</style>
