<template>
  <div>
    <div id="wrapper">
      <div class="d-flex flex-column" id="content-wrapper">
       
        <div id="content">
          <nav
            class="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light"
          >
            <div class="container-fluid">
              <button
                class="btn btn-link d-md-none rounded-circle me-3"
                id="sidebarToggleTop"
                type="button"
              >
                <i class="fas fa-bars"></i>
              </button>
              <!-- <form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div class="input-group"><input class="bg-light form-control border-0 small" type="text" placeholder="Search for ..."><button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button></div>
                        </form> -->
              <ul class="navbar-nav flex-nowrap ms-auto">
                <li class="nav-item dropdown d-sm-none no-arrow">
                  <a
                    class="dropdown-toggle nav-link"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="#"
                    ><i class="fas fa-search"></i
                  ></a>
                  <div
                    class="dropdown-menu dropdown-menu-end p-3 animated--grow-in"
                    aria-labelledby="searchDropdown"
                  >
                    <form class="me-auto navbar-search w-100">
                      <div class="input-group">
                        <input
                          class="bg-light form-control border-0 small"
                          type="text"
                          placeholder="Search for ..."
                        />
                        <div class="input-group-append">
                          <button class="btn btn-primary py-0" type="button">
                            <i class="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>
                <li class="nav-item dropdown no-arrow mx-1">
                  <div class="nav-item dropdown no-arrow">
                    <a
                      class="dropdown-toggle nav-link"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      href="#"
                      ><span class="badge bg-danger badge-counter">3+</span
                      ><i class="fas fa-bell fa-fw"></i
                    ></a>
                    <div
                      class="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in"
                    >
                      <h6 class="dropdown-header">alerts center</h6>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div class="me-3">
                          <div class="bg-primary icon-circle">
                            <i class="fas fa-file-alt text-white"></i>
                          </div>
                        </div>
                        <div>
                          <span class="small text-gray-500"
                            >December 12, 2019</span
                          >
                          <p>A new monthly report is ready to download!</p>
                        </div> </a
                      ><a
                        class="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div class="me-3">
                          <div class="bg-success icon-circle">
                            <i class="fas fa-donate text-white"></i>
                          </div>
                        </div>
                        <div>
                          <span class="small text-gray-500"
                            >December 7, 2019</span
                          >
                          <p>$290.29 has been deposited into your account!</p>
                        </div> </a
                      ><a
                        class="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div class="me-3">
                          <div class="bg-warning icon-circle">
                            <i
                              class="fas fa-exclamation-triangle text-white"
                            ></i>
                          </div>
                        </div>
                        <div>
                          <span class="small text-gray-500"
                            >December 2, 2019</span
                          >
                          <p>
                            Spending Alert: We've noticed unusually high
                            spending for your account.
                          </p>
                        </div> </a
                      ><a
                        class="dropdown-item text-center small text-gray-500"
                        href="#"
                        >Show All Alerts</a
                      >
                    </div>
                  </div>
                </li>
                <li class="nav-item dropdown no-arrow mx-1">
                  <div class="nav-item dropdown no-arrow">
                    <a
                      class="dropdown-toggle nav-link"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      href="#"
                      ><span class="badge bg-danger badge-counter">7</span
                      ><i class="fas fa-envelope fa-fw"></i
                    ></a>
                    <div
                      class="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in"
                    >
                      <h6 class="dropdown-header">alerts center</h6>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div class="dropdown-list-image me-3">
                          <img class="rounded-circle" src="/" />
                          <div class="bg-success status-indicator"></div>
                        </div>
                        <div class="fw-bold">
                          <div class="text-truncate">
                            <span
                              >Hi there! I am wondering if you can help me with
                              a problem I've been having.</span
                            >
                          </div>
                          <p class="small text-gray-500 mb-0">
                            Emily Fowler - 58m
                          </p>
                        </div> </a
                      ><a
                        class="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div class="dropdown-list-image me-3">
                          <img class="rounded-circle" src="" />
                          <div class="status-indicator"></div>
                        </div>
                        <div class="fw-bold">
                          <div class="text-truncate">
                            <span
                              >I have the photos that you ordered last
                              month!</span
                            >
                          </div>
                          <p class="small text-gray-500 mb-0">Jae Chun - 1d</p>
                        </div> </a
                      ><a
                        class="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div class="dropdown-list-image me-3">
                          <img class="rounded-circle" src="" />
                          <div class="bg-warning status-indicator"></div>
                        </div>
                        <div class="fw-bold">
                          <div class="text-truncate">
                            <span
                              >Last month's report looks great, I am very happy
                              with the progress so far, keep up the good
                              work!</span
                            >
                          </div>
                          <p class="small text-gray-500 mb-0">
                            Morgan Alvarez - 2d
                          </p>
                        </div> </a
                      ><a
                        class="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div class="dropdown-list-image me-3">
                          <img class="rounded-circle" src="" />
                          <div class="bg-success status-indicator"></div>
                        </div>
                        <div class="fw-bold">
                          <div class="text-truncate">
                            <span
                              >Am I a good boy? The reason I ask is because
                              someone told me that people say this to all dogs,
                              even if they aren't good...</span
                            >
                          </div>
                          <p class="small text-gray-500 mb-0">
                            Chicken the Dog · 2w
                          </p>
                        </div> </a
                      ><a
                        class="dropdown-item text-center small text-gray-500"
                        href="#"
                        >Show All Alerts</a
                      >
                    </div>
                  </div>
                  <div
                    class="shadow dropdown-list dropdown-menu dropdown-menu-end"
                    aria-labelledby="alertsDropdown"
                  ></div>
                </li>
                <div class="d-none d-sm-block topbar-divider"></div>
                <li class="nav-item dropdown no-arrow">
                  <div class="nav-item dropdown no-arrow">
                    <a
                      class="dropdown-toggle nav-link"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      href="#"
                      ><span class="d-none d-lg-inline me-2 text-gray-600 small"
                        >Valerie Luna</span
                      ><img class="border rounded-circle img-profile" src=""
                    /></a>
                    <div
                      class="dropdown-menu shadow dropdown-menu-end animated--grow-in"
                    >
                      <a class="dropdown-item" href="#"
                        ><i
                          class="fas fa-user fa-sm fa-fw me-2 text-gray-400"
                        ></i
                        >&nbsp;Profile</a
                      ><a class="dropdown-item" href="#"
                        ><i
                          class="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"
                        ></i
                        >&nbsp;Settings</a
                      ><a class="dropdown-item" href="#"
                        ><i
                          class="fas fa-list fa-sm fa-fw me-2 text-gray-400"
                        ></i
                        >&nbsp;Activity log</a
                      >
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#"
                        ><i
                          class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"
                        ></i
                        >&nbsp;Logout</a
                      >
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div class="container-fluid">
            <div
              class="d-sm-flex justify-content-between align-items-center mb-4"
            >
              <h3 class="text-dark mb-0">Dashboard</h3>
              <a
                class="btn btn-primary btn-sm d-none d-sm-inline-block"
                role="button"
                href="#"
                ><i class="fas fa-download fa-sm text-white-50"></i
                >&nbsp;Generate Report</a
              >
            </div>
            <div class="row">
             
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-primary py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-primary fw-bold text-xs mb-1"
                        >
                          <span>생샨 계획</span>
                        </div>
                      
                        <div v-for="item in workOrderList" :key="item.NO" class="text-dark fw-bold h6 mb-0">
                          <span class="">{{item.PRODUCT_FULLNAME}}/{{ item.PRODUCT_CODE }}</span>
                        </div>
                        
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>재단진행</span>
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="">
                            <div v-for="item in getJaedanData" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span>{{ item.PRODUCT_FULLNAME }}</span>
                            </div>
                          </div>
                          <div class="">
                            <div class="progress progress-sm">
                              <div
                                class="progress-bar progress-bar-striped bg-info progress-bar-animated"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 100%"
                              >
                               
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                        <i
                          class="fas fa-clipboard-list fa-2x text-gray-300"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>재단완료품</span>
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="col-auto">
                            <div v-for="item in jaedanRecord" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span>{{ item.PRODUCT_FULLNAME }}</span>
                            </div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm">
                              <div
                                class="progress-bar bg-info"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 50%"
                              >
                                <span class="visually-hidden">50%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                        <i
                          class="fas fa-clipboard-list fa-2x text-gray-300"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>재단재고</span>
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="col-auto">
                            <div v-for="item in processStatenRecord" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span>{{ item.PRODUCT_FULLNAME }}</span>
                            </div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm">
                              <div
                                class="progress-bar bg-info"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 50%"
                              >
                                <span class="visually-hidden">50%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                        <i
                          class="fas fa-clipboard-list fa-2x text-gray-300"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>생산대기</span>
                          <!-- {{ standByprocess }} -->
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="col-auto">
                            <div v-for="item in standByprocess" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span>{{ item.PRODUCT_FULLNAME }}</span>
                            </div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm">
                              <div
                                class="progress-bar bg-info"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 50%"
                              >
                             
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                        <i
                          class="fas fa-clipboard-list fa-2x text-gray-300"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>생산진행</span>
                          <!-- {{ standByprocess }} -->
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="col-auto">
                            <div v-for="item in stateOnProcess" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span>{{ item.PRODUCT_FULLNAME }}</span>
                            </div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm">
                              <div
                                class="progress-bar bg-info"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 50%"
                              >
                             
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                        <i
                          class="fas fa-clipboard-list fa-2x text-gray-300"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>일봉재생산량</span>
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="col-auto">
                            <div v-for="item in latestProduction" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span>{{ item.REG_DATE }}%</span>
                            </div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm">
                              <div
                                class="progress-bar bg-info"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 50%"
                              >
                                <span class="visually-hidden">50%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                        <i
                          class="fas fa-clipboard-list fa-2x text-gray-300"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>일폴딩생산량</span>
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="col-auto">
                            <div v-for="item in getLatestDayProduction" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span>{{ item.REG_DATE }}%</span>
                            </div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm">
                              <div
                                class="progress-bar bg-info"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 50%"
                              >
                                <span class="visually-hidden">50%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                        <i
                          class="fas fa-clipboard-list fa-2x text-gray-300"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-warning py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-warning fw-bold text-xs mb-1"
                        >
                          <span>생산 투입인원</span>
                        </div>
                        <div class="text-dark fw-bold h5 mb-0">
                          <span>18</span>
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-user-friends fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
            
              <div class="col-lg-6 mb-4">
                
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="text-primary fw-bold m-0">원단 재고</h6>
                  </div>
                  <div class="card-body">
                    <template v-for="(data, name) in wondanCounts" :key="name">
                      <h4 class="small fw-bold">
                        {{ name }} ({{ data.count }}개)<span class="float-end">{{ data.totalLength }}m</span>
                      </h4>
                      <div class="progress mb-4">
                        <div
                          class="progress-bar"
                          :class="{
                            'bg-danger': data.totalLength < 300,
                            'bg-warning': data.totalLength >= 300 && data.totalLength < 500,
                            'bg-success': data.totalLength >= 500
                          }"
                          :aria-valuenow="Math.min(100, (data.totalLength/1000)*100)"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          :style="{ width: Math.min(100, (data.totalLength/1000)*100) + '%' }"
                        >
                          <span class="visually-hidden">{{ Math.min(100, (data.totalLength/1000)*100) }}%</span>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="text-primary fw-bold m-0">공지사항</h6>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                          <h6 class="mb-0"><strong>Lunch meeting</strong></h6>
                          <span class="text-xs">10:30 AM</span>
                        </div>
                        <div class="col-auto">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="formCheck-1"
                            /><label
                              class="form-check-label"
                              for="formCheck-1"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                          <h6 class="mb-0"><strong>Lunch meeting</strong></h6>
                          <span class="text-xs">11:30 AM</span>
                        </div>
                        <div class="col-auto">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="formCheck-2"
                            /><label
                              class="form-check-label"
                              for="formCheck-2"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                          <h6 class="mb-0"><strong>Lunch meeting</strong></h6>
                          <span class="text-xs">12:30 AM</span>
                        </div>
                        <div class="col-auto">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="formCheck-3"
                            /><label
                              class="form-check-label"
                              for="formCheck-3"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-6 mb-4">
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="text-primary fw-bold m-0">상품재고</h6>
                  </div>
                  <div class="card-body">
                    <h4 class="small fw-bold">
                      Server migration<span class="float-end">20%</span>
                    </h4>
                    <div class="progress mb-4">
                      <div
                        class="progress-bar bg-danger"
                        aria-valuenow="20"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 20%"
                      >
                        <span class="visually-hidden">20%</span>
                      </div>
                    </div>
                    <h4 class="small fw-bold">
                      Sales tracking<span class="float-end">40%</span>
                    </h4>
                    <div class="progress mb-4">
                      <div
                        class="progress-bar bg-warning"
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 40%"
                      >
                        <span class="visually-hidden">40%</span>
                      </div>
                    </div>
                    <h4 class="small fw-bold">
                      Customer Database<span class="float-end">60%</span>
                    </h4>
                    <div class="progress mb-4">
                      <div
                        class="progress-bar bg-primary"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 60%"
                      >
                        <span class="visually-hidden">60%</span>
                      </div>
                    </div>
                    <h4 class="small fw-bold">
                      Payout Details<span class="float-end">80%</span>
                    </h4>
                    <div class="progress mb-4">
                      <div
                        class="progress-bar bg-info"
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 80%"
                      >
                        <span class="visually-hidden">80%</span>
                      </div>
                    </div>
                    <h4 class="small fw-bold">
                      Account setup<span class="float-end">Complete!</span>
                    </h4>
                    <div class="progress mb-4">
                      <div
                        class="progress-bar bg-success"
                        aria-valuenow="100"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 100%"
                      >
                        <span class="visually-hidden">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="text-primary fw-bold m-0">공지사항</h6>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                          <h6 class="mb-0"><strong>Lunch meeting</strong></h6>
                          <span class="text-xs">10:30 AM</span>
                        </div>
                        <div class="col-auto">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="formCheck-4"
                            /><label
                              class="form-check-label"
                              for="formCheck-4"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                          <h6 class="mb-0"><strong>Lunch meeting</strong></h6>
                          <span class="text-xs">11:30 AM</span>
                        </div>
                        <div class="col-auto">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="formCheck-5"
                            /><label
                              class="form-check-label"
                              for="formCheck-5"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                          <h6 class="mb-0"><strong>Lunch meeting</strong></h6>
                          <span class="text-xs">12:30 AM</span>
                        </div>
                        <div class="col-auto">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="formCheck-6"
                            /><label
                              class="form-check-label"
                              for="formCheck-6"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <div class="col-lg-6 mb-4">
                    <div class="card text-white bg-primary shadow">
                      <div class="card-body">
                        <p class="m-0">Primary</p>
                        <p class="text-white-50 small m-0">#4e73df</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card text-white bg-success shadow">
                      <div class="card-body">
                        <p class="m-0">Success</p>
                        <p class="text-white-50 small m-0">#1cc88a</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card text-white bg-info shadow">
                      <div class="card-body">
                        <p class="m-0">Info</p>
                        <p class="text-white-50 small m-0">#36b9cc</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card text-white bg-warning shadow">
                      <div class="card-body">
                        <p class="m-0">Warning</p>
                        <p class="text-white-50 small m-0">#f6c23e</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card text-white bg-danger shadow">
                      <div class="card-body">
                        <p class="m-0">Danger</p>
                        <p class="text-white-50 small m-0">#e74a3b</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card text-white bg-secondary shadow">
                      <div class="card-body">
                        <p class="m-0">Secondary</p>
                        <p class="text-white-50 small m-0">#858796</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a class="border rounded d-inline scroll-to-top" href="#page-top"
        ><i class="fas fa-angle-up"></i
      ></a>
    </div>
  </div>
</template>

<script setup>
const workOrderList = ref([]);
// const filteredData = ref<WorkOrderModel[]>([]);

const isLoading = ref(true);

const fetchWorkOrder = async () => {
  try {
    // const result = await $fetch('/api/workOrder/getOrder');
    const result = await $fetch("/api/workOrder/getOrderWithAccount");
    console.log("result data", result.data);
    workOrderList.value = result.data;
   isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};
//재단 데이터 가져오기
const getJaedanData = ref([]);
const fetchJaedanData = async () => {
  try {
    const result = await $fetch("/api/workOrder/getOrderWithAccountStateUp");
    console.log("result data", result.data);
    getJaedanData.value = result.data;
    // isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};
//재단제고 데이터 가져오기
const jaedanRecord = ref([]);
const fetchJaedanJegoData = async () => {
  try {
    const result = await $fetch("/api/jaedan/getRecord10");
    jaedanRecord.value = result.data
    // filteredData.value = jaedanRecord.value; // filteredData에 초기값 할당
    isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};
//생산대기
const processStatenRecord = ref([]);
 const fetchProcessStateRecord = async () => {
  try {
    const result = await $fetch("/api/jaedan/getProcessStateRecord");
    processStatenRecord.value = result.data
    // filteredData.value = jaedanRecord.value; // filteredData에 초기값 할당
    isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};

const latestProduction = ref([]);

const fetchLatestProduction = async () => {
  try {
    const result = await $fetch("/api/production/getLatestDayProduction");
    if (result.success) {
      latestProduction.value = result.data;
      console.log("Latest production data:", result.data);
    }
  } catch (error) {
    console.error("Error fetching latest production:", error);
  }
};
//생산 대기 데이터
const standByprocess = ref([]);
const standByprocessfetchData = async () => {
  try {
    const result = await $fetch("/api/production/getProcessStateStandbyRecord");
    standByprocess.value = result.data;
    // console.log("jaedanRecord: ", standByprocess.value);
    // filteredData.value = jaedanRecord.value; // filteredData에 초기값 할당
    isLoading.value = false; // Set loading state to false when data is fetched
   
  } catch {
    alert("Fetch error");
  }
};
const stateOnProcess = ref([]);
const getProcessStateOnRecord = async () => {
  try {
    const result = await $fetch("/api/production/getProcessStateOnRecord");
    stateOnProcess.value = result.data;
    // console.log("jaedanRecord: ", standByprocess.value);
    // filteredData.value = jaedanRecord.value; // filteredData에 초기값 할당
    isLoading.value = false; // Set loading state to false when data is fetched
   
  } catch {
    alert("Fetch error");
  }
};
//사용가능 원단
const useableWondan =ref([]);
const fetetchUseableWondan = async () => {
  try {
    const result = await $fetch("/api/wondan/getUseable");
    useableWondan.value = result.data;
  
    isLoading.value = false; 
   
  } catch {
    alert("Fetch error");
  }
};

const wondanCounts = computed(() => {
  const counts = {};
  useableWondan.value.forEach(wondan => {
    if (!counts[wondan.WONDAN_NAME]) {
      counts[wondan.WONDAN_NAME] = {
        count: 0,
        totalLength: 0
      };
    }
    counts[wondan.WONDAN_NAME].count++;
    counts[wondan.WONDAN_NAME].totalLength += wondan.LENGTH;
  });
  return counts;
});

onMounted(() => {
  fetchWorkOrder();
  fetchJaedanData();
  fetchJaedanJegoData();
  fetchProcessStateRecord();
  fetchLatestProduction();
  standByprocessfetchData();
  getProcessStateOnRecord();
  fetetchUseableWondan();
});
</script>

<style lang="scss" scoped></style>
