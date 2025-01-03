<template>
  <div>
    <h1>Barcode Printer</h1>
    <div v-if="barcodes.length > 0">
      <div v-for="(barcode, index) in barcodes" :key="index">
        <qrcode-vue :value="barcode" :size="200" level="H" />
      </div>
    </div>
    <button @click="printBarcodes">Print Barcodes</button>
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

const printBarcodes = () => {
  window.print();
};
</script>
