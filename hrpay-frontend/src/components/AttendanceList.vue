<template>
  <div class="attendance-list">
    <h2>Daftar Kehadiran Karyawan</h2>
    <table>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      employees: [],
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await fetch("http://localhost:8000/api/resource/Employee%20ID", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Pindahkan ke luar headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.employees = data.data; // Sesuaikan dengan struktur respons ERPNext
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
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
  mounted() {
    this.fetchEmployees(); // Fetch data saat komponen dimuat
  },
};
</script>

<style scoped>
.attendance-list {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

.status-wfo { background-color: #4CAF50; color: white; }
.status-wfh { background-color: #2196F3; color: white; }
.status-hadir { background-color: #FFC107; color: black; }
.status-izin { background-color: #FF5722; color: white; }
.status-cuti { background-color: #9E9E9E; color: white; }
.status-perdin { background-color: #673AB7; color: white; }
</style>