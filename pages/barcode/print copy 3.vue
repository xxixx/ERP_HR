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
          class="barcode-container barcode-item "
          v-for="(barcode, index) in barcodes"
          :key="index"
        >
        <!--  -->
       <div class="mt-2  ">
        <div class="d-flex flex-row ">
            <div class="d-flex flex-column">
              <span class=" align-items-center" style="font-size: 0.4em"
                  >ALKOSC</span
                >
                <span style="font-size: 0.5em">{{ carName }}</span>
            </div>
            <div class="text-center p-0">
              <qrcode-vue class="" :value="barcode" :size="30" level="H" />
            
            </div>
            <div class="d-flex flex-column">
              <span style="font-size: 0.5em">{{ productName }}</span>
              <span style="font-size: 0.5em">{{ location }}</span>
            </div>
            
           
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-column">
                
                
              </div>
            
              
             
              
              <div></div>
                 </div>
          </div>
          <!-- <div class="m-0 p-0">
            <span
              class="mx-2 align-items-center border-bottom"
              style="font-size: 0.8em"
              >{{ barcode }}</span
            >
          </div> -->
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
}
</style>
