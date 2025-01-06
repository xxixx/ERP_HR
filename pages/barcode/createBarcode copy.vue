<template>
  <div>
    <h1>Barcode Generator</h1>
    <p>Process Code: {{ route.query.processCode || processCode }}</p>
    <p>Process Code: {{ processCode }}</p>
    <p>barcodes Code: {{ barcodes }}</p>
    <p>errorMessage: {{ errorMessage }}</p>
    <p>lastSerialNumber: {{ lastSerialNumber }}</p>

    <label>
      Quantity:
      <input
        v-model.number="quantity"
        type="number"
        placeholder="Enter quantity"
        min="1"
      />
    </label>

    <button @click="generateBarcodes" :disabled="!processCode || quantity <= 0">
      Generate Barcodes
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const processCode = ref(route.query.processCode || "");
const quantity = ref(0);
const barcodes = ref([]);
const lastSerialNumber = ref(0);
const errorMessage = ref("");
const generateBarcodes = async () => {
  try {
    const response = await fetch(
      `/api/production/getprocessCode/${processCode.value}`,
    );
    const data = await response.json();
    console.log("data", data);

    if (data) {
      lastSerialNumber.value = data.lastSerialNumber || 0;
      console.log("lastSerialNumber", lastSerialNumber.value);
      const startNumber = lastSerialNumber.value + 1;
      const endNumber = startNumber + quantity.value - 1;
      console.log("startNumber", startNumber);
      console.log("endNumber", endNumber);

      barcodes.value = [];
      for (let i = startNumber; i <= endNumber; i++) {
        const barcode = `${processCode.value}${i.toString().padStart(2, "0")}`;
        barcodes.value.push(barcode);
      }

      // Update the last serial number in the database
      await fetch(`/api/production/${processCode.value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lastSerialNumber: endNumber }),
      });
      console.log("barcodes", barcodes.value);
      // Navigate to the printer page with the generated barcodes
      router.push({
        path: "/barcode/print",
        query: { barcodes: barcodes.value.join(",") },
      });
    } else {
      errorMessage.value = "Invalid process code";
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while generating barcodes");
  }
};
</script>
