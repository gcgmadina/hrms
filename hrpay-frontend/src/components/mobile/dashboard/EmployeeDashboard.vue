<template>
  <div class="mobile-container">
    <!-- Header -->
    <div class="mobile-header">
      <img src="@/assets/heart.png" alt="Logo" class="logo" />
      <div class="info">
        <h2>Hai, {{ employee.name }}!</h2>
        <p>{{ employee.designation }} - {{ employee.department }}</p>
      </div>
      <button @click="showProfile" class="profile-btn">{{ initials }}</button>
    </div>

    <!-- Last check-in -->
    <p class="text-sm text-gray-600 mb-3" v-if="lastCheckIn">
      Last check in: {{ lastCheckIn }}
    </p>

    <!-- Check-in buttons -->
    <div class="btn-group">
      <button @click="goToAttendance" class="btn">Check In/Out</button>
      <button @click="showWFHRequest" class="btn">Check In/Out (WFH)</button>
    </div>

    <!-- Holiday Section -->
    <div class="section">
      <h3>Hari Libur Mendatang</h3>
      <ul>
        <li v-for="(holiday, index) in holidays" :key="index">
          <span>Libur {{ index + 1 }}</span>
          <span>{{ holiday }}</span>
        </li>
      </ul>
    </div>

    <!-- Quick Links -->
    <div class="section">
      <h3>Quick Links</h3>
      <ul>
        <li @click="goToLeaveForm"><i class="icon-calendar" /> Ajukan Cuti dan Izin</li>
        <li @click="goToPayroll"><i class="icon-money" /> Slip Gaji</li>
      </ul>
    </div>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <button @click="goToDashboard"><i class="icon-home" /><div>Home</div></button>
      <button @click="goToLeaveHistory"><i class="icon-calendar" /><div>Izin & Cuti</div></button>
      <button @click="goToPayroll"><i class="icon-money" /><div>Gaji</div></button>
    </nav>

    <!-- WFH Popup -->
    <AttendanceReqApp v-if="showWFHPopup" :employee="employee" @close="showWFHPopup = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AttendanceReqApp from '@/components/AttendanceReqApp.vue'

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
  router.push('/payroll-history')
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
.mobile-container {
  max-width: 480px;
  margin: auto;
  padding: 16px;
  font-family: sans-serif;
  background: #f9f9f9;
  min-height: 100vh;
}

.mobile-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.logo {
  width: 48px;
  height: 48px;
  margin-right: 12px;
}

.info h2 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.info p {
  font-size: 12px;
  color: #555;
}

.profile-btn {
  margin-left: auto;
  background-color: #ccc;
  border: none;
  border-radius: 50%;
  padding: 10px;
  font-weight: bold;
}

.btn-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.btn {
  background-color: #e2e8f0;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-weight: bold;
}

.section {
  margin-bottom: 24px;
}

.section h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.section li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  border-bottom: 1px solid #e2e2e2;
  cursor: pointer;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f0f0f0;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  font-size: 12px;
}

.bottom-nav button {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
}

.icon-calendar::before {
  content: "📅";
  font-size: 20px;
}
.icon-money::before {
  content: "💰";
  font-size: 20px;
}
.icon-home::before {
  content: "🏠";
  font-size: 20px;
}
</style>
