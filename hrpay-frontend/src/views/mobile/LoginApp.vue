<template>
  <div class="login-container">
    <div class="logo-box">
        <img src="@/assets/heart.png" alt="GCG Logo" class="logo-image" />
    </div>

    <h2>Login to Manusa</h2>

    <form @submit.prevent="login">
      <label for="email">E-mail:</label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="yourmail@mail.com"
        required
      />

      <label for="password">Password:</label>
      <div class="password-wrapper">
        <input
          id="password"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          required
        />
        <span class="toggle" @click="showPassword = !showPassword">👁️</span>
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()

const login = async () => {
  const res = await fetch('http://localhost:8000/api/method/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ usr: email.value, pwd: password.value }),
    credentials: 'include',
  })

  const data = await res.json()

  if (data.message === 'Logged In') {
    const rolesRes = await fetch(
      'http://localhost:8000/api/method/frappe.desk.session.get',
      {
        credentials: 'include',
      }
    )
    const rolesData = await rolesRes.json()
    const roles = rolesData.message.user.roles.map(r => r.role)

    // Routing by role
    if (roles.includes('Chief of Finance Officer')) {
      router.push('/cfo-dashboard')
    } else if (roles.includes('Chief Officers')) {
      router.push('/co-dashboard')
    } else if (roles.includes('HR')) {
      router.push('/hr-dashboard')
    } else {
      router.push('/employee-dashboard')
    }
  } else {
    alert('Login failed')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background: #e6e6e6;
  height: 100vh;
  box-sizing: border-box;
}

.logo-box {
  width: 160px;
  height: 160px;
  background: #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}

h2 {
  margin-bottom: 24px;
  font-weight: bold;
  text-align: center;
}

label {
  align-self: flex-start;
  margin: 10px 0 4px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  background: #d3d3d3;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 10px;
}

.password-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.password-wrapper input {
  flex: 1;
}

.toggle {
  margin-left: -30px;
  cursor: pointer;
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  background: #d3d3d3;
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
  margin-top: 20px;
}
</style>
