<template>
  <div class="attendance-list">
    <div class="card">
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
            <td>
              <div class="employee-info">
                <img :src="employee.avatar" alt="Avatar" class="avatar" />
                {{ employee.name }}
              </div>
            </td>
            <td>{{ employee.position }}</td>
            <td :class="getStatusClass(employee.status)">
              <span class="status-badge">{{ employee.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
.card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.attendance-list {
  max-width: 100%;
  margin: auto;
  text-align: center;
}

.employee-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
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