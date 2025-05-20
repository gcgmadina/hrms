<template>
  <Layout v-if="isLoggedIn && $route.path !== '/form'">
    <router-view />
  </Layout>
  <router-view v-else />
</template>

<script setup>
import { ref, onMounted ,onUpdated } from "vue";
import Layout from "./components/Layout.vue";

import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // ganti dengan tema lain kalau mau

const highlightAll = () => {
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el)
  })
}

const isLoggedIn = ref(false);

onMounted(() => {
  const status = localStorage.getItem("isLoggedIn");
  console.log("LocalStorage Status:", status); // Debugging

  isLoggedIn.value = status === "true";
  console.log("Status Login di App.vue:", isLoggedIn.value); // Debugging lagi

  highlightAll
});
onUpdated(highlightAll) // kalau pakai router, ini penting biar halaman baru tetap ke-highlight
</script>