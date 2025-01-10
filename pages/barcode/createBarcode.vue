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
        <p>Process Code: {{ route.query.processCode  }}</p>
        <p>PRODUCT_CODE: {{ route.query.productCode  }}</p>
        <p>PRODUCT_BARCODE: {{ route.query.productBarCode }}</p>
        <p>공정번호 {{ processCode }}</p>
        <!-- <p>barcodeData {{ barcodeData }}</p> -->
        <!-- <p>PRODUCT_CODE {{ PRODUCT_CODE }}</p> -->
        <p>PRODUCTDATA {{ PRODUCTDATA }}</p>
        <p>barcodes : {{ barcodes }}</p>
        ScannedBarcodecount{{ ScannedBarcodecount }}
        <!-- <p>allProducts : {{ allProducts }}</p>
        <p>selectedProduct : {{ selectedProduct }}</p>

        <p>makeBarcode : {{ makedBarcode }}</p>
        <div>
       
        </div>
        <p>barcodes : {{ barcodes }}</p>
        <p>barcodes Code: {{ barcodeData }}</p>
        <hr />
        <p>barcodes LAST_SERIAL_NUMBER: {{ barcodeData.LAST_SERIAL_NUMBER2 }}</p>
        <p>errorMessage: {{ errorMessage }}</p>
        <p>lastSerialNumber: {{ lastSerialNumber }}</p> -->

        <hr />
        <!--  -->
        <div class="">
          <!-- <p>품명을 선택하세요</p> -->
          <div  class="d-flex justify-content-between align-items-baseline">
         
         <!-- <p>품명을 선택하세요</p> -->
             
               <input  class="form-control me-2" style="width: 40%;" type="text" v-model=route.query.productCode  >
               <input  class="form-control me-2" style="width: 40%;" type="text" v-model="barcodeDate">
               <button class="btn btn-sm btn-warning" style="width: 20%;" @click="makeBarcodeData"> 바코드 조회 등록</button>
        </div>
        <!-- <div> <input  class="form-control" type="text" v-model="barcodeDate"></div> -->
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
             <tr class="">
               <td class="">{{PRODUCTDATA?.NO}}</td>
               <td>{{PRODUCTDATA?.PRODUCT_FULLNAME}}</td>
              
              
               <td>{{PRODUCTDATA?.PROCESSCODE}}</td>
             
               <td>{{PRODUCTDATA?.PRODUCT_BARCODE}}</td>
               <td>{{PRODUCTDATA?.BARCODE_REV}}</td>
               <td>{{ barcodeDate }}</td>

            
             </tr>
           </tbody>
        </table>
        <!-- <div>
          <span>{{ selectedProduct?.PRODUCT_FULLNAME || 'No product selected' }}/</span><span>{{selectedProduct?.PRODUCT_CODE}} <td>{{ barcodeDate }}</td></span> <button class="btn btn-sm btn-warning" @click="makeBarcodeData"> 바코드 조회 등록</button>
        </div> -->
        <div>
          <!-- <span class="text-danger ms-3"> [상세정보]{{ makedBarcode}} ]</span> -->
          <!-- <span class="text-danger ms-3"> [상세정보] {{ productsCode}} ]</span> -->
        </div>
<hr >
        <!--  -->
        <table>
          <thead>
          
          </thead>
        </table>
      
        <hr>
        <!--  -->
        <div class="mt-4 bg-success text-white opacity-50" style="height: 40px;">
          <p></p>

        </div>
        <div class="mt-4">
          <table class="table table-striped table-bordered text-center">
           
            <tbody>
              <tr>
             
                <td class="align-text-bottom">품명</td>
                <td class="align-text-bottom">CAR</td>
                <td class="align-text-bottom">LOCATION</td>
                <td class="align-text-bottom">PRODUCT_PART</td>
                <td class="align-text-bottom">BARCODE</td>
                
                <td class="row justify-content-center">DATE</td>
              </tr>
              <tr>
               
                <td class="align-text-bottom">{{ productsCode }}</td>
                <td class="align-text-bottom">{{ PRODUCTDATA.CAR }}</td>
                <td class="align-text-bottom">{{ PRODUCTDATA.LOCATION }}</td>
                <td class="align-text-bottom">{{ PRODUCTDATA.PRODUCT_NAME }}</td>
                <td class="align-text-bottom">{{ PRODUCTDATA.PRODUCT_BARCODE }}</td>
                <td class="row justify-content-center">
                  <input class=" form-control text-center" disabled="disabled"  style="max-width: 150px"  v-model="barcodeDate"  type="text" placeholder="" />
                </td>
                
               
              </tr>
              <tr>
                <td colspan="2" class="align-text-bottom">
                  등록한 바코드 수<span class="text-danger ms-3"
                    >[{{ ScannedBarcodecount }} ]</span
                  >
                  <span>/ 출력한 바코드 수</span>
                  <span class="text-danger ms-3"> [ {{ lastSerialNumber }} ]</span>
                 
                </td>
                
                
                <td colspan="4" class="">
                  <div class="d-flex justify-content-around align-items-center">
                    <span> 발행할 바코드 수</span>
                    <input class="form-control text-center " style="max-width: 150px" v-model.number="quantity" type="number" placeholder="발행할 바코드 수량" min="1">
                    <button class="btn btn-sm btn-warning" style="width: 50%;" @click="generateBarcodes" :disabled="!PRODUCTDATA.PROCESSCODE || quantity <= 0" > 바코드 생성 </button>
                  </div>
                   
                </td>
              
              </tr>
            
            </tbody>
          </table>
          
          
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
const processCode = ref(route.query.processCode);

// const productsCode = ref('KADL230220K');
const productsCode = ref('');

// const productsCode = ref('KAAL230230K');

const allProducts = ref([]);
const selectedProduct = ref(null);
// const barcodeDate = ref("240730");
const makedBarcode = ref("");
const PRODUCTDATA = ref("");
const barcodeData = ref("");
const quantity = ref(0);
const barcodes = ref([]);
const lastSerialNumber = ref('');
const ScannedBarcodecount = ref('');
const errorMessage = ref("");
// const getData = async () => {
//   const response = await fetch(
//     `/api/production/getprocessCode/${processCode.value}`,
//   );
//   const data = await response.json();
//   console.log("data", data);
//   barcodeData.value = data;
// };
// 오늘 날짜를 "YYMMDD" 형식으로 변환하는 함수
function formatDateToYYMMDD(date) {
  const year = date.getFullYear().toString().slice(2); // 연도의 마지막 두 자리
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (0부터 시작하므로 1을 더함)
  const day = date.getDate().toString().padStart(2, '0'); // 일
  return `${year}${month}${day}`;
}

// 오늘 날짜를 기본값으로 설정
const today = new Date();
const barcodeDate = ref(formatDateToYYMMDD(today));
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
  // makedBarcode.value = selectedProduct.value + barcodeDate.value;
  makedBarcode.value = route.query.productCode + barcodeDate.value;
  const PRODUCT_CODE = route.query.productBarCode + barcodeDate.value;
  productsCode.value = route.query.productCode
  try {
    const response = await $fetch(`/api/barcode/Barcodecount/${processCode.value}`);
    console.log("response", response);
    console.log("response.barcodeCount", response.barcodeCount);
    console.log("response.barcodeCount.LAST_SERIAL_NUMBER", response.barcodeCount.LAST_SERIAL_NUMBER || 0);
    lastSerialNumber.value= response.barcodeCount.LAST_SERIAL_NUMBER || 0;
    // const productData = await $fetch(`/api/products/getProducts/${productsCode.value}`);
    const ScannedBarcode = await $fetch(`/api/barcode/getScannedBarcodecount/${processCode.value}`);
    console.log("ScannedBarcodecount", ScannedBarcode);
    console.log("ScannedBarcodecount.barcodeCount============", ScannedBarcode.barcodeCount.barcode_count);
    
    ScannedBarcodecount.value = ScannedBarcode.barcodeCount.barcode_count;
    const productData = await $fetch(`/api/products/byCode/${processCode.value}`);
    console.log("productData", productData);
    PRODUCTDATA.value = productData;
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
        const barcode = `${route.query.productBarCode}${barcodeDate.value}${i.toString().padStart(5, "0")}`;
        console.log("barcode", barcode);
        barcodes.value.push(barcode);
      }

      
      router.push({
        path: "/barcode/qrprint",
        //  barcodenAndDate : `${productsCode.value.PRODUCT_BARCODE}${barcodeDate.value}${i.toString().padStart(2, "0")}`,
        query: {
          barcodes: barcodes.value.join(","), // 기존 barcodes 데이터
          // barcodeData: barcodeData.value.PRODUCT_BARCODE, // 추가된 barcodeData 데이터
          // barcodenAndDate: barcodenAndDate, // 추가된 barcodeData 데이터
          lastSerialNumber: endNumber, // 추가된 barcodeData 데이터
          productName: PRODUCTDATA.PRODUCT_NAME, // 추가된 barcodeData 데이터
          location: PRODUCTDATA.LOCATION, // 추가된 barcodeData 데이터
          carName: PRODUCTDATA.CAR, // 추가된 barcodeData 데이터
          productBarcode: PRODUCTDATA.value.PRODUCT_BARCODE, // 추가된 barcodeData 데이터
          barcodeDate: barcodeDate.value, // 추가된 barcodeData 데이터
          PROCESS_CODE: processCode.value,
          productsCode: route.query.productCode,
          quantity: quantity.value

        
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
          // barcodeData: barcodeData.value.PRODUCT_BARCODE, // 추가된 barcodeData 데이터
          lastSerialNumber: endNumber, // 추가된 barcodeData 데이터
          productName: PRODUCTDATA.value.PRODUCT_NAME, // 추가된 barcodeData 데이터
          location: barcodeData.value.LOCATION, // 추가된 barcodeData 데이터
          productBarcode: PRODUCTDATA.value.PRODUCT_BARCODE, // 추가된 barcodeData 데이터
          carName: barcodeData.value.CAR, // 추가된 barcodeData 데이터
          PROCESS_CODE: processCode.value, // 추가된 barcodeData 데이터
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

// watch(selectedProduct, (newProduct) => {
//   if (newProduct) {
//     console.log("Selected product name:", newProduct.PRODUCT_FULLNAME);
//     // Perform any other actions with the selected product
//   }
// });

</script>
<style scoped>

</style>