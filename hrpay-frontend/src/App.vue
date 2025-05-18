<template>
  <Layout v-if="isLoggedIn && $route.path !== '/form'">
    <router-view />
  </Layout>
  <router-view v-else />
</template>

<script setup>
import { ref, onMounted } from "vue";
import Layout from "./components/Layout.vue";

const isLoggedIn = ref(false);

onMounted(() => {
  const status = localStorage.getItem("isLoggedIn");
  console.log("LocalStorage Status:", status); // Debugging

  isLoggedIn.value = status === "true";
  console.log("Status Login di App.vue:", isLoggedIn.value); // Debugging lagi
});
</script>