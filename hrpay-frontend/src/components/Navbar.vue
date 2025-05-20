<template>
  <header class="navbar">
    <input type="text" placeholder="Cari..." v-model="searchQuery" @input="handleSearch" />
  </header>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");

const handleSearch = () => {
  console.log("Pencarian:", searchQuery.value);
  // Tambahkan logika pencarian di sini
};
</script>

<style scoped>
.navbar {
  background: #dfdfdf;
  padding: 15px;
  display: flex;
  justify-content: right;
}
.navbar input {
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: none;
}
</style>