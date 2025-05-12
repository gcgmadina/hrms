<template>
  <header class="navbar">
    <input type="text" placeholder="Cari..." class="search-input" />
  </header>
</template>

<style scoped>
.navbar {
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.search-input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
