<template>
  <section class="menu">
    <div class="menu-item">
      <div class="icon">🏢</div>
      <div>Supplier</div>
    </div>
    <div class="menu-item">
      <div class="icon">📦</div>
      <div>Unit Of Material</div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.menu {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 20px;
}
.menu-item {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 120px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: 0.2s;
}
.menu-item:hover {
  transform: scale(1.05);
}
.icon {
  font-size: 28px;
  margin-bottom: 8px;
}
</style>
