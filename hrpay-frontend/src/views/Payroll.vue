<template>
  <div class="grid grid-cols-12 gap-4">
    <!-- Sidebar -->
    <div class="col-span-3">
      <div class="pay-periode-card">
        <div class="date-range">{{ selectedPeriod }}</div>
        <button @click="showForm = !showForm" class="add-button">
          {{ showForm ? "×" : "+" }}
        </button>
        <PayPeriodeForm v-if="showForm" @close="showForm = false" />

        <div class="mt-4 space-y-2">
          <button class="flat-btn w-full text-left px-4 py-2 rounded-md" @click="changeView('PayPeriode')">
            Riwayat Periode
          </button>
          <button class="flat-btn w-full text-left px-4 py-2 rounded-md" @click="changeView('PayrollHist')">
            Riwayat Payroll
          </button>
          <button class="flat-btn w-full text-left px-4 py-2 rounded-md" @click="changeView('SalaryComponent')">
            Komponen Gaji
          </button>
          <button class="flat-btn w-full text-left px-4 py-2 rounded-md" @click="changeView('SalaryStructure')">
            Struktur Gaji
          </button>
          <button class="flat-btn w-full text-left px-4 py-2 rounded-md" @click="changeView('SalarySlip')">
            Riwayat Slip Gaji
          </button>
          <hr class="my-4 border-gray-300" />
          <div class="font-semibold mt-4">Pajak Penghasilan</div>
          <button class="flat-btn w-full text-left px-4 py-2 rounded-md" @click="changeView('Pph21')">
            PPH 21
          </button>
        </div>
      </div>
    </div>

    <!-- Konten Utama -->
    <div class="col-span-9 space-y-4">
      <component :is="menu[currentView]" v-if="menu[currentView]" @change-view="currentView = null" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PayPeriodeForm from '@/components/payroll/PayPeriodeForm.vue'
import PayPeriode from '../components/payroll/PayPeriode.vue'
import PayrollHist from '@/components/payroll/PayrollHist.vue'
import SalaryComponent from '@/components/payroll/SalaryComponent.vue'
import SalaryStructure from '@/components/payroll/SalaryStructure.vue'
import SalarySlip from '@/components/payroll/SalarySlip.vue'
import Pph21 from '@/components/pph21/Pph21.vue'

const showForm = ref(false)
const selectedPeriod = ref('Maret 2025 - April 2025')
const currentView = ref(null)

const menu = {
  PayPeriode,
  PayrollHist,
  SalaryComponent,
  SalaryStructure,
  SalarySlip,
  Pph21
}

// Fungsi untuk mengubah tampilan
const changeView = (view) => {
  currentView.value = view
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 5px;
}

.flat-card {
  background-color: white;
  width: 100%;
  max-width: 1000px; /* Supaya tampil lebih lebar */
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.pay-periode-card {
  background-color: #f9f9f9;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  width: 350px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.date-range {
  margin-bottom: 16px;
  font-weight: 500;
  color: #333;
}

.add-button {
  background-color: #007bff; /* Tombol tambah selalu biru */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-button:hover {
  background-color: #0056b3; /* Warna biru lebih gelap saat hover */
}
</style>