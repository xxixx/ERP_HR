<template>
  <div>
    <h1>작업자 현황 관리</h1>
    <!-- {{ workers }} -->
    <hr>
    
    <div>
      <label for="datePicker">날짜 선택:</label>
      <input type="date" v-model="selectedDate" @change="fetchDataByDate" id="datePicker" />
    </div>

    <div v-if="dayOfworkers.length">
  <table>
    <thead>
      <tr>
        <th>NO</th>
        <th>NAME</th>
        <th>DATE</th>
        <th>DAY_OF_WORKERS</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="worker in dayOfworkersComputed" :key="worker.NO">
        <td>{{ worker.NO }}</td>
        <td>{{ worker.NAME }}</td>
        <td>{{ worker.DATE }}</td>
        <td>{{ worker.DAY_OF_WORKERS }}</td>
      </tr>
    </tbody>
  </table>
</div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <form @submit.prevent="submitCheckedWorkers">
        <div v-for="worker in workers" :key="worker.NO">
          <label>
            <input type="checkbox" :value="worker.NO" @change="toggleWorker(worker.NO)" />
            {{ worker.NO }}
            {{ worker.NAME }}
          </label>
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
    <div>
  <h2>저장된 작업자 정보</h2>
  <ul>
    <li v-for="savedWorker in savedWorkers" :key="savedWorker.WORKER_NO">
      {{ savedWorker.WORKER_IDS }} - {{ savedWorker.NAME }} ({{ savedWorker.DATE }})
    </li>
  </ul>
</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface WorkerModel {
  NO: number;
  NAME: string;
}
interface SavedWorkerModel {
  WORKER_NO: number;
  NAME: string;
  DATE: string;
}

const workers = ref<WorkerModel[]>([]);

const dayOfworkers = ref<WorkerModel[]>([]);
const checkedWorkers = ref<Set<number>>(new Set());
const isLoading = ref(true);
const savedWorkers = ref<SavedWorkerModel[]>([]);


const fetchData = async () => {
  try {
    const result = await $fetch<WorkerModel[]>("/api/workers/getWorkers");
    console.log("result data", result);
    workers.value = result;
  } catch {
    alert("Fetch error");
  } finally {
    isLoading.value = false;
  }
};
const fetchSavedWorkers = async () => {
  try {
    const result = await $fetch<SavedWorkerModel[]>("/api/workers/getSavedWorkers");
    console.log("result data", result);
    savedWorkers.value = result;
  } catch {
    alert("Fetch error");
  }
};


const toggleWorker = (id: number) => {
  if (checkedWorkers.value.has(id)) {
    checkedWorkers.value.delete(id);
  } else {
    checkedWorkers.value.add(id);
  }
};

const submitCheckedWorkers = async () => {
  try {
    const checkedWorkersArray = Array.from(checkedWorkers.value);
    const workersWithDate = checkedWorkersArray.map((workerNo) => ({
      WORKER_NO: workerNo,
      // DATE: new Date().toISOString(), // Convert Date to string
    }));
    const requestBody = { checkedWorkers: workersWithDate };
    console.log('Request Body:', requestBody);
    // const response = await $fetch("/api/workers/saveCheckedWorkers", {
    const response = await $fetch("/api/workers/saveCheckedWorkersRegister", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
    if (response.ok) {
      alert("저장되었습니다.");
      checkedWorkers.value.forEach((workerId) => toggleWorker(workerId));
      checkedWorkers.value = new Set(); // Reset the checked workers to an empty set
      checkedWorkers.value.clear(); // Clear the checked workers
      workers.value.forEach((worker) => {
        const checkbox = document.querySelector(`input[type="checkbox"][value="${worker.NO}"]`);
        if (checkbox) {
          checkbox.checked = false;
        }
      });
    } else {
      alert("저장 실패");
    }
  } catch {
    alert("저장 중 오류 발생");
  }
};

const selectedDate = ref<string>(new Date().toISOString().split('T')[0]); // 현재 날짜로 초기화

// const fetchDataByDate = async () => {
//   if (!selectedDate.value) return;

//   try {
//     isLoading.value = true;
//     const result = await $fetch<WorkerModel[]>(`/api/workers/getWorkersByDate?date=${selectedDate.value}`);
//       console.log("result getWorkersByDate", result);
//     dayOfworkers.value = result
//     ;
//   } catch {
//     alert("Fetch error");
//   } finally {
//     isLoading.value = false;
//   }
// };
const fetchDataByDate = async () => {
  if (!selectedDate.value) return;

  try {
    isLoading.value = true;
    const result = await $fetch<WorkerModel[]>(`/api/workers/getWorkersByDate?date=${selectedDate.value}`);
    console.log("result getWorkersByDate", result);
    dayOfworkers.value = result.data;
    // Vue.set(this, 'dayOfworkers', result);
   
  } catch {
    alert("Fetch error");
  } finally {
    isLoading.value = false;
  }
};
const dayOfworkersComputed = computed(() => dayOfworkers.value || []);
  


onMounted(() => {
  fetchData();
  fetchSavedWorkers();
  
});
</script>