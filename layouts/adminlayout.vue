<template>
  <div class="wrapper">
       <nav id="sidebar" class="sidebar">
           <div class="sidebar-header">
               <h3>Navigation</h3>
           </div>
           <ul class="list-unstyled components">
               <li class="active">
                   <a href="#homeSubmenu" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Menu 1</a>
                   <ul class="collapse list-unstyled" id="homeSubmenu">
                       <li><a href="/admin/accounts">사용자 관리</a></li>
                       <li><a href="#">Submenu 1.2</a></li>
                       <li><a href="#">Submenu 1.3</a></li>
                   </ul>
               </li>
               <li>
                   <a href="#pageSubmenu" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Menu 2</a>
                   <ul class="collapse list-unstyled" id="pageSubmenu">
                       <li><a href="#">Submenu 2.1</a></li>
                       <li><a href="#">Submenu 2.2</a></li>
                       <li><a href="#">Submenu 2.3</a></li>
                   </ul>
               </li>
               <li>
                   <a href="#">Menu 3</a>
               </li>
           </ul>
       </nav>
       <div id="content">
           <nav class="navbar navbar-expand-lg navbar-light bg-light">
               <div class="container-fluid">
                   <button type="button" id="sidebarCollapse" class="btn btn-info">
                       <i class="fas fa-align-left"></i>
                       <span>Toggle Sidebar</span>
                   </button>
                   <div class="ms-auto">
                       <div id="userInfo" class="d-none">
                           <span id="userName"></span>
                           <button id="logoutBtn" class="btn btn-outline-danger ms-2">Logout</button>
                       </div>
                       <button id="loginBtn" class="btn btn-primary">Login</button>
                   </div>
               </div>
           </nav>
       </div>
   </div>
   <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
       <div class="modal-dialog">
           <div class="modal-content">
               <div class="modal-header">
                   <h5 class="modal-title" id="loginModalLabel">Login</h5>
                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                   <form id="loginForm">
                       <div class="mb-3">
                           <label for="username" class="form-label">Username</label>
                           <input type="text" class="form-control" id="username" required>
                       </div>
                       <div class="mb-3">
                           <label for="password" class="form-label">Password</label>
                           <input type="password" class="form-control" id="password" required>
                       </div>
                       <button type="submit" class="btn btn-primary">Login</button>
                   </form>
               </div>
           </div>
       </div>
   </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
body {
   font-family: 'Arial', sans-serif;
   background: #fafafa;
}

.wrapper {
   display: flex;
   width: 100%;
   align-items: stretch;
}

#sidebar {
   min-width: 250px;
   max-width: 250px;
   background: #000000;
   color: #fff;
   transition: all 0.3s;
}

#sidebar.active {
   margin-left: -250px;
}

#sidebar .sidebar-header {
   padding: 20px;
   background: #000000;
}

#sidebar ul.components {
   padding: 20px 0;
   border-bottom: 1px solid #47748b;
}

#sidebar ul p {
   color: #fff;
   padding: 10px;
}

#sidebar ul li a {
   padding: 10px;
   font-size: 1.1em;
   display: block;
   color: #fff;
   text-decoration: none;
}

#sidebar ul li a:hover {
   color: #090909;
   background: #fff;
}

#sidebar ul li.active > a, a[aria-expanded="true"] {
  color: #090909;
   background: #dadadb;
}

ul ul a {
   font-size: 0.9em !important;
   padding-left: 30px !important;
   background: #0c0c0c;
}

#content {
   width: 100%;
   padding: 20px;
   min-height: 100vh;
   transition: all 0.3s;
}

.dropdown-toggle::after {
   display: block;
   position: absolute;
   top: 50%;
   right: 20px;
   transform: translateY(-50%);
}

@media (max-width: 768px) {
   #sidebar {
       margin-left: -250px;
   }
   #sidebar.active {
       margin-left: 0;
   }
   #sidebarCollapse span {
       display: none;
   }
}

</style>]