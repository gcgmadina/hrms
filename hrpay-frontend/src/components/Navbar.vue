<template>
  <header class="navbar">
    
    <button @click="logoutInsideIframe">Logout</button>
  </header>
    
</template>

<script setup>

function logoutInsideIframe() {
  localStorage.clear();
  window.location.href = 'http://localhost:8080';
}
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