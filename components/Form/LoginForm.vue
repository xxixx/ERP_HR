<template>
  <div class="container d-flex justify-content-center">
    <!-- <h4> {{$store.state.loginUser}}</h4> -->
    <hr>
    
<div class="login " >
    <form @submit.prevent="handleLoginSubmit" style="min-width: 500px;" >
    <img class="mb-4" src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="" width="172" height="157">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating my-1">
      <input type="email" class="form-control" id="floatingInput" v-model="form.email" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" v-model="form.password" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

    <div class="form-check text-start my-3">
      <!-- <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"> -->
      <label class="form-check-label" for="flexCheckDefault">
        Message text 
      </label>
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    <!-- <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p> -->
  </form>
  </div>
  </div>
  
</template>
<script lang="ts" setup>
const {signIn} = useAuthStore();
const form = ref({
        email: '',
        password: '',
      });
const error = ref<Error | null>(null);
const loading = ref(false);


const handleLoginSubmit = async() =>{
  try{
        error.value= null;
        loading.value = true;
        await signIn(form.value.email, form.value.password);
        const {isAdmin} = storeToRefs(useAuthStore());

const redirect = isAdmin.value ? '/admin' : '/';
await navigateTo(redirect);

    }catch (err: unknown) {
        if (err instanceof Error) {
          error.value = err;
        } else {
          throw Error;
        }
    }finally{
      loading.value = false;
  }

}
</script>

<style>

</style>