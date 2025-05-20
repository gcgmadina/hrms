<template>
  <div class="page-container">
    <div class="left-panel">
      <h1>Welcome Back!</h1>
      <p>Manage your tasks efficiently with <strong>HRPay</strong></p>
      <!-- Optional: Tambahkan ilustrasi di sini -->
    </div>

    <div class="right-panel">
      <div class="login-card">
        <h2>Login to your account</h2>
        <form @submit.prevent="login">
          <label for="usr">Username</label>
          <input
            id="usr"
            v-model="usr"
            placeholder="Enter your username"
            required
          />

          <label for="pwd">Password</label>
          <input
            id="pwd"
            type="password"
            v-model="pwd"
            placeholder="Enter your password"
            required
          />

          <button type="submit" class="login-button">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()

const usr = ref('')
const pwd = ref('')

const login = async () => {
  const res = await fetch('http://localhost:8000/api/method/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ usr: usr.value, pwd: pwd.value }),
    credentials: 'include'
  })

   console.log('submit');

  const data = await res.json()

  if (data.message === 'Logged In') {
    localStorage.setItem('isLoggedIn', 'true');
    console.log("Login Berhasil, Status di LocalStorage:", localStorage.getItem("isLoggedIn")); // Debug!
    router.push('/dashboard')
  } else {
    alert('Login gagal')
  }
}
</script>

<style scoped>
.page-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
  font-family: 'Segoe UI', sans-serif;
  box-sizing: border-box;
  flex-direction: row;
}

.left-panel {
  flex: 1;
  background-color: #0077b6;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.left-panel h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.left-panel p {
  font-size: 18px;
  max-width: 400px;
}

.right-panel {
  flex: 1;
  background-color: #f4f6f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 24px;
  color: #222;
  font-weight: 600;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #555;
  margin-top: 16px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  margin-top: 24px;
  padding: 12px;
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover {
  background-color: #005f8c;
}

/* mobile-version */
@media (max-width: 768px) {
   .page-container {
    flex-direction: column;
    overflow-y: auto; /* biar bisa scroll kalau konten tinggi */
  }
  

  .left-panel, .right-panel {
    flex: unset;
    width: 100%;
    height: auto;
  }

  .left-panel {
    text-align: center;
    padding: 40px 20px;
  }

  .right-panel {
    padding: 20px;
    min-height: 50vh;
    justify-content: flex-start;
  }

  .login-card {
    margin-top: 20px;
    width: 100%;
    max-width: none;
    box-shadow: none;
    border-radius: 0;
  }
}
</style>
