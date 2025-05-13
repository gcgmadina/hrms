<template>
  <div class="payroll-page p-4 grid grid-cols-12 gap-4">
    <!-- Sidebar -->
    <div class="col-span-3 space-y-2">
      <div class="bg-white rounded-2xl p-4 shadow">
        <div class="font-semibold">Periode:</div>
        <div class="flex justify-between items-center mt-2">
          <div>{{ selectedPeriod }}</div>
          <button @click="openPeriodModal" class="text-green-600 font-bold">＋</button>
        </div>
      </div>

      <button v-for="item in menu" :key="item.label"
              class="w-full text-left bg-green-100 hover:bg-green-200 px-4 py-2 rounded-xl"
              @click="currentView = item.component">
        {{ item.label }}
      </button>

      <div class="font-semibold mt-4">Pajak Penghasilan</div>
      <button class="w-full text-left bg-green-100 hover:bg-green-200 px-4 py-2 rounded-xl"
              @click="currentView = 'TaxLayer'">
        Lapisan Pajak Penghasilan
      </button>
      <button class="w-full text-left bg-green-100 hover:bg-green-200 px-4 py-2 rounded-xl"
              @click="currentView = 'NonTaxableIncome'">
        Penghasilan Tidak Kena Pajak
      </button>
    </div>

    <!-- Main Content -->
    <div class="col-span-9 space-y-4">
      <div class="bg-white p-4 rounded-2xl shadow">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Ringkasan - Gaji Keluar</h2>
          <select v-model="summaryFilter" class="border p-1 rounded">
            <option>Tahun</option>
            <option>Bulan</option>
          </select>
        </div>
        <!-- Placeholder chart -->
        <div class="h-40 bg-gray-100 mt-4 rounded-xl flex items-center justify-center text-gray-500">
          [ Chart Placeholder ]
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl shadow">
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

// Dummy data
const selectedPeriod = ref('Maret 2025 - April 2025')
const summaryFilter = ref('Tahun')
const currentView = ref(null)

const menu = [
  { label: 'Riwayat Periode', component: 'PeriodHistory' },
  { label: 'Komponen Gaji', component: 'SalaryComponent' },
  { label: 'Struktur Gaji', component: 'SalaryStructure' },
  { label: 'Riwayat Slip Gaji', component: 'SalarySlipHistory' },
  { label: 'Incentives', component: 'SalaryComponent' } // dipakai komponen yg sama
]

const salarySummary = ref([
  { name: 'Shujin', role: 'Sales Manager', salary: 4850000, tax: 0 },
  { name: 'Jumlah', role: 'Accountant', salary: 4525000, tax: 0 },
  { name: 'Siti Aulia Wulandari', role: 'Admin', salary: 4325000, tax: 0 }
])

const formatNumber = (val) => {
  return val.toLocaleString('id-ID')
}

const openPeriodModal = () => {
  alert('Modal untuk tambah periode belum dibuat!')
}
</script>

<style scoped>
.payroll-page {
  background-color: #f9f9f9;
  min-height: 100vh;
}
</style>
