<template>
    <div class="btn btn-sm btn-success sm-btn" @click="exportToExcel">
                        <svg width="24px" height="14px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                        <path fill="white" d="M0 0h24v24H0z"/>
                        <path d="M2.859 2.877l12.57-1.795a.5.5 0 0 1 .571.495v20.846a.5.5 0 0 1-.57.495L2.858 21.123a1 1 0 0 1-.859-.99V3.867a1 1 0 0 1 .859-.99zM4 4.735v14.53l10 1.429V3.306L4 4.735zM17 19h3V5h-3V3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4v-2zm-6.8-7l2.8 4h-2.4L9 13.714 7.4 16H5l2.8-4L5 8h2.4L9 10.286 10.6 8H13l-2.8 4z"/>
                         </g>
                         </svg></div>
</template>

<script lang="ts" setup>
import * as XLSX from 'xlsx';
// excel 데이터 받기
const exportToExcel = () => {
  const data : any = '';
//   const data = getInsertData.value; // Assuming getInsertData contains the table data

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });

  const fileName = 'table_data.xlsx';
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
};
</script>

<style>

</style>