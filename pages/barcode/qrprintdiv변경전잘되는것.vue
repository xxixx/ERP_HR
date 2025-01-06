<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <div class="d-flex flex-wrap flex-column">
      <h5 class="text-center mt-4">Barcode Printer</h5>
      barcodes{{ barcodes }}
      barcodes{{ barcodeData }}
      processCode{{ processCode }}
      <hr />
      <div class="barcode-printer">
        <button class="btn btn-sm btn-outline-warning" @click="printBarcodes">바코드 프린터</button>
      </div>
      <div class="d-flex flex-column  barcode-position ">
        <div class="barcode-container  barcode-item border mb-5 me-2" v-for="(barcode, index) in barcodes" :key="index">
          <div class="d-flex flex-column  " style="text-align: center;">
            <div class="d-flex justify-content-between text-center barcode-headname ">
              <div>ALKOSC</div>
              <div class="middle-div"></div>
              <div>PA6.6/Si</div>
            </div>
            <div class="d-flex justify-content-center center-div">
              <div class="d-flex flex-column">
                <span class="top-gap"></span>
                <span>VINFAST</span>
                <span>{{ carName }}</span>
              </div>
              <div class="qr-code">
                <img :src="qrCodeData[index]" alt="QR Code" style="height: 30px;" />
              </div>
              <div class="d-flex flex-column">
                <span class="top-gap"></span>
                <span class="middle-font">&nbsp;PAB</span>
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
const barcodeData = ref(route.query.barcodeData);
const lastSerialNumber = ref(route.query.lastSerialNumber);
const productName = ref(route.query.productName);
const location = ref(route.query.location);
const carName = ref(route.query.carName);
const qrCodeData = ref([]);

const printBarcodes = async () => {
  await fetch(`/api/products/${barcodeData.value}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lastSerialNumber: lastSerialNumber.value }),
  });
  window.print();
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
  html, body { width:40mm; height: 20mm; }
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
  .barcode-position {
    position: relative;
    right:  52px;
    top: 3px;
    font-style: bold;
    margin-top: 0px;
    font-size: 6px;
    max-width: 170px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 90px;
    /* margin-bottom: 58.5px; */
  }
  .barcode-name {
    margin-left: 20px;
    /* margin-right: 10px; */
      /* position: relative;
      top: -10px;
      left: 8px; */  
   }
   .barcode-headname {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin: auto;
    margin-top: -10px;
    position: relative;
    top: 10px;
    left: 10px;
  } 
  .middle-div {
    width: 34px;
  }
  .center-div {
    margin-top: 4px;
    margin-bottom: 0;
    padding: 0;
    width: 170px;
  }
  .top-gap {
    margin-top: 12px;
  }
  /* .center-div {
    margin-top: -5px;
    margin-bottom: 0;
    padding: 0;
  } */
  /*   */
  /* .middle-div {
    width: 45px;
  } */
  /* .barcode-headname {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin: auto;
    margin-top: -2px;
  } */
  /* .top-gap {
    margin-top: 6px;
  } */
  /* .qr-code {
    margin-top: -2px;
  } */
  /* .middle-font {
    font-size: 5px;
    font-weight: 800;
  } */
  /* .small-font {
    font-size: 4px;
    font-weight: 600;
  } */
  /* img{
      margin: 0;
      padding: 0;
  } */
}
</style>