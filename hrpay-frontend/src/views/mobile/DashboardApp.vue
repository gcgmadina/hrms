<template>
  <div class="app-container">
    <AppHeader />

    <!-- Statistik Kehadiran dan Overview -->
    <div class="overview-cards">
      <div class="card blue">Total Karyawan<br /><strong>{{ stats.total }}</strong></div>
      <div class="card green">Hadir Hari Ini<br /><strong>{{ stats.hadir }}</strong></div>
      <div class="card yellow">Cuti<br /><strong>{{ stats.cuti }}</strong></div>
      <div class="card red">Tidak Hadir<br /><strong>{{ stats.absen }}</strong></div>
    </div>

    <!-- Chart -->

    <!-- Pengajuan Izin -->
    <div class="box">
      <h3>Pengajuan Izin</h3>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Cari nama / alasan / status"
        @input="handleSearch"
        class="search-input"
      />
      <table class="izin-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Alasan</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in izinList" :key="item.name">
            <td>{{ item.employee_name }}</td>
            <td>{{ item.reason }}</td>
            <td><span :class="item.status.toLowerCase()">{{ item.status }}</span></td>
            <td><i class="icon detail-icon" @click="viewDetail(item)">🔍</i></td>
          </tr>
        </tbody>
      </table>
    </div>

  <footer class="bottom-tabs">
    <router-link to="/home" class="tab-item" :class="{ active: isActive('/home') }">
      <div class="icon">🏠</div>
      <span>Home</span>
    </router-link>
    <router-link to="/leave-request" class="tab-item" :class="{ active: isActive('/leave-request') }">
      <div class="icon">📚</div>
      <span>Leave Request</span>
    </router-link>
  </footer>

    <!-- <BottomTabs /> -->
  </div>
</template>

<script setup>
import AppHeader from '@/components/mobile/dashboard/layout/Header.vue'
// import BottomTabs from '@/components/mobile/dashboard/layout/BottomTab.vue'
import AttendanceChart from '@/components/AttendanceChart.vue'
import { ref, onMounted } from 'vue'
import { createResource } from 'frappe-ui'
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path) => route.path === path


// Data & state
const izinList = ref([])
const allData = ref([]) // Simpan data asli untuk reset filter
const stats = ref({ total: 0, hadir: 0, cuti: 0, absen: 0 })
const searchQuery = ref("")

// Fetch data
const izinResource = createResource({
  url: 'hrpay.api.employee.get_employee_data',
  method: 'GET',
  auto: true,
  transform(data) {
    izinList.value = data.izin || []
    allData.value = data.izin || []
    stats.value = {
      total: data.total || 0,
      hadir: data.hadir || 0,
      cuti: data.cuti || 0,
      absen: data.absen || 0
    }
  }
})

const handleSearch = () => {
  const query = searchQuery.value.toLowerCase()
  izinList.value = allData.value.filter(i =>
    i.employee_name.toLowerCase().includes(query) ||
    i.reason.toLowerCase().includes(query) ||
    i.status.toLowerCase().includes(query)
  )
}

const viewDetail = (item) => {
  console.log("Detail:", item)
}

onMounted(() => {
  izinResource.fetch()
})
</script>

<style scoped>
.app-container {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f7f7f7;
  padding-bottom: 60px;
}

.overview-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  justify-content: space-around;
}

.card {
  flex: 1 1 40%;
  padding: 15px;
  border-radius: 8px;
  color: white;
  text-align: center;
  font-size: 1em;
  min-width: 140px;
}

.card.blue { background: #007BFF; }
.card.green { background: #28A745; }
.card.yellow { background: #FFC107; color: black; }
.card.red { background: #DC3545; }

.box {
  margin: 20px 10px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.izin-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.izin-table th,
.izin-table td {
  padding: 8px;
  font-size: 0.9em;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.izin-table span {
  font-weight: bold;
  text-transform: capitalize;
}

.izin-table .disetujui { color: green; }
.izin-table .menunggu { color: orange; }
.izin-table .ditolak { color: red; }

.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  font-size: 0.9em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.bottom-tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.tab-item {
  flex: 1;
  text-align: center;
  color: #888;
  font-size: 12px;
  transition: color 0.2s ease;
}

.tab-item.active {
  color: #007bff;
  font-weight: bold;
}

.icon {
  font-size: 18px;
  margin-bottom: 2px;
}
</style>
