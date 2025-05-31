<template>
  <div class="dashboard">
    <div class="main">
      <!-- Header -->
      <div class="header">
        <img src="/assets/logo.png" alt="Logo" class="logo" />
        <div>
          <h2>Hai, Karyawan!</h2>
          <p>HR - Contract</p>
        </div>
        <div class="user-info">
          <span>{{ currentDate }}</span>
          <div class="user-icon">K</div>
        </div>
      </div>

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

      <!-- Quick Links -->
      <div class="quick-links">
        <h3>Quick Links</h3>
        <a href="/path/to/pengajuan-cuti-dan-izin" class="btn">Pengajuan Cuti dan Izin</a>
      </div>

      <!-- Footer Navigation -->
      <div class="footer">
        <div>Home</div>
        <div>Izin dan Cuti</div>
        <div>Pengajuan Lain</div>
        <div>Gaji</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }),
      stats: {
        total: 50,
        hadir: 30,
        cuti: 10,
        absen: 10
      },
      izinList: [
        { name: "IZ001", employee_name: "Budi Santoso", reason: "Sakit", status: "Disetujui" },
        { name: "IZ002", employee_name: "Rina Putri", reason: "Cuti Tahunan", status: "Menunggu" },
        { name: "IZ003", employee_name: "Ahmad Fauzi", reason: "Keperluan Keluarga", status: "Ditolak" }
      ]
    };
  },
  methods: {
    viewDetail(item) {
      alert("Detail izin: " + item.employee_name);
    }
  }
};
</script>

<style scoped>
.header { display: flex; align-items: center; padding: 10px; }
.logo { height: 40px; }
.user-info { margin-left: auto; display: flex; align-items: center; }
.overview-cards { display: flex; gap: 10px; margin-top: 10px; }
.card { padding: 20px; border-radius: 5px; color: white; text-align: center; font-size: 1.2em; }
.card.blue { background: #007BFF; }
.card.green { background: #28A745; }
.card.yellow { background: #FFC107; }
.card.red { background: #DC3545; }
.footer { display: flex; justify-content: space-around; padding: 10px; background-color: #f0f0f0; position: fixed; bottom: 0; width: 100%; }
.footer div { text-align: center; }
</style>