<template>
  <div class="payroll-history">
    <button
      @click="$emit('goBack')"
      class="mb-4 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 font-semibold rounded-xl shadow"
      >
    </button>
    <h1>Riwayat Payroll</h1>

    <div class="filters">
      <label for="periode">Periode:</label>
      <select id="periode" v-model="selectedPeriod" @change="filterPayrolls">
        <option value="">Semua</option>
        <option v-for="period in periods" :key="period.name" :value="period.name">
          {{ period.name }}
        </option>
      </select>
    </div>

    <div v-if="filteredPayrolls.length">
      <table>
        <thead>
          <tr>
            <th>Periode</th>
            <th>Total Payroll</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payroll in filteredPayrolls" :key="payroll.name">
            <td>{{ payroll.period }}</td>
            <td>{{ formattedCurrency(payroll.total_amount) }}</td>
            <td :class="statusClass(payroll.status)">{{ payroll.status }}</td>
            <td>
              <button @click="viewPayrollDetails(payroll)">Lihat Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Tidak ada riwayat payroll untuk periode ini.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedPeriod = ref("")
const filteredPayrolls = ref([])
const periods = ref([])
const selectedPayroll = ref(null)

const goBack = () => {
  emit('change-view', null) // Memanggil event untuk kembali ke Payroll.vue
}

const formattedCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(amount);
}
</script>

<style scoped>
.payroll-history {
  max-width: 800px;
  margin: auto;
  font-family: sans-serif;
  position: relative;
}
.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #4CAF50;
}
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
table, th, td {
  border: 1px solid #ccc;
}
th, td {
  padding: 8px;
  text-align: left;
}
.status-posted {
  color: green;
  font-weight: bold;
}
.status-draft {
  color: orange;
  font-weight: bold;
}
.status-cancelled {
  color: red;
  font-weight: bold;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>