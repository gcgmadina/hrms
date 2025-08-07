<template>
  <div class="container">
    <h2>Riwayat Slip Gaji Karyawan</h2>

    <label>Periode Penggajian</label>
    <input type="month" v-model="selectedPeriod" />

    <label style="margin-top: 10px;">Cari Nama Karyawan</label>
    <input type="text" v-model="searchName" placeholder="Contoh: Budi" />

    <div class="salary-item" v-for="item in filteredList" :key="item.id">
      <div>
        <span>👤 {{ item.employee }}</span><br />
        <span>📆 {{ item.period }}</span>
      </div>
      <button @click="viewSlip(item)">👁️</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedPeriod = ref("")
const searchName = ref("")

const salaryList = ref([
  { id: "SAL-101", employee: "Budi Santoso", period: "Oktober - 2024" },
  { id: "SAL-102", employee: "Dewi Lestari", period: "November - 2024" },
  { id: "SAL-103", employee: "Agus Wijaya", period: "Desember - 2024" },
  { id: "SAL-104", employee: "Budi Santoso", period: "November - 2024" },
])

const filteredList = computed(() => {
  return salaryList.value.filter(item => {
    const nameMatch = item.employee.toLowerCase().includes(searchName.value.toLowerCase())
    if (!selectedPeriod.value) return nameMatch
    const [year, month] = selectedPeriod.value.split('-')
    const bulanNama = [
      'Januari','Februari','Maret','April','Mei','Juni',
      'Juli','Agustus','September','Oktober','November','Desember'
    ][parseInt(month)-1]
    return nameMatch && item.period === `${bulanNama} - ${year}`
  })
})

function viewSlip(item) {
  router.push({ name: 'SalarySlipDetail', params: { id: item.id } })
}
</script>

<style scoped>
.container { padding: 16px; background: #f5f5f5; min-height: 100vh; }
.salary-item {
  display: flex; justify-content: space-between;
  padding: 12px; background: #fff; margin-top: 10px; border-radius: 8px;
}
</style>
