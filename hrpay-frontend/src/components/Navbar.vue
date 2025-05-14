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
  background: #34495e;
  padding: 10px;
  display: flex;
  justify-content: center;
}
.navbar input {
  width: 300px;
  padding: 8px;
  border-radius: 5px;
  border: none;
}
</style>