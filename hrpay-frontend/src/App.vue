<template>
    <router-view /> <!-- Tempat halaman utama -->
</template>

<script setup>
import { ref, onMounted, onUpdated } from "vue";
import * as hljs from "highlight.js";
import "highlight.js/styles/github.css";

// import Layout from "./components/Layout.vue"; // Memastikan path benar

const highlightAll = () => {
  document.querySelectorAll("pre code").forEach((el) => {
    hljs.highlightElement(el);
  });
};

const isLoggedIn = ref(false);

onMounted(() => {
  const status = localStorage.getItem("isLoggedIn");
  console.log("LocalStorage Status:", status); // Debugging

  isLoggedIn.value = status === "true";
  console.log("Status Login di App.vue:", isLoggedIn.value); // Debugging lagi

  highlightAll();
});

onUpdated(highlightAll);
</script>