<template>
  <header class="app-header">
    <img class="avatar" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" />
  
    <div class="notification">🔔</div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentTime = ref('')
const currentDate = new Date().toLocaleDateString('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString()
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.header-info {
  flex-grow: 1;
  text-align: center;
}
.date {
  font-size: 12px;
  color: gray;
}
.time {
  font-size: 14px;
  font-weight: bold;
}
.notification {
  font-size: 18px;
  color: #555;
}
</style>
