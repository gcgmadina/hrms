<template>
  <div class="dashboard" v-if="isLoggedIn && $route.path !== '/form'">
    <Sidebar />
    <div class="main">
      <Navbar />
      <div class="content">
        <slot /> <!-- Tempat isi halaman -->
      </div>
    </div>
  </div>
  <div v-else>
    <slot /> <!-- Tampilan tanpa sidebar/navbar -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';

const isLoggedIn = ref(false);
const router = useRouter();

const logout = () => {
  localStorage.removeItem("isLoggedIn"); // Hapus status login
  router.push("/login"); // Kembali ke halaman login
};

onMounted(() => {
   isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
  console.log("Status Login:", isLoggedIn.value);   
});

export default {
  components: {
    Sidebar,
    Navbar
  }
};
</script>