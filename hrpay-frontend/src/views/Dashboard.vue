<template>
  <AttendanceChart />
  <i data-feather="calendar"></i>

  <div class="dashboard">
    <Sidebar />
    <div class="main">
      <Navbar />
      <div class="content">
        
        <div class="cards">
          <div class="card blue">Total Karyawan<br /><strong>2</strong></div>
          <div class="card green">Hadir Hari Ini<br /><strong>25</strong></div>
          <div class="card yellow">Cuti<br /><strong>3</strong></div>
          <div class="card red">Tidak Hadir<br /><strong>6</strong></div>
        </div>

     
        <div class="bottom-section">
          <div class="box">Statistik Kehadiran</div>
           
          <div class="box">
            <h3>Pengajuan Izin</h3>
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Alasan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Affiah</td>
                  <td>Sakit</td>
                  <td><span class="pending">Pending</span></td>
                </tr>
                <tr>
                  <td>Rizky</td>
                  <td>Cuti Tahunan</td>
                  <td><span class="approved">Approved</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { onMounted } from 'vue'

import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import AttendanceChart from '../components/AttendanceChart.vue'
import { ref, onMounted } from 'vue'
import { createResource } from 'frappe-ui'
import * as hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import * as showdown from 'showdown';

// Register language
hljs.registerLanguage('javascript', javascript)
import feather from 'feather-icons';

const pendingLeaves = ref([])

const pendingLeaveResource = createResource({
  url: 'hrpay.api.leave.get_leave_request',
  method: 'GET',
  params: {
    status: 'Pending' // kalau API mendukung filter seperti ini
  },
  auto: true,
  transform(data) {
    pendingLeaves.value = data
  }
})

onMounted(() => {
  pendingLeaveResource.fetch(),
  feather.replace()
})

export default {
  components: {
    Sidebar,
    Navbar,
    AttendanceChart
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.content {
  padding: 20px;
  background: #f7f9fb;
  min-height: 100vh;
}
.cards {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}
.card {
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
.blue { background: #a3c8ff; }
.green { background: #b9fbc0; }
.yellow { background: #fef9b9; color: #333; }
.red { background: #ffc9c9; color: #333; }

.bottom-section {
  display: flex;
  gap: 20px;
}
.box {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  min-height: 350px; /* Tambahin ini */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.pending {
  color: orange;
}
.approved {
  color: green;
}

canvas {
  width: 100% !important;
  max-width: 300px;
  height: auto !important;
  margin: auto;
  display: block;
}

</style>