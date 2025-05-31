<template>
  <footer class="bottom-tabs">
    <div class="tab-item active">
      <div class="icon">🏠</div>
      <span>Home</span>
    </div>
    <div class="tab-item">
      <div class="icon">📚</div>
      <span>Bahan Baku</span>
    </div>
    <div class="tab-item">
      <div class="icon">📦</div>
      <span>Stock Bahan Baku</span>
    </div>
  </footer>
</template>

<script setup>
// No logic for now
</script>

<style scoped>
.bottom-tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.tab-item {
  flex: 1;
  text-align: center;
  color: #888;
  font-size: 12px;
  transition: color 0.2s ease;
}

.tab-item.active {
  color: #007bff;
  font-weight: bold;
}

.icon {
  font-size: 18px;
  margin-bottom: 2px;
}
</style>
