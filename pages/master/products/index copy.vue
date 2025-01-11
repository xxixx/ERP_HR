<template>
  <template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <h5 class="text-center mt-2">Page Title</h5>
    <hr />
    <div v-if="isLoading">
      <!-- Show loading indicator -->
      <p>Loading...</p>
    </div>
    <div v-else class="container chart_container">
      <!-- {{ jaedanRecord }} -->
    </div>
    <div class="album py-5 bg-body-tertiary">
      <div class="container">
      
        <!-- {{ pagedData }} -->
      </div>
    </div>
    <div class="container">
      <div class="mb-4 mx-4">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="검색어를 입력하세요"
        />
      </div>
      <!-- Date Range Picker -->
      <div class="text-end me-4">
        <input class="px-3 mx-1" type="date" v-model="startDate" />
        <!-- 시작 날짜 선택 -->
        <input class="px-3 mx-1" type="date" v-model="endDate" />
        <!-- 종료 날짜 선택 -->
        <button class="btn btn-sm btn-warning" @click="fetchDataByDateRange">
          조회
        </button>
        <!-- 조회 버튼 -->
      </div>
      <!-- -->
      <div class="d-flex mt-1 w-100 justify-content-center">
        <!-- <button @click="insertData" class="btn btn-warning btn-sm w-50 text-white" type="submit">INSERT</button> -->
      </div>
    </div>
    <hr />
    <div class="container">
      <div class="table-responsive">
        <table class="table table-sm text-center">
          <thead>
            <tr>
              <!-- <th>DATE</th> -->
              <th>DATE</th>
              <th>품명</th>
              <th>원단명</th>
              <th>원단번호</th>
              <th>LOT</th>
              <th>COUNT</th>
              <th class="d-none d-md-table-cell">LENGTH</th>
              <th class="d-none d-md-table-cell">연단길이</th>
              <th class="d-none d-md-table-cell">마크번호</th>
              <th class="d-none d-md-table-cell">불량</th>
              <th class="d-none d-md-table-cell">작업일</th>
              <th class="d-none d-md-table-cell">등록자</th>
              <th>
                <div
                  class="btn btn-sm btn-success sm-btn"
                  @click="exportToExcel"
                >
                  <svg
                    width="24px"
                    height="14px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="white" d="M0 0h24v24H0z" />
                      <path
                        d="M2.859 2.877l12.57-1.795a.5.5 0 0 1 .571.495v20.846a.5.5 0 0 1-.57.495L2.858 21.123a1 1 0 0 1-.859-.99V3.867a1 1 0 0 1 .859-.99zM4 4.735v14.53l10 1.429V3.306L4 4.735zM17 19h3V5h-3V3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4v-2zm-6.8-7l2.8 4h-2.4L9 13.714 7.4 16H5l2.8-4L5 8h2.4L9 10.286 10.6 8H13l-2.8 4z"
                      />
                    </g>
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pagedData" :key="index">
              <!-- <td>{{item.NO }}</td> -->
              <td>{{ formatDateToMonthDay(item.CREATE_DATE) }}</td>
              <td>{{ item.JAEDAN_PART_NAME }}</td>
              <td>{{ item.WONDAN_NAME }}</td>
              <td>{{ item.WONDAN_STORE_NO }}</td>
              <td>{{ item.LOT }}</td>
              <td>{{ item.COUNT }}</td>
              <td class="d-none d-md-table-cell">{{ item.LENGTH }}</td>
              <td class="d-none d-md-table-cell">{{ item.Y_COUNT }}</td>
              <td class="d-none d-md-table-cell">{{ item.MARKS }}</td>
              <td class="d-none d-md-table-cell">{{ item.DEFECTIVE }}</td>
              <td class="d-none d-md-table-cell">
                {{ formatDateToMonthDay(item.WORK_DATE) }}
              </td>
              <!-- <td class="d-none d-md-table-cell">{{ formatDate(item.Y_COUNT) }}</td>
  <td class="d-none d-md-table-cell">{{ formatDate(item.Y_COUNT) }}</td> -->
              <td class="d-none d-md-table-cell">
                {{ item.REG_ACCOUNT_NAME }}
              </td>
              <td>
                <div class="btn btn-sm btn-danger" @click="onDelete(item.NO)">
                  DEL
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- paging -->
      <div class="pages d-flex justify-content-center">
        <ul class="pagination pages">
          <li>
            <a
              href="#"
              class="back"
              :class="{ disabled: currentPage === 1 }"
              @click="prevPage"
              aria-label="Previous"
            >
              <span aria-hidden="true" class="fa fa-arrow-circle-left"></span>
              Prev</a
            >
          </li>
          <li
            class="page-item d-inline"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <a
              href="#"
              class="page page-item"
              :class="{ active: currentPage === page }"
              @click="goToPage(page)"
              >{{ page }}</a
            >
          </li>
          <li class="page-item d-inline">
            <a
              href="#"
              class="next"
              :class="{ disabled: currentPage === totalPages }"
              @click="nextPage"
              aria-label="Next"
            >
              <span aria-hidden="true" class="fa fa-arrow-circle-right"></span
              >Next</a
            >
          </li>
        </ul>
      </div>
      <!-- paging -->
    </div>
    <hr />
  </div>
</template>
</template>

<script lang="ts" setup>

</script>

<style>

</style>