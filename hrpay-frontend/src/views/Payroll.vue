<template>
  <div class="payroll-page p-4 grid grid-cols-12 gap-4">
    <!-- Sidebar -->
    <div class="col-span-3 space-y-4">
      <div class="flat-card p-4">
        <div class="font-semibold">Periode:</div>
        <div class="flex justify-between items-center mt-2">
          <div>{{ selectedPeriod }}</div>
          <button @click="openPeriodModal" class="flat-btn">＋</button>
        </div>
      </div>

      <button v-for="item in menu" :key="item.label"
              class="flat-btn w-full text-left px-4 py-2 rounded-md"
              @click="currentView = item.component">
        {{ item.label }}
      </button>

      <div class="font-semibold mt-4">Pajak Penghasilan</div>
      <button class="flat-btn w-full text-left px-4 py-2 rounded-md"
              @click="currentView = 'TaxLayer'">
        Lapisan Pajak Penghasilan
      </button>
      <button class="flat-btn w-full text-left px-4 py-2 rounded-md"
              @click="currentView = 'NonTaxableIncome'">
        Penghasilan Tidak Kena Pajak
      </button>
    </div>

    <!-- Main Content -->
    <div class="col-span-9 space-y-4">
      <div class="flat-card p-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Ringkasan - Gaji Keluar</h2>
        </div>
        <LineChart :chart-data="chartData" />
      </div>

      <div class="flat-card p-4">
        <h2 class="text-xl font-semibold mb-2">Rangkuman - Gaji Karyawan</h2>
        <table class="w-full">
          <thead>
            <tr class="text-left">
              <th class="py-2">Nama Karyawan</th>
              <th class="py-2">Gaji Bersih</th>
              <th class="py-2">Pajak</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in salarySummary" :key="employee.name">
              <td class="py-2">
                <div class="font-medium">{{ employee.name }}</div>
                <div class="text-sm text-gray-500">{{ employee.role }}</div>
              </td>
              <td class="py-2 font-semibold">Rp {{ formatNumber(employee.salary) }}</td>
              <td class="py-2 text-red-600">- Rp {{ formatNumber(employee.tax) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Sub-Component Loader -->
      <component :is="currentView" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LineChart from '../components/LineChart.vue'

const selectedPeriod = ref('Maret 2025 - April 2025')
const currentView = ref(null)

const menu = [
  { label: 'Riwayat Periode', component: 'PayPeriode' },
  { label: 'Komponen Gaji', component: 'SalaryComponent' },
  { label: 'Struktur Gaji', component: 'SalaryStructure' },
  { label: 'Riwayat Slip Gaji', component: 'SalarySlip' },
  { label: 'Incentives', component: 'SalaryComponent' }
]

const salarySummary = ref([
  { name: 'Shujin', role: 'Sales Manager', salary: 4850000, tax: 0 },
  { name: 'Jumlah', role: 'Accountant', salary: 4525000, tax: 0 },
  { name: 'Siti Aulia Wulandari', role: 'Admin', salary: 4325000, tax: 0 }
])

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Gaji Keluar',
      data: [4500000, 4700000, 4900000, 5100000, 5300000],
      borderColor: '#007bff',
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      tension: 0.4
    }
  ]
})

const formatNumber = (val) => {
  return val.toLocaleString('id-ID')
}

const openPeriodModal = () => {
  alert('Modal untuk tambah periode belum dibuat!')
}
</script>

<style scoped>
.payroll-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.flat-card {
  background: white;
  border-radius: 5px;
  padding: 16px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.flat-btn {
  background: #007bff;
  border-radius: 5px;
  padding: 10px 15px;
  color: white;
  font-weight: bold;
  transition: 0.3s ease-in-out;
}

.flat-btn:hover {
  background: #0056b3;
}
</style>