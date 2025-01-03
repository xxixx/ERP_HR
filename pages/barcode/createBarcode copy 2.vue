<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <h5 class="text-center mt-2">Barcode Generator</h5>
    <div v-if="isLoading">
      <!-- Show loading indicator -->
      <p>Loading...</p>
    </div>
    <div class="album py-5 bg-body-tertiary"></div>
    <div class="d-flex flex-wrap flex-column">
      <div>
        <!-- <p>Process Code: {{ route.query.processCode || processCode }}</p> -->
        <!-- <p>공정번호 {{ processCode }}</p> -->
        <p>barcodes : {{ barcodes }}</p>
        <p>barcodes Code: {{ barcodeData }}</p>
        <hr />
        <p>barcodes LAST_SERIAL_NUMBER: {{ barcodeData.LAST_SERIAL_NUMBER2 }}</p>
        <p>errorMessage: {{ errorMessage }}</p>
        <p>lastSerialNumber: {{ lastSerialNumber }}</p>
        <div>
          <table class="table table-striped table-bordered text-center">
            <thead>
              <td></td>
              <td>공정번호</td>
              <td>출력할 바코드 수</td>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td class="align-text-bottom">{{ barcodeData.PRODUCT_CODE }}</td>
                <td class="row justify-content-center">
                  <input
                    class="form-control text-center"
                    style="max-width: 150px"
                    v-model.number="quantity"
                    type="number"
                    placeholder="발행할 바코드 수량"
                    min="1"
                  />
                </td>
                <td class="align-text-bottom">
                  <button
                    class="btn btn-sm btn-warning"
                    @click="generateBarcodes"
                    :disabled="!barcodeData.PRODUCT_CODE || quantity <= 0"
                  >
                    바코드 생성
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="align-text-bottom">
                  공정등록수<span class="text-danger ms-3"
                    >[{{ barcodeData.COUNT }} ]</span
                  >
                  <span>/ 출력한 바코드 수</span
                  ><span class="text-danger ms-3">
                    [ {{ barcodeData.LAST_SERIAL_NUMBER2 }} ]</span
                  >
                </td>
                <!-- <td class="row justify-content-center">  </td> -->
                <!-- <td class="align-text-bottom ">  </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr />
      <!-- <div>
        <label>
              Quantity:
              <input v-model.number="quantity" type="number" placeholder="Enter quantity" min="1" />
            </label>
        
            <button @click="generateBarcodes" :disabled="!processCode || quantity <= 0">Generate Barcodes</button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
// const processCode = ref(route.query.processCode || "");

const productsCode = ref('KAAL230000K');

const barcodeData = ref("");
const quantity = ref(0);
const barcodes = ref([]);
const lastSerialNumber = ref(0);
const errorMessage = ref("");
// const getData = async () => {
//   const response = await fetch(
//     `/api/production/getprocessCode/${processCode.value}`,
//   );
//   const data = await response.json();
//   console.log("data", data);
//   barcodeData.value = data;
// };
const getProducts = async () => {
  const response = await fetch(
    `/api/products/getproductsCode/${productsCode.value}`,
  );
  const data = await response.json();
  console.log("data", data);
  barcodeData.value = data;
};
const generateBarcodes = async () => {
  try {
    const response = await fetch(
      `/api/products/getproductsCode/${productsCode.value}`,
    );
    const data = await response.json();
    console.log("productsCodedata", data);

    if (data) {
      lastSerialNumber.value = barcodeData.value.LAST_SERIAL_NUMBER2 || 0;
      console.log("lastSerialNumber", lastSerialNumber.value);
      const startNumber = lastSerialNumber.value + 1;
      const endNumber = startNumber + quantity.value - 1;
      console.log("startNumber", startNumber);
      console.log("endNumber", endNumber);

      barcodes.value = [];
      for (let i = startNumber; i <= endNumber; i++) {
        const barcode = `${barcodeData.value.PRODUCT_BARCODE}QG181${i.toString().padStart(2, "0")}`;
        barcodes.value.push(barcode);
      }

      
      router.push({
        path: "/barcode/print",
        query: {
          barcodes: barcodes.value.join(","), // 기존 barcodes 데이터
          barcodeData: barcodeData.value.PRODUCT_BARCODE, // 추가된 barcodeData 데이터
          lastSerialNumber: endNumber, // 추가된 barcodeData 데이터
          productName: barcodeData.value.PRODUCT_NAME, // 추가된 barcodeData 데이터
          location: barcodeData.value.LOCATION, // 추가된 barcodeData 데이터
          carName: barcodeData.value.CAR, // 추가된 barcodeData 데이터
        },
      });
    } else {
      errorMessage.value = "Invalid process code";
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while generating barcodes");
  }
};
// const generateBarcodes = async () => {
//   try {
//     const response = await fetch(
//       `/api/production/getprocessCode/${processCode.value}`,
//     );
//     const data = await response.json();
//     console.log("data", data);

//     if (data) {
//       lastSerialNumber.value = barcodeData.value.LAST_SERIAL_NUMBER2 || 0;
//       console.log("lastSerialNumber", lastSerialNumber.value);
//       const startNumber = lastSerialNumber.value + 1;
//       const endNumber = startNumber + quantity.value - 1;
//       console.log("startNumber", startNumber);
//       console.log("endNumber", endNumber);

//       barcodes.value = [];
//       for (let i = startNumber; i <= endNumber; i++) {
//         const barcode = `${processCode.value}${i.toString().padStart(2, "0")}`;
//         barcodes.value.push(barcode);
//       }

//       // Update the last serial number in the database
//       // await fetch(`/api/production/${processCode.value}`, {
//       //   method: 'PUT',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify({ lastSerialNumber: endNumber }),
//       // });
//       // console.log("barcodes", barcodes.value);
//       // Navigate to the printer page with the generated barcodes
//       router.push({
//         path: "/barcode/print",
//         query: {
//           barcodes: barcodes.value.join(","), // 기존 barcodes 데이터
//           barcodeData: barcodeData.value.PUMBUN, // 추가된 barcodeData 데이터
//           lastSerialNumber: endNumber, // 추가된 barcodeData 데이터
//           processCode: processCode.value, // 추가된 barcodeData 데이터
//         },
//       });
//     } else {
//       errorMessage.value = "Invalid process code";
//     }
//   } catch (error) {
//     console.error(error);
//     alert("An error occurred while generating barcodes");
//   }
// };
onMounted(getProducts);
</script>
