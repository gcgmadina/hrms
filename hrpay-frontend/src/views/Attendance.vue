<template>
  <div class="attendance-container">
    <h1>Kehadiran</h1>
    <table class="attendance-table">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Jabatan</th>
          <th>Status Kehadiran</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.position }}</td>
          <td :class="getStatusClass(employee.status)">{{ employee.status }}</td>
        </tr>
      </tbody>
    </table>

    <h1>Daftar Hari Libur</h1>
    <table class="holiday-table">
      <thead>
        <tr>
          <th>Nama Libur</th>
          <th>Tanggal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="holiday in holidays" :key="holiday.id">
          <td>{{ holiday.name }}</td>
          <td>{{ holiday.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [], // Data kehadiran karyawan
      holidays: [], // Data hari libur
    };
  },
  mounted() {
    this.fetchEmployees();
    this.fetchHolidays();
  },
  methods: {
    async fetchEmployees() {
      // Fetch data employees dari API
    },
    async fetchHolidays() {
      // Fetch data libur dari API
    },
    getStatusClass(status) {
      return {
        WFO: "status-wfo",
        WFH: "status-wfh",
        Hadir: "status-hadir",
        Izin: "status-izin",
        Cuti: "status-cuti",
        Perdin: "status-perdin",
      }[status] || "status-default";
    },
  },
};
</script>


<style scoped>
.attendance-container {
  max-width: 150%;
  margin: auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.status-wfo { background: #4CAF50; color: white; }
.status-wfh { background: #2196F3; color: white; }
.status-hadir { background: #FFC107; color: black; }
.status-izin { background: #FF5722; color: white; }
.status-cuti { background: #9E9E9E; color: white; }
.status-perdin { background: #673AB7; color: white; }

@media (max-width: 768px) {
  .attendance-container {
    max-width: 90%;
    padding: 15px;
  }
}
</style>
