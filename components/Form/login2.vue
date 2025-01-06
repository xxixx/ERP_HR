<template>
  <div class="container d-flex justify-content-center">
    <div class="login">
      <form @submit.prevent="handleLoginSubmit" style="min-width: 500px;">
        <img class="mb-4" src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="" width="172" height="157">
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        <div class="form-floating my-1">
          <input type="email" class="form-control" v-model="form.EMAIL" placeholder="name@example.com">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" v-model="form.PASSWORD" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import { useAccountStore } from '~/store/account';
import { useAccountStore } from '~/stores/account';

const form = ref({ EMAIL: '', PASSWORD: '' });
const router = useRouter();
const accountStore = useAccountStore();

const handleLoginSubmit = async () => {
  try {
    const response = await fetch('/api/account/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    const data = await response.json();
    console.log('Login successful data', data);

    if (response.ok) {
      
      const token = data.token || data.data;
      if (!token) {
        console.error('No token found in response');
        return;
      }
      const user = parseJwt(token);
      if (user) {
        console.log('Login successful user', user);
        accountStore.setUser(user);
        accountStore.setID(user);
        router.push('/');
      } else {
        alert('Failed to parse user data from token.');
      }
    } else {
      alert(data.error);
    }
    

  } catch (error) {
    console.error('Login failed', error);
  }
};

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error parsing JWT', e);
    return null;
  }
};

</script>
