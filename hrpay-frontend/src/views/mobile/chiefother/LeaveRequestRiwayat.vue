<template>
  <div class="app-container">
    <AppHeader />

    <!-- Statistik -->


    <!-- Table Pengajuan -->
    <div class="box">


      
      <h3>Data Pengajuan Cuti</h3>
      <input
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Cari nama / alasan / status"
        class="search-input"
        type="text"
      />
      <table class="izin-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Jenis Cuti</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredList" :key="item.name">
            <td>{{ item.employee_name }}</td>
            <td>{{ item.leave_type }}</td>
            <td>{{ item.from_date }} s/d {{ item.to_date }}</td>
            <td>
              <span :class="getStatusClass(item.docstatus)">
                {{ getStatusText(item.docstatus) }}
              </span>
            </td>
            <td>
              <router-link :to="`/mobile/chief-other/leave-request/detaiil/${item.name}`" class="detail-link">
                Lihat
              </router-link>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <!-- Bottom Tabs -->
    <footer class="bottom-tabs">
      <router-link
        to="/mobile/chief-other/dashboard"
        class="tab-item"
        :class="{ active: isActive('/mobile/chief-other/dashboard') }"
      >
        <div class="icon">🏠</div>
        <span>Home</span>
      </router-link>
      <router-link
        to="/mobile/chief-other/leave-request"
        class="tab-item"
        :class="{ active: isActive('/mobile/chief-other/leave-request') }"
      >
        <div class="icon">📚</div>
        <span>Leave Request</span>
      </router-link>
    </footer>
  </div>
</template>

<script setup>


import AppHeader from '@/components/mobile/dashboard/layout/Header.vue'
import { ref, onMounted, computed } from 'vue'
import { createResource } from 'frappe-ui'
import { useRoute } from 'vue-router'

const leaveList = ref([])
const allData = ref([])
const searchQuery = ref('')
const route = useRoute()

const isActive = (path) => route.path === path

const getStatusText = (docstatus) => {
  if (docstatus === 0) return 'Proses'
  if (docstatus === 1) return 'Disetujui'
  if (docstatus === 2) return 'Ditolak'
  return 'Tidak Diketahui'
}

const getStatusClass = (docstatus) => {
  if (docstatus === 0) return 'menunggu'
  if (docstatus === 1) return 'disetujui'
  if (docstatus === 2) return 'ditolak'
  return ''
}


// Filter Search
const handleSearch = () => {
  const query = searchQuery.value.toLowerCase()
  leaveList.value = allData.value.filter(item =>
    item.employee_name?.toLowerCase().includes(query) ||
    item.leave_type?.toLowerCase().includes(query) ||
    item.status?.toLowerCase().includes(query)
  )
}

const filteredList = computed(() => leaveList.value)

// Count status
const approvedCount = computed(() =>
  allData.value.filter(i => i.status === 'Disetujui').length
)
const pendingCount = computed(() =>
  allData.value.filter(i => i.status === 'Menunggu').length
)
const rejectedCount = computed(() =>
  allData.value.filter(i => i.status === 'Ditolak').length
)

onMounted(async () => {
  // leaveRequestResource.fetch()

  try {
    const res = await fetch('http://localhost:8000/api/method/hrpay.api.leavereq.get_leave_requests', {
      method: 'GET',
      credentials: 'include', // penting agar kirim cookie SID
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Error ${res.status}: ${text}`)
    }

    const data = await res.json()

    leaveList.value = data.message || []
    allData.value = data.message || []

  } catch (error) {
    console.error('Gagal ambil data cuti:', error)
    alert('Gagal mengambil data. Silakan cek koneksi atau izin user.')
  }
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
  text-decoration: none;
}
.tab-item.active {
  color: #007bff;
  font-weight: bold;
}
.icon {
  font-size: 18px;
  margin-bottom: 2px;
}
.detail-button {
  padding: 5px 10px;
  font-size: 0.8em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.detail-button:hover {
  background-color: #0056b3;
}

</style>
