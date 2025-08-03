<template>
  <div class="leave-container">
    <h2 class="title">Riwayat Cuti dan Izin</h2>

    <div class="leave-list">
      <div class="leave-item" v-for="(item, index) in historyLeave" :key="index">
        <i class="icon-calendar">📅</i>
        <span class="leave-label">Libur {{ index + 1 }}</span>
        <span class="leave-date">DD/MM/YYYY</span>
        <i class="icon-info">ℹ️</i>
      </div>
    </div>

    <button class="apply-btn">Ajukan Cuti</button>
    <p class="sisa-cuti">Sisa Cuti: 8 hari</p>

    <div class="upcoming-section">
      <h3 class="subtitle">Hari Libur Mendatang</h3>
      <div class="leave-item" v-for="(item, index) in upcomingLeave" :key="'upcoming-' + index">
        <i class="icon-calendar">📅</i>
        <span class="leave-label">Libur {{ index + 1 }}</span>
        <span class="leave-date">DD/MM/YYYY</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const historyLeave = Array(3).fill({})
const upcomingLeave = Array(3).fill({})
</script>

<style scoped>
.leave-container {
  background-color: #e5e5e5;
  padding: 16px;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
}

.leave-list,
.upcoming-section {
  border-top: 1px solid #888;
  margin-top: 12px;
  padding-top: 8px;
}

.leave-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #aaa;
  padding: 8px 0;
}

.icon-calendar,
.icon-info {
  font-size: 18px;
}

.leave-label {
  flex: 1;
  margin-left: 8px;
}

.leave-date {
  margin-right: 8px;
}

.apply-btn {
  width: 100%;
  padding: 12px;
  margin: 16px 0 8px;
  background-color: #d4d4d4;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
}

.sisa-cuti {
  text-align: center;
  font-style: italic;
}

.subtitle {
  font-weight: bold;
  margin: 16px 0 8px;
}
</style>
