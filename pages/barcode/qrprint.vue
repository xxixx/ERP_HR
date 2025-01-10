<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <div class="d-flex flex-wrap flex-column">
      <h5 class="text-center mt-4">Barcode Printer</h5>
      <!-- route.query{{ route.query }}
      barcodes{{ barcodes }}
      barcodeData{{ barcodeData }}
      
      productBarcode{{ productBarcode }}
      productName{{ productName }}
      productBarcode{{ productBarcode }}
      barcodeAndDate{{ barcodeAndDate }} -->
      PROCESS_CODE{{  route.query  }}
      <hr />
      <div class="barcode-printer text-center">
        <button class="btn btn-sm btn-outline-warning w-50" @click="printBarcodes">바코드 프린터</button>
      </div>
      <div class="d-flex flex-column  barcode-position ">
        <div class="barcode-container  barcode-item border mb-5 me-2 my-2" v-for="(barcode, index) in barcodes" :key="index">
          <div class="d-flex flex-column  " style="text-align: center;">
            <!-- <div class="d-flex justify-content-between text-center barcode-headname ">
              <div>ALKOSC</div>
              <div class="middle-div"></div>
              <div>PA6.6/Si</div>
            </div> -->
            <div class="d-flex justify-content-center center-div mx-3 border-top">
              <div class="d-flex flex-column left-column">
                <!-- <span class="top-gap"></span> -->
                <span class="middle-font">ALKOSC</span>
                <span class="middle-font my-1">VINFAST</span>
                <span class="middle-font">{{ carName }}</span>
              </div>
              <div class="qr-code">
                <img :src="qrCodeData[index]" alt="QR Code" style="height: 30px;" />
              </div>
              <div class="d-flex flex-column">
                <!-- <span class="top-gap"></span> -->
                <span class="middle-font">PA6.6/Si</span>
                <span class="middle-font my-1">&nbsp;PAB</span>
                <span class="middle-font">US</span>
              </div>
            </div>
            <div>
              <span class="barcode-name">{{ barcode }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import QRCode from 'qrcode';


const route = useRoute();
const barcodes = ref(route.query.barcodes ? route.query.barcodes.split(',') : []);
const barcodeDate = ref(route.query.barcodeDate );
const barcodeData = ref(route.query.barcodeData);
const lastSerialNumber = ref(route.query.lastSerialNumber);
const PROCESS_CODE = ref(route.query.PROCESS_CODE);
const PRODUCT_CODE = ref(route.query.productsCode);
const productBarcode = ref(route.query.productBarcode);
const quantity = ref(route.query.quantity);
const location = ref(route.query.location);
const carName = ref(route.query.carName);
const qrCodeData = ref([]);
const barcodeAndDate = ref(`${productBarcode.value}${barcodeDate.value}`);
const printBarcodes = async () => {
  await fetch(`/api/barcode/${barcodeAndDate.value}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lastSerialNumber: lastSerialNumber.value,  // productCode는 URL에서 전달되므로 body에 필요하지 않음
      PROCESS_CODE: PROCESS_CODE.value,  // productCode는 URL에서 전달되므로 body에 필요하지 않음
      PRODUCT_CODE: PRODUCT_CODE.value,
      BARCODE_COUNT: quantity.value
    }),
  });
  window.print();
  window.location.href = '/barcode/createBarcode';
};
const generateQRCode = async () => {
  try {
    const qrCodes = await Promise.all(
      barcodes.value.map(async (barcode) => await QRCode.toDataURL(barcode))
    );
    qrCodeData.value = qrCodes;
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};

onMounted(async () => {
  await generateQRCode();
});
</script>

<style>
@page { size : 40mm 20mm; margin: 0; }
@media print {
  html, body { 
    width: 40mm; 
    height: 20mm; 
    margin: 0;
    padding: 0;
  }
  body * {
    visibility: hidden;
  }

  .barcode-container,
  .barcode-container * {
    visibility: visible;
    transform-origin: top left;
    transform: scale(1);
   
  }

  .barcode-item {
    margin: 0;
    padding: 0;
    border: none;
    width: 40mm;
    height: 20mm;
  }
  .barcode-position {
    position: absolute;
    left: -10px;
    top: 0;
    margin: 0;
    padding: 0;
    width: 40mm;
    height: 20mm;
    font-size: 6px;
    font-weight: 600;
    /* margin-bottom: 80px; */
    /* margin-bottom: 58.5px; */
  }
  .qr-code img {
    height: 10mm !important;
    width: auto;
  }
  .middle-font {
    font-size: 5px;
    line-height: 1.2;
    margin: 0;
    padding: 0;
  }
  .left-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1mm 0;
  }
  
  .alkosc-text {
    margin-top: -2mm;
    font-weight: 400;
  }
  .barcode-name {
    font-size: 6px;
   
    margin: 0;
    padding: 0;
    line-height: 1;
    font-style: bold;
   }
   .center-div {
    align-items: center;
    justify-content: space-between;
    padding: 0 2mm;
  }

   
}
</style>