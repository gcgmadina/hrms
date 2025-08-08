<template>
  <div class="dashboard-container">
    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <div class="logo">LOGO</div>
        <div class="user-info">
          <p class="greeting">Hai, Karyawan!</p>
          <p class="role">HR - Contract</p>
        </div>
      </div>
      <div class="header-right">
        <span class="icon">🔔</span>
        <div class="avatar">K</div>
      </div>
    </div>

    <!-- Date -->
    <p class="date">Today: Rabu, 15 Januari 2025</p>

    <!-- Main Buttons -->
    <div class="main-buttons">
      <div class="main-button">Daftar Karyawan yang Hadir</div>
      <div class="main-button">Daftar Pengajuan Cuti dan Izin</div>
    </div>

    <!-- Upcoming Holidays -->
    <div class="section">
      <p class="section-title">Hari Libur Mendatang</p>
      <ul class="list">
        <li>📅 Libur 1 - 17/08/2025</li>
        <li>📅 Libur 2 - 20/08/2025</li>
        <li>📅 Libur 3 - 01/09/2025</li>
      </ul>
    </div>

    <!-- Quick Links -->
    <div class="section">
      <p class="section-title">Quick Links</p>
      <ul class="list">
        <li>📆 Pengajuan Cuti dan Izin</li>
        <li>💵 Slip Gaji</li>
        <li>📄 Pengajuan Lain</li>
      </ul>
    </div>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <div class="nav-item">🏠 Home</div>
      <div class="nav-item">📆 Izin & Cuti</div>
      <div class="nav-item">📄 Pengajuan</div>
      <div class="nav-item">💵 Gaji</div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AttendanceReqApp from '@/components/mobile/AttendanceReqApp.vue'

const router = useRouter()

const employee = ref({
  name: 'Karyawan',
  designation: 'Software Developer - Intern',
  department: 'Technology'
})

const lastCheckIn = ref('Rabu, 15 Januari 2025')
const holidays = ref(['10 Juni 2025', '17 Juni 2025', '20 Juni 2025'])
const showWFHPopup = ref(false)
const initials = employee.value.name.charAt(0)

function goToAttendance() {
  router.push('/attendance-mobile')
}
function showWFHRequest() {
  showWFHPopup.value = true
}
function goToLeaveForm() {
  router.push('/leave-request-form')
}
function goToPayroll() {
  router.push('/mobile/employee/payroll-history')
}
function goToDashboard() {
  router.push('/employee-dashboard')
}
function goToLeaveHistory() {
  router.push('/leave-history')
}
function showProfile() {
  // Future feature
}
</script>

<style scoped>
.dashboard-container {
  padding: 16px;
  background: #f7f7f7;
  min-height: 100vh;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  background: #ccc;
  border-radius: 8px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.user-info .greeting {
  font-weight: bold;
  margin: 0;
}

.user-info .role {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ccc;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.date {
  font-size: 13px;
  color: #555;
  margin-bottom: 16px;
}

.main-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.main-button {
  background: #d9d9d9;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
}

.section {
  margin-bottom: 24px;
}

.section-title {
  font-weight: bold;
  margin-bottom: 8px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
}

.list {
  list-style: none;
  padding: 0;
  font-size: 13px;
}

.list li {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
}
</style>
