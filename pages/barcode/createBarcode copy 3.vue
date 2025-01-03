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
        <p>allProducts : {{ allProducts }}</p>
        <p>selectedProduct : {{ selectedProduct }}</p>

        <p>makeBarcode : {{ makedBarcode }}</p>
        <div>
          <button class="btn btn-sm btn-warning" @click="makeBarcode""> 바코드 조회 등록</button>
        </div>
        <p>barcodes : {{ barcodes }}</p>
        <p>barcodes Code: {{ barcodeData }}</p>
        <hr />
        <p>barcodes LAST_SERIAL_NUMBER: {{ barcodeData.LAST_SERIAL_NUMBER2 }}</p>
        <p>errorMessage: {{ errorMessage }}</p>
        <p>lastSerialNumber: {{ lastSerialNumber }}</p>

        <hr />
        <!--  -->
        <div class="d-flex">
          <div>
          <label for="selectedProduct">품명</label>
         
              <select name="" id="selectedProduct" v-model="selectedProduct">
                    <option value="" disabled selected>품명을 선택하세요</option>
                    <option v-for="product in allProducts" :value="product" :key="product.NO">
                     
                      {{ product.PRODUCT_FULLNAME }}
                      {{ product.PRODUCT_CODE }}
                     
                    </option>
               </select>
        </div>
        <div> <input type="text" v-model="barcodeDate"></div>
        </div>
        <table class="table table-striped table-bordered text-center">
          <thead>
             
             <td>ID</td>
            
             <td>LOCATION</td>
             <td>PRODUCT_CODE</td>
          
             <td>PRODUCT_BARCODE</td>
            
             <td>REV</td>
             <td>DATE</td>
             
           </thead>
           <tbody>
             <tr>
               <td>{{selectedProduct?.NO}}</td>
               <td>{{selectedProduct?.PRODUCT_FULLNAME}}</td>
              
              
               <td>{{selectedProduct?.PRODUCT_CODE}}</td>
             
               <td>{{selectedProduct?.PRODUCT_BARCODE}}</td>
               <td>{{selectedProduct?.BARCODE_REV}}</td>
               <td>{{ barcodeDate }}</td>

            
             </tr>
           </tbody>
        </table>
        <div>
          <span>{{ selectedProduct?.PRODUCT_FULLNAME || 'No product selected' }}/</span><span>{{selectedProduct?.PRODUCT_CODE}} <td>{{ barcodeDate }}</td></span> <button class="btn btn-sm btn-warning" @click="makeBarcodeData"> 바코드 조회 등록</button>
        </div>
        <div>
          <span class="text-danger ms-3"> [makedBarcode {{ makedBarcode}} ]</span>
          <span class="text-danger ms-3"> [productsCode {{ productsCode}} ]</span>
        </div>
<hr>
        <!--  -->
        <table>
          <thead>
          
          </thead>
        </table>
      
        <hr>
        <!--  -->
        <div>
          <table class="table table-striped table-bordered text-center">
           
            <tbody>
              <tr>
                <td></td>
                <td class="align-text-bottom">품명</td>
                <td class="align-text-bottom">CAR</td>
                <td class="align-text-bottom">LOCATION</td>
                <td class="align-text-bottom">PRODUCT_PART</td>
                <td class="align-text-bottom">BARCODE</td>
                
                <td class="row justify-content-center">
                DATE
                </td>
                <td class="row justify-content-center">
                 
                </td>
               
              </tr>
              <tr>
                <td></td>
                <td class="align-text-bottom">{{ productsCode.PRODUCT_CODE }}</td>
                <td class="align-text-bottom">{{ productsCode.CAR }}</td>
                <td class="align-text-bottom">{{ productsCode.LOCATION }}</td>
                <td class="align-text-bottom">{{ productsCode.PRODUCT_NAME }}</td>
                <td class="align-text-bottom">{{ productsCode.PRODUCT_BARCODE }}</td>
              
                <td class="row justify-content-center">
                  <input class=" form-control text-center"  style="max-width: 150px"  v-model="barcodeDate"  type="text" placeholder="" />
                </td>
                <td class="row justify-content-center">
                 
                </td>
               
              </tr>
              <tr>
                <td colspan="3" class="align-text-bottom">
                  출력한 바코드 수<span class="text-danger ms-3"
                    >[{{ barcodeData.COUNT }} ]</span
                  >
                  <span>/ 출력한 바코드 수</span>
                  <span class="text-danger ms-3"> [ {{ lastSerialNumber }} ]</span>
                 
                </td>
                <!-- <td class="row justify-content-center">  </td> -->
                <!-- <td class="align-text-bottom ">  </td> -->
              </tr>
              <tr>
                <td></td>
                <td class="align-text-bottom"></td>
                <td class="align-text-bottom"></td>
                <td class="align-text-bottom"></td>
                <td class="align-text-bottom"></td>
                <td class="align-text-bottom"> <span> 발행할 바코드 수</span></td>
              
                <td class="row justify-content-center">
                 
                </td>
                <td class="row justify-content-center">
               <input class="form-control text-center" style="max-width: 150px" v-model.number="quantity" type="number" placeholder="발행할 바코드 수량" min="1">
                </td>
               
              </tr>
            </tbody>
          </table>
          
          <button class="btn btn-sm btn-warning" @click="generateBarcodes" :disabled="!productsCode.PRODUCT_CODE || quantity <= 0" > 바코드 생성 </button>
          <div></div>
          
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

// const productsCode = ref('KADL230220K');
const productsCode = ref('KADL230220K');
// const productsCode = ref('KAAL230230K');

const allProducts = ref([]);
const selectedProduct = ref(null);
const barcodeDate = ref("240729");
const makedBarcode = ref("");
const barcodeData = ref("");
const quantity = ref(0);
const barcodes = ref([]);
const lastSerialNumber = ref('');
const errorMessage = ref("");
// const getData = async () => {
//   const response = await fetch(
//     `/api/production/getprocessCode/${processCode.value}`,
//   );
//   const data = await response.json();
//   console.log("data", data);
//   barcodeData.value = data;
// };
const getAllProducts = async () => {
  try {
    const response = await fetch('/api/products/getAllProducts');
    const data = await response.json();
    console.log("allProducts data", data);
    allProducts.value = data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
const getProducts = async () => {
  const response = await fetch(
    `/api/products/getproductsCode/${productsCode.value}`,
  );
  const data = await response.json();
  console.log("data", data);
  barcodeData.value = data;
};
const makeBarcodeData = async () => {
  makedBarcode.value = selectedProduct.value + barcodeDate.value;
  const PRODUCT_CODE = selectedProduct.value.PRODUCT_CODE + barcodeDate.value;
  productsCode.value = selectedProduct.value
  try {
    const response = await $fetch(`/api/barcode/Barcodecount/${PRODUCT_CODE}`);
    console.log("response", response);
    console.log("response.barcodeCount", response.barcodeCount);
    console.log("response.barcodeCount.LAST_SERIAL_NUMBER", response.barcodeCount.LAST_SERIAL_NUMBER || 0);
    lastSerialNumber.value= response.barcodeCount.LAST_SERIAL_NUMBER || 0;
  
    // if (response) {
    //   barcodeData.value = response;
    // }
   
  } catch (error) {
    console.log(error);
  }
};
const generateBarcodes = async () => {
  try {
  
   

    if (makeBarcodeData) {
     
      const startNumber = lastSerialNumber.value + 1;
  
      const endNumber = startNumber + quantity.value - 1;
      console.log("startNumber", startNumber);
      console.log("endNumber", endNumber);

      barcodes.value = [];
      for (let i = startNumber; i <= endNumber; i++) {
        const barcode = `${productsCode.value.PRODUCT_BARCODE}${barcodeDate.value}${i.toString().padStart(2, "0")}`;
        console.log("barcode", barcode);
        barcodes.value.push(barcode);
      }

      
      router.push({
        path: "/barcode/qrprint",
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
const generateBarcodes_01 = async () => {
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
        const barcode = `${barcodeData.value.PRODUCT_BARCODE}${barcodeDate.value}${i.toString().padStart(2, "0")}`;
        barcodes.value.push(barcode);
      }

      
      router.push({
        path: "/barcode/qrprint",
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
const makeBarcode =  async () => {
  makedBarcode.value = barcodeData.value.PRODUCT_CODE+barcodeDate.value;
  const PRODUCT_CODE = barcodeData.value.PRODUCT_CODE+barcodeDate.value;
  try{
    const response = await $fetch(`/api/barcode/Barcodecount/${PRODUCT_CODE}`)
    console.log("response1", response);
   
  
  }catch(error){
    console.log(error)
  }
  
  
  
  // await $fetch(`/api/barcode/BarcodecountRegister`, {
  //   method: "POST",
  //   body: {
  //     PRODUCT_CODE: makedBarcode.value,
  //     CREATE_DATA: barcodeDate.value, // PROCESSCODE 추가
  //     LAST_SERIAL_NUMBER:0,
  //   },
  // });
   
}
onMounted(getAllProducts);
onMounted(getProducts);
watch(selectedProduct, (newProduct) => {
  if (newProduct) {
    console.log("Selected product name:", newProduct.PRODUCT_FULLNAME);
    // Perform any other actions with the selected product
  }
});

</script>
