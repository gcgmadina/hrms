<template>
  <div class="container">
    <h2>Riwayat Slip Gaji</h2>

    <label>Periode Penggajian</label>
    <input type="month" v-model="selectedPeriod" />

    <div class="salary-item" v-for="item in filteredList" :key="item.id">
      <span>💰 {{ item.period }}</span>
      <button @click="viewSlip(item)">👁️</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedPeriod = ref("")
const salaryList = ref([
  { id: "SAL-001", period: "Oktober - 2024" },
  { id: "SAL-002", period: "November - 2024" },
  { id: "SAL-003", period: "Desember - 2024" }
])

const filteredList = computed(() => {
  if (!selectedPeriod.value) return salaryList.value
  const [year, month] = selectedPeriod.value.split('-')
  const bulanNama = [
    'Januari','Februari','Maret','April','Mei','Juni',
    'Juli','Agustus','September','Oktober','November','Desember'
  ][parseInt(month)-1]
  return salaryList.value.filter(s => s.period === `${bulanNama} - ${year}`)
})

function viewSlip(item) {
  router.push({ name: 'PayrollDetailEmployee', params: { id: item.id } })
}
</script>

<style scoped>
.container { padding: 16px; background: #f5f5f5; min-height: 100vh; }
.salary-item {
  display: flex; justify-content: space-between;
  padding: 12px; background: #fff; margin-top: 10px; border-radius: 8px;
}
</style>
