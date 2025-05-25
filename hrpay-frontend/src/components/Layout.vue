<template>
  <div v-if="isLoggedIn && $route.path !== '/form'" class="dashboard">
    <Sidebar />
    <div class="main">
      <Navbar />
      <div class="content">
        <router-view /> 
      </div>
    </div>
  </div>

  <div v-else>
    <router-view /> 
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'

const isLoggedIn = ref(false)
const route = useRoute()
const router = useRouter()

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  console.log("Status Login (Layout.vue):", isLoggedIn.value)
})

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push('/login')
}
</script>
