<template>
  <div class="dashboard">
    <div class="main">
      <!-- Statistik Kehadiran dan Overview -->
      <div class="overview-cards">
        <div class="card blue">Total Karyawan<br /><strong>{{ stats.total }}</strong></div>
        <div class="card green">Hadir Hari Ini<br /><strong>{{ stats.hadir }}</strong></div>
        <div class="card yellow">Cuti<br /><strong>{{ stats.cuti }}</strong></div>
        <div class="card red">Tidak Hadir<br /><strong>{{ stats.absen }}</strong></div>
      </div>

      <!-- Chart -->
      <AttendanceChart />

      <!-- Pengajuan Izin -->
      <div class="box">
        <h3>Pengajuan Izin</h3>
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
              <td><i class="icon detail-icon" @click="viewDetail(item)"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue'
import AttendanceChart from '../components/AttendanceChart.vue'
import { createResource } from 'frappe-ui'

export default {
  components: {
    AttendanceChart
  },
  setup() {
    const izinList = ref([])
    const stats = ref({ total: 0, hadir: 0, cuti: 0, absen: 0 })
    const searchQuery = ref("")

    const izinResource = createResource({
      url: 'hrpay.api.employee.get_employee_data',
      method: 'GET',
      auto: true,
      transform(data) {
        izinList.value = data.izin || []
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
      izinList.value = izinList.value.filter(i =>
        i.employee_name.toLowerCase().includes(query) ||
        i.reason.toLowerCase().includes(query) ||
        i.status.toLowerCase().includes(query)
      )
    }

    const viewDetail = (item) => {
      // Bisa diarahkan ke detail page atau modal
      console.log("Detail:", item)
    }

    onMounted(() => {
      izinResource.fetch()
    })

    return {
      izinList,
      stats,
      searchQuery,
      handleSearch,
      viewDetail
    }
  }
}
</script>
