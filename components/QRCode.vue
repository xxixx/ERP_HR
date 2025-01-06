<template>
    <canvas ref="canvas"></canvas>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from 'vue';
  import QRCode from 'qrcode';
  
  const props = defineProps({
    text: String,
    size: {
      type: Number,
      default: 128
    }
  });
  
  const canvas = ref(null);
  
  const generateQRCode = () => {
    if (canvas.value) {
      QRCode.toCanvas(canvas.value, props.text, {
        width: props.size,
      }, (error) => {
        if (error) console.error(error);
      });
    }
  };
  
  onMounted(generateQRCode);
  watch(() => props.text, generateQRCode);
  </script>
  
  <style scoped>
  canvas {
    display: inline-block;
  }
  </style>
  